import { _decorator, Collider2D, Component, Contact2DType, instantiate, Node, Prefab, tween, Animation, Vec3, UITransform } from 'cc';
import { SpawnController } from './SpawnController';
import { Slash } from './Slash';
const { ccclass, property } = _decorator;

@ccclass('FruitContact')
export class FruitContact extends Component {
    static instance: FruitContact;
    @property(Prefab)
    fruitPrefabs: Prefab = null;

    @property(Node)
    sprite: Node = null;
    @property(Node)
    S: Node = null;
    public posShadow;

    protected onLoad(): void {
        FruitContact.instance = this;
    }
    protected onDestroy(): void {
        this.S.destroy();
    }
    protected start(): void {
        tween(this.node).to(5, {angle: 360}).start();
        
    }

    protected update(dt: number): void {
        
        if(this.node.position.y < -450){
            
            if(this.fruitPrefabs.name == 'Bomb'){

            }else{
                if(this.fruitPrefabs.name == 'Heart'){

                }
                SpawnController.instance.fruitAlive.push(this.fruitPrefabs);
                let animCanvas = Slash.instance.canvas.getComponent(Animation);
                animCanvas.play('animCanvas');
            }
            this.node.destroy();
            
            SpawnController.instance.checkHeart();
        }
        let posXNode1 = this.node.position.x;
        let posYNode1 = this.node.position.y;
        this.posShadow = new Vec3(posXNode1, posYNode1 + 520);
        this.S.setPosition(this.posShadow);
        this.S.angle = this.node.angle;
    }
    
}


