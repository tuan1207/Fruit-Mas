import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioCtrl')
export class AudioCtrl extends Component {
    @property(AudioClip)
    public clips: AudioClip[] = [];
    @property(AudioSource)
    public audioSource: AudioSource = null;
    start() {
        this.audioSource.volume = 0.3;
    }
    update(deltaTime: number) {
        
    }

    onAudioQueue(index: number){
        let clip: AudioClip = this.clips[index];
        this.audioSource.playOneShot(clip);
    }
    turnOffAudio(){
        this.audioSource.volume = 0;
    }
    turnOnAudio(){
        this.audioSource.volume = 0.3;
    }
}


