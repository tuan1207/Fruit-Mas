import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, Vec2, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ContactWallRight')
export class ContactWallRight extends Component {
    start() {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    update(deltaTime: number) {
        
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        const initialSpeed = new Vec2 (-5, 5);
        otherCollider.getComponent(RigidBody2D).linearVelocity = initialSpeed;

        
    }
    onEndContact(){
    
    }
}


