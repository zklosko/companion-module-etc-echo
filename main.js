import { InstanceBase, InstanceStatus } from '@companion-module/base'
import { configFields } from './src/config.js'
import { upgradeScripts } from './src/upgrades.js'
import { UpdateActions } from './src/actions.js'
import { UpdateFeedbacks } from './src/feedbacks.js'
import { UpdateVariableDefinitions } from './src/variables.js'
import { UpdatePresetDefinitions } from './src/presets.js'
import { EchoServer } from './src/udp/server.js'

export default class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		// The following runs when the module is opened for the first time or when the config is changed
		this.config = config

		await this.configUpdated(config)

		this.EchoServer = new EchoServer(config)

		this.EchoServer.on('status_change', (newStatus) => {
			this.updateStatus(newStatus)
		})

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.updatePresetDefinitions()
	}

	// When module gets deleted or deactivated
	async destroy() {
		this.EchoServer.closeServer()

		this.updateStatus(InstanceStatus.Disconnected)
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config

		this.EchoServer.updateConfig(config)
	}

	// Return config fields for web config
	getConfigFields() {
		return configFields
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	updatePresetDefinitions() {
		UpdatePresetDefinitions(this)
	}
}

export const UpgradeScripts = upgradeScripts
