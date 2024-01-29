import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, macro, Prefab } from 'cc';
import { SpawnController } from './SpawnController';
import { Slash } from './Slash';
const { ccclass, property } = _decorator;

@ccclass('CheckHeart')
export class CheckHeart extends Component {
    @property(Node)
    public heartNode: Node [] = [];
    protected start(): void {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        this.scheduleOnce(()=>otherCollider.node.destroy());
        
        if (otherCollider.node.name === 'Bomb') {

        } else {
            for (let i = 0; i < this.heartNode.length; i++) {
                this.heartNode[i].destroy();
            }
    
            if (this.heartNode.length === 0) {
                Slash.instance.overNode.active = true;
            }
        }
        
    }
    onEndContact(){

    }
}