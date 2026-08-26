import { InstanceStatus, createModuleLogger, UDPHelper } from '@companion-module/base'
import { EventEmitter } from 'node:events';

// Make logger for UDP server
const udplogger = createModuleLogger('UDP Server')

export class EchoServer extends EventEmitter {
    state
    #socket
    #config
    
    constructor(config) {
        super()
        this.#config = config
        this.createState()

    }

    createState() {
        this.state = new Map()
        for (let i = 1; i <= 16; i++) {
            let space = new Map()
            space.set("preset", 0)
            space.set("isOff", true)
            space.set("sequences", Array(4).fill(0))
            space.set("zones", Array(16).fill(0))
            this.state.set(i, space)
        }
    }

    createServer() {
        this.#socket = new UDPHelper(this.#config.host, this.#config.port)

        this.#socket.on('error', (err) => {
            udplogger.error('Network error: ' + err.message)
            // close socket?
        })

        this.#socket.on('listening', () => {
            udplogger.info('Listening for UDP packets on ' + this.#config.serverport)
            this.emit('status_change', InstanceStatus.Ok)
        })

        this.#socket.on('message', (msg, dInfo) => {
            this.#parse(msg)
        })
    }

    closeServer() {
        this.#socket.close()
        delete this.#socket
    }

    updateConfig(config) {
        this.closeServer()
        this.#config = config
        this.createServer()
    }

    #parse(msg) {
        const dataResponse = msg.toString()

        if (dataResponse.slice(0,2) != 'E>') {
            udplogger.warn('Unexpected UDP data received: ' + dataResponse)
            return
        }

        let verb = dataResponse.split(":")[0]
        let args = dataResponse.split(":")[1].split(",")
        let cleanArgs = args.map(a => parseInt(a.trim()))

        let space, preset, zone, sequence, level
        const spaceState = this.state.get(space)
        if (!spaceState) {
            udplogger.warn(`Received data for unknown space ${space}`)
            return
        }
        switch (verb) {
            case 'pst act':
                space = cleanArgs[0]
                preset = cleanArgs[1]
                spaceState.set("preset", preset)
                this.emit('check_feedbacks')
                break
            case 'space off':
                space = cleanArgs[0]
                spaceState.set("zones", Array(16).fill(0))
                this.emit('check_feedbacks')
                break
            case 'seq act':
                space = cleanArgs[0]
                sequence = cleanArgs[1]
                spaceState.get("sequences")[sequence - 1] = 1
                break
            case 'seq dact':
                space = cleanArgs[0]
                sequence = cleanArgs[1]
                spaceState.get("sequences")[sequence - 1] = 0
                break
            case 'lok':
                break
            case 'zone int':
                space = cleanArgs[0]
                zone = cleanArgs[1]
                level = cleanArgs[2]
                spaceState.get("zones")[zone - 1] = level
                this.emit('check_feedbacks')
                break
            default:
                udplogger.info('Unexpected UDP data received')
                break
        }
    }

}
