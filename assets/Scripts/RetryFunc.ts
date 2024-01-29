import { _decorator, Component, director, Node, Prefab } from 'cc';
import { SpawnController } from './SpawnController';
import { Slash } from './Slash';
import { AudioCtrl } from './AudioCtrl';
import { FruitContact } from './FruitContact';
const { ccclass, property } = _decorator;

@ccclass('RetryFunc')
export class RetryFunc extends Component {
    @property
    sceneName: string = "";
    @property(AudioCtrl)
    public clip: AudioCtrl;
    start() {

    }

    update(deltaTime: number) {
        
    }
    loadScene(){

        this.clip.onAudioQueue(0);
        Slash.instance.overNode.active = false;
        Slash.instance.touchEnabled = true;
        SpawnController.instance.destroyedCountLabel.string = `0`;
        SpawnController.instance.destroyedCount = 0;
        SpawnController.instance.fruitAlive = [];
        SpawnController.instance.heartNode[0].active = true;
        SpawnController.instance.heartNode[1].active = true;
        SpawnController.instance.heartNode[2].active = true;
        SpawnController.instance.spawnEnabled = true;
        SpawnController.instance.comboList = [];
    }
}


