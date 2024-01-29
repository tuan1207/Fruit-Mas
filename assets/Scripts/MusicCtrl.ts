import { _decorator, AudioClip, Component, Node } from 'cc';
import { AudioCtrl } from './AudioCtrl';
const { ccclass, property } = _decorator;

@ccclass('MusicCtrl')
export class MusicCtrl extends Component {

    @property(Node)
    musicOn: Node = null;
    @property(Node)
    musicOff: Node = null;
    @property(AudioClip)
    click: AudioClip = null;
    @property(AudioCtrl)
    public clip: AudioCtrl;
    
    private musicEnable: boolean = true;
    onEnable() {
        this.musicEnable = localStorage.getItem('soundState') === 'on';
        this.updateSprite();
        if (!this.musicEnable) {
            this.clip.turnOffAudio();
            localStorage.getItem('soundState') == 'off';
        }else{
            this.clip.turnOnAudio();
            localStorage.getItem('soundState') == 'on';
        }
    }

    onClick() {
        this.musicEnable = !this.musicEnable;
        this.updateSprite();
        this.clip.onAudioQueue(0);
        if (!this.musicEnable) {
            this.clip.turnOffAudio();
            localStorage.getItem('soundState') == 'on';
        }else{
            this.clip.turnOnAudio();
            localStorage.getItem('soundState') == 'off';
        }
        localStorage.setItem('soundState', this.musicEnable ? 'on' : 'off');
    }
   

    updateSprite() {
        this.musicOn.active = this.musicEnable;
        this.musicOff.active = !this.musicEnable;
    }
}


