import BaseChannel from './Base'

export default class ControlChannel extends BaseChannel {

    onOpen(event) {
        super.onOpen(event)
        // console.log('xCloudPlayer Channel/Control.ts - ['+this._channelName+'] onOpen:', event)

        const authRequest = JSON.stringify({
            'message':'authorizationRequest',
            'accessKey':'4BDB3609-C1F1-4195-9B37-FEFF45DA8B8E',
        })
        this.send(authRequest)

        const data = JSON.stringify({
            'message':'rateControlBitrateUpdate',
            'bitratebps': (7500*1000), // min = 512, max = 12000, default = 5000 (value = * 1000)
        })
        this.send(data)

        const data4 = JSON.stringify({
            'message':'videoChannelConfigUpdate',
            'maxVideoSctpMessageSizeBytes': 16000, // min = 512, max = 12000, default = 5000 (value = * 1000)
        })
        this.send(data4)

        // Let system know we have added a gamepad (Unsure what this does though)
        const data2 = JSON.stringify({
            'message':'gamepadChanged',
            'gamepadIndex':0,
            'wasAdded':true,
        })
        this.send(data2)
    }
    
    onMessage(event) {
        console.log('xCloudPlayer Channel/Control.ts - ['+this._channelName+'] onMessage:', event)
    }

    onClose(event) {
        super.onClose(event)
        // console.log('xCloudPlayer Channel/Control.ts - ['+this._channelName+'] onClose:', event)
    }

    requestKeyframeRequest() {
        console.log('xCloudPlayer Channel/Control.ts - ['+this._channelName+'] User requested Video KeyFrame')
        const keyframeRequest = JSON.stringify({
            message: 'videoKeyframeRequested',
            ifrRequested: false,
        })

        this.send(keyframeRequest)
    }
}