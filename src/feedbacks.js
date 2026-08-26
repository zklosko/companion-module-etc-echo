import { combineRgb } from '@companion-module/base'

export async function UpdateFeedbacks(self) {
	self.setFeedbackDefinitions({
		ActivePreset: {
			name: 'Active Preset',
			type: 'boolean',
			description: 'If certain preset is active, change style of the button',
			defaultStyle: {
				bgcolor: combineRgb(0, 204, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'space',
					type: 'number',
					label: 'Space',
					default: 1,
					min: 1,
					max: 16,
				},
				{
					id: 'preset',
					type: 'number',
					label: 'Preset',
					default: 1,
					min: 1,
					max: 64,
				},
			],
			callback: (feedback) => {
				return feedback.options.preset == self.EchoServer.state.get(feedback.options.space).get("preset")
			},
		},
		SpaceOff: {
			name: 'Space Off',
			type: 'boolean',
			description: 'If space is off, change style of the button',
			defaultStyle: {
				bgcolor: combineRgb(204, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'space',
					type: 'number',
					label: 'Space',
					default: 1,
					min: 1,
					max: 16,
				},
			],
			callback: (feedback) => {
				return self.EchoServer.state.get(feedback.options.space).get("isOff")
			},
		},
		CheckInt: {
			name: 'Check Intensity',
			type: 'boolean',
			description: 'If space is at certain intensity, change style of the button',
			defaultStyle: {
				bgcolor: combineRgb(255, 120, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'space',
					type: 'number',
					label: 'Space',
					default: 1,
					min: 1,
					max: 16,
				},
				{
					id: 'zone',
					type: 'number',
					label: 'Zone',
					default: 1,
					min: 1,
					max: 16,
				},
				{
					id: 'int',
					type: 'number',
					label: 'Intensity',
					default: 255,
					min: 0,
					max: 255,
				},
			],
			callback: (feedback) => {
				return feedback.options.int == self.EchoServer.state.get(feedback.options.space).get("zones")[feedback.options.zone - 1]
			},
		},
	})
}
