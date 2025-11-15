module.exports = function (self) {
	self.setActionDefinitions({
		activate_preset: {
			name: 'Activate Preset',
			options: [
				{
					id: 'spc_num',
					type: 'number',
					label: 'Space ID',
					default: 1,
					min: 1,
					max: 16,
				},
				{
					id: 'pst_num',
					type: 'number',
					label: 'Preset Number',
					default: 1,
					min: 1,
					max: 64,
				},
				{
					id: 'fade_time',
					type: 'number',
					label: 'Fade Time (sec)',
					default: 2.0,
					min: 0.0,
					max: 25.4,
				},
			],
			callback: async (event) => {
				const cmd = 'E$pst act: ' + event.options.spc_num + ', ' + event.options.pst_num + ', ' + event.options.fade_time + '\r'
				const sendBuf = Buffer.from(cmd, 'latin1')

				if (self.udp !== undefined) {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					self.udp.send(sendBuf)
				}
			},
		},
		off: {
			name: 'Turn Space Off',
			options: [
				{
					id: 'spc_num',
					type: 'number',
					label: 'Space ID',
					default: 1,
					min: 1,
					max: 16,
				},
				{
					id: 'fade_time',
					type: 'number',
					label: 'Fade Time (sec)',
					default: 2.0,
					min: 0.0,
					max: 25.4,
				},
			],
			callback: async (event) => {
				const cmd = 'E$off: ' + event.options.spc_num + ', ' + event.options.fade_time + '\r'
				const sendBuf = Buffer.from(cmd, 'latin1')

				if (self.udp !== undefined) {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					self.udp.send(sendBuf)
				}
			},
		},
		activate_sequence: {
			name: 'Activate Sequence',
			options: [
				{
					id: 'spc_num',
					type: 'number',
					label: 'Space ID',
					default: 1,
					min: 1,
					max: 16,
				},
				{
					id: 'seq_num',
					type: 'number',
					label: 'Sequence Number',
					default: 1,
					min: 1,
					max: 4,
				},
			],
			callback: async (event) => {
				const cmd = 'E$seq act: ' + event.options.spc_num + ', ' + event.options.seq_num + '\r'
				const sendBuf = Buffer.from(cmd, 'latin1')

				if (self.udp !== undefined) {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					self.udp.send(sendBuf)
				}
			},
		},
		deactivate_sequence: {
			name: 'Deactivate Sequence',
			options: [
				{
					id: 'spc_num',
					type: 'number',
					label: 'Space ID',
					default: 1,
					min: 1,
					max: 16,
				},
				{
					id: 'seq_num',
					type: 'number',
					label: 'Preset Number',
					default: 1,
					min: 1,
					max: 4,
				},
			],
			callback: async (event) => {
				const cmd = 'E$seq dect: ' + event.options.spc_num + ', ' + event.options.seq_num + '\r'
				const sendBuf = Buffer.from(cmd, 'latin1')

				if (self.udp !== undefined) {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					self.udp.send(sendBuf)
				}
			},
		},
		set_zone_int: {
			name: 'Set Zone Intensity',
			options: [
				{
					id: 'spc_num',
					type: 'number',
					label: 'Space ID',
					default: 1,
					min: 1,
					max: 16,
				},
				{
					id: 'zone_num',
					type: 'number',
					label: 'Zone Number',
					default: 1,
					min: 1,
					max: 16,
				},
				{
					id: 'zone_int',
					type: 'number',
					label: 'Zone Intensity',
					default: 255,
					min: 0,
					max: 255,
				},
				{
					id: 'fade_time',
					type: 'number',
					label: 'Fade Time (sec)',
					default: 2.0,
					min: 0.0,
					max: 25.4,
				},
			],
			callback: async (event) => {
				const cmd = 'E$zone int: ' + event.options.spc_num + ', ' + event.options.zone_num + ', ' + event.options.zone_int + ', '+ event.options.fade_time + '\r'
				const sendBuf = Buffer.from(cmd, 'latin1')

				if (self.udp !== undefined) {
					self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

					self.udp.send(sendBuf)
				}
			},
		},
	})
}
