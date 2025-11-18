const { combineRgb } = require("@companion-module/base")

module.exports = function (self) {
    const presets = {}

    presets[`spc1off`] = {
        name: 'Space 1 Off',
        category: 'Off',
        type: 'button',
        style: {
            text: 'Space 1 Off',
            size: 18,
            color: combineRgb(255,255,255),
            bgcolor: combineRgb(255,0,0)
        },
        feedbacks: [],
        steps: [
            {
                down: [
                    {
                        actionId: 'off',
                        options: {
                            spc_num: '1',
                            fade_time: '0'
                        }
                    }
                ]
            }
        ],
    }

    presets[`preset1`] = {
        name: 'Preset 1',
        category: 'Presets',
        type: 'button',
        style: {
            text: 'Preset 1',
            size: 18,
            color: combineRgb(255,255,255),
            bgcolor: combineRgb(0,200,0)
        },
        feedbacks: [],
        steps: [
            {
                down: [
                    {
                        actionId: 'activate_preset',
                        options: {
                            spc_num: '1',
                            pst_num: '1',
                            fade_time: '2',
                        }
                    }
                ]
            }
        ],
    }

    self.setPresetDefinitions(presets)
}