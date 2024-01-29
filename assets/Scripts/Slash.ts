import { _decorator, Component, MotionStreak, EventTouch, Node, UITransform, Vec3, Prefab, instantiate, Collider2D, RigidBody2D, EPhysics2DDrawFlags, Contact2DType, IPhysics2DContact, PhysicsSystem2D, Vec2, Label, SpriteFrame, Animation } from 'cc';
import { SpawnController } from './SpawnController';
import { AudioCtrl } from './AudioCtrl';
import { FruitContact } from './FruitContact';
const { ccclass, property } = _decorator;

@ccclass('Slash')
export class Slash extends Component {
    static instance: Slash;

    @property(Node)
    canvas: Node = null;

    @property(Node)
    overNode: Node = null;

    @property(Node)
    touchNode: Node = null;

    @property(AudioCtrl)
    public clip: AudioCtrl;

    @property(MotionStreak)
    motionStreak: MotionStreak = null;

    public fruitContact: boolean = false;
    public desPos;
    public nameFruit;
    public angleFruit: number = 0;
    public touchEnabled: boolean = true;
    public animCanvas;
    public fruitNode;
    
    protected onLoad(): void {
        // PhysicsSystem2D.instance.enable = true;
        // PhysicsSystem2D.instance.debugDrawFlags  = EPhysics2DDrawFlags.Aabb |
        // EPhysics2DDrawFlags.Pair |
        // EPhysics2DDrawFlags.CenterOfMass |
        // EPhysics2DDrawFlags.Joint |
        // EPhysics2DDrawFlags.Shape;

        Slash.instance = this;

        this.motionStreak.enabled = true;
        this.schedule(this.updateMotionStreak, 0.1);
    }

    updateMotionStreak() {
        // Đặt code cập nhật vị trí của MotionStreak ở đây dựa trên vị trí của đối tượng di chuyển
        this.motionStreak.node.position = this.node.position;
    }

    protected start(): void {
        this.canvas.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.canvas.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);   
        this.canvas.on(Node.EventType.TOUCH_END, this.onTouchEnd, this); 
        
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

        
    }
    protected update(dt: number): void {

    }

/*Lấy vị trí con trỏ tạo slash*/
    onTouchStart(event: EventTouch){
        if (!this.touchEnabled) return;

        let wp = event.touch.getUILocation();
        let posMouse = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(wp.x, wp.y));
        this.touchNode.active = true;
        this.touchNode.setPosition(posMouse);
        
    }
    onTouchMove(event: EventTouch){
        if (!this.touchEnabled) return;

        let wp = event.touch.getUILocation();
        let posMouse = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(wp.x, wp.y));
        this.touchNode.setPosition(posMouse);
        
    }
    onTouchEnd(){
        this.touchNode.active = false;
    }
/*Xử lý va chạm với con trỏ*/
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        // if(otherCollider.node != null){
            this.fruitNode = otherCollider.node;
            this.nameFruit = otherCollider.node.name;
            this.angleFruit = otherCollider.node.angle; 
            this.desPos = otherCollider.node.position;
            this.clip.onAudioQueue(1);
    
            if(otherCollider.node.name == 'Bomb'){
                SpawnController.instance.spawnCut();
                this.clip.onAudioQueue(2);
                this.scheduleOnce(() => {   otherCollider.node?.destroy()   });
                this.touchEnabled = false;
                let animCanvas = this.canvas.getComponent(Animation);
                animCanvas.play('animCanvas');
                SpawnController.instance.heartNode[0].active = false;
                SpawnController.instance.heartNode[1].active = false;
                SpawnController.instance.heartNode[2].active = false;
                SpawnController.instance.comboList = [];
            }if(otherCollider.node.name == 'Heart'){
                SpawnController.instance.fruitAlive.shift();
                if(SpawnController.instance.fruitAlive.length == 0){
                    SpawnController.instance.heartNode[2].active = true;
                }if(SpawnController.instance.fruitAlive.length == 1){
                    SpawnController.instance.heartNode[1].active = true;
                }
                SpawnController.instance.spawnCut();    
                this.scheduleOnce(() => {   otherCollider.node?.destroy()   });
            }else{
                SpawnController.instance.comboList.push(Slash.instance.fruitNode);
                SpawnController.instance.spawnCut();
                this.scheduleOnce(() => {    otherCollider.node?.destroy()    });
                SpawnController.instance.pointCount();
    
            // }  
        }
        
    }
    onEndContact(){

    }
}