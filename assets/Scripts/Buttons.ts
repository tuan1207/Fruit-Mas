import { _decorator, Component, director, Node } from 'cc';
import { AudioCtrl } from './AudioCtrl';
const { ccclass, property } = _decorator;

@ccclass('Buttons')
export class Buttons extends Component {
    static instance: Buttons;
    @property(Node)
    private infoNode: Node;

    @property(Node)
    private startMenu: Node;

    @property(Node)
    private guideNode: Node;
    @property (AudioCtrl)
    public clip: AudioCtrl;
    @property
    sceneName: string = "";


    protected onLoad(): void {
        Buttons.instance = this;
    }

    infoBtn(){
        this.clip.onAudioQueue(0);
        this.startMenu.active = false;
        this.infoNode.active = true;
    }

    exitBtn(){
        this.clip.onAudioQueue(0);
        this.startMenu.active = true;   
        this.infoNode.active = false;
    }

    guideBtn(){
        this.clip.onAudioQueue(0);
        this.startMenu.active = false;
        this.guideNode.active = true;
    }

    playBtn(){
        this.clip.onAudioQueue(0);
        director.loadScene(this.sceneName);
    }

}


