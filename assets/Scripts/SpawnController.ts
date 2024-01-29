import { _decorator, Component, Node, macro, Vec2, Vec3, UITransform, instantiate, RigidBody2D, Prefab, Collider2D, Contact2DType, IPhysics2DContact, Label, director } from 'cc';
import { Slash } from './Slash';
import { Buttons } from './Buttons';
import { FruitContact } from './FruitContact';
const { ccclass, property } = _decorator;

@ccclass('SpawnController')
export class SpawnController extends Component {
    static instance: SpawnController;
    //List fruit
    @property(Prefab)
    fruitPrefabs: Prefab[] = [];

    @property(Prefab)
    prefabBomb: Prefab = null;

    @property(Prefab)
    prefabHeart: Prefab = null;

    @property(Node)
    heartNode: Node [] = [];

    //Prefabs cut
    @property(Prefab)
    prefab0: Prefab = null;
    @property(Prefab)
    prefab1: Prefab = null;
    @property(Prefab)
    prefab2: Prefab = null;
    @property(Prefab)
    prefab3: Prefab = null;
    @property(Prefab)
    prefab4: Prefab = null;
    @property(Prefab)
    prefab5: Prefab = null;
    @property(Prefab)
    prefab6: Prefab = null;
    @property(Prefab)
    prefab7: Prefab = null;
    @property(Prefab)
    prefab8: Prefab = null;
    @property(Prefab)
    prefab9: Prefab = null;
    @property(Prefab)
    prefab10: Prefab = null;
    @property(Prefab)
    prefab11: Prefab = null;
    @property(Prefab)
    prefabBombCut: Prefab = null;

    @property(Node)
    shadow: Node = null;
    public alooooo;

    // Label để hiển thị số lượng prefab đã hủy
    @property(Label)
    destroyedCountLabel: Label = null;
    @property(Label)
    gameOverPointLabel: Label = null;
    @property(Label)
    highPointLabel: Label = null;

    public fruitAlive: Prefab[] = [];
    public destroyedCount: number = 0;
    private highPoint: number = 0;
    public prefabSpawn1;
    public prefabSpawn2;
    public spawnEnabled: boolean = true;



    //combo
    public comboCount: number = 25;
    public comboList = [];
    private isPressing: boolean = false;
    @property(Node)
    comboCountNode: Node = null;
    @property(Label)
    comboListLabel: Label = null;

    protected onLoad(): void {
        SpawnController.instance = this;
    }

    protected start(): void {
        this.schedule(this.spawnFruitLeft, 2.5, macro.REPEAT_FOREVER, 0);
        this.schedule(this.spawnFruitRight, 4, macro.REPEAT_FOREVER, 0);
        this.schedule(this.spawnBombLeft, 7, macro.REPEAT_FOREVER, 0);
        this.schedule(this.spawnBombRight, 14, macro.REPEAT_FOREVER, 0);
        this.schedule(this.spawnHeart, 10, macro.REPEAT_FOREVER, 0);
        this.checkHeart();
    }
    protected update(dt: number): void {
        if (this.isPressing) {
            this.comboCount -= 1;
            if (this.comboCount == 0) {
                if(this.comboList.length ==1){
                    this.comboCountNode.active = false;         
                }else{
                    let posComX = Slash.instance.desPos.x;
                    let posComY = Slash.instance.desPos.y;
                    let randomPosition = new Vec3(posComX, posComY);
                    this.comboCountNode.setPosition(randomPosition);
                    this.comboCountNode.active = true;  
                }
                this.comboListLabel.string = `x${this.comboList.length}`;    
                this.scheduleOnce(()=>this.comboCountNode.active = false, 1);
                this.comboList = [];
                this.comboCount = 20;
                this.isPressing = false;
            }
        }
            
    }

    /*spawn*/
    spawnFruitLeft(){
        if(!this.spawnEnabled) return;
        //random fruit
        let randomIndex = Math.floor(Math.random() * this.fruitPrefabs.length);
        let randomPrefab = this.fruitPrefabs[randomIndex];

        //random position
        let randomPosition = new Vec3(Math.random()*(400-0)-200, -360);        
        //set position
        let prefabInstance = instantiate(randomPrefab);
        prefabInstance.setPosition(randomPosition);
        this.prefabSpawn1 = prefabInstance;
        //add shadow
        prefabInstance.getComponent(FruitContact).S.parent = this.shadow;
        //add fruit
        this.node.addChild(prefabInstance);
        //set vận tốc ném
        const initialSpeed = new Vec2 (Math.random()*20, 20);
        prefabInstance.getComponent(RigidBody2D).linearVelocity = initialSpeed; 
    }
    spawnFruitRight(){
        if(!this.spawnEnabled) return;
        //random fruit
        let randomIndex = Math.floor(Math.random() * this.fruitPrefabs.length);
        let randomPrefab = this.fruitPrefabs[randomIndex];

        //random position
        let randomPosition = new Vec3(Math.random()*(200-0), -360);        
        //set position
        let prefabInstance = instantiate(randomPrefab);
        prefabInstance.setPosition(randomPosition);
        this.prefabSpawn2 = prefabInstance;
        //add shadow
        prefabInstance.getComponent(FruitContact).S.parent = this.shadow;
        //add fruit
        this.node.addChild(prefabInstance);
        //set vận tốc ném
        const initialSpeed = new Vec2 (Math.random()*-20, 20);
        prefabInstance.getComponent(RigidBody2D).linearVelocity = initialSpeed;
    }
    spawnHeart(){
        if(!this.spawnEnabled) return;
        if(this.fruitAlive.length > 0){
            //random fruit
            let randomPrefab = this.prefabHeart;

            //random position
            let randomPosition = new Vec3(Math.random()*(200-0)-100, -360);        
            //set position
            let prefabInstance = instantiate(randomPrefab);
            prefabInstance.setPosition(randomPosition);
            this.prefabSpawn1 = prefabInstance;
            //add shadow
            prefabInstance.getComponent(FruitContact).S.parent = this.shadow;
            //add fruit
            this.node.addChild(prefabInstance);
            //set vận tốc ném
            const initialSpeed = new Vec2 (Math.random()*(20-0)-10, 20);
            prefabInstance.getComponent(RigidBody2D).linearVelocity = initialSpeed;
        }else{
            if(!this.spawnEnabled) return;
            //random fruit
            let randomIndex = Math.floor(Math.random() * this.fruitPrefabs.length);
            let randomPrefab = this.fruitPrefabs[randomIndex];

            //random position
            let randomPosition = new Vec3(Math.random()*(200-0)-100, -360);            
            //set position
            let prefabInstance = instantiate(randomPrefab);
            prefabInstance.setPosition(randomPosition);
            this.prefabSpawn1 = prefabInstance;
            //add shadow
            prefabInstance.getComponent(FruitContact).S.parent = this.shadow;
            //add fruit
            this.node.addChild(prefabInstance);
            //set vận tốc ném
            const initialSpeed = new Vec2 (Math.random()*(20-0)-10, 20);
            prefabInstance.getComponent(RigidBody2D).linearVelocity = initialSpeed; 
        }
        
    }
    spawnBombLeft(){
        if(!this.spawnEnabled) return;
        //random fruit
        let randomPrefab = this.prefabBomb;

        //random position
        let randomPosition = new Vec3(Math.random()*(400-0)-200, -360);        
        //set position
        let prefabInstance = instantiate(randomPrefab);
        prefabInstance.setPosition(randomPosition);
        this.prefabSpawn1 = prefabInstance;
        //add shadow
        prefabInstance.getComponent(FruitContact).S.parent = this.shadow;
        //add fruit
        this.node.addChild(prefabInstance);
        //set vận tốc ném
        const initialSpeed = new Vec2 (Math.random()*20, 20);
        prefabInstance.getComponent(RigidBody2D).linearVelocity = initialSpeed; 
    }
    spawnBombRight(){
        if(!this.spawnEnabled) return;
        //random fruit
        let randomPrefab = this.prefabBomb;

        //random position
        let randomPosition = new Vec3(Math.random()*(200-0), -360);        
        //set position
        let prefabInstance = instantiate(randomPrefab);
        prefabInstance.setPosition(randomPosition);
        this.prefabSpawn1 = prefabInstance;
        //add shadow
        prefabInstance.getComponent(FruitContact).S.parent = this.shadow;
        //add fruit
        this.node.addChild(prefabInstance);
        //set vận tốc ném
        const initialSpeed = new Vec2 (Math.random()*-20, 20);
        prefabInstance.getComponent(RigidBody2D).linearVelocity = initialSpeed; 
    }
    /*Check heart*/
    checkHeart(){
        if(this.fruitAlive.length == 1){
            this.heartNode[2].active = false;
        }if(this.fruitAlive.length == 2){
            this.heartNode[1].active = false;
        }if(this.fruitAlive.length == 3){
            this.heartNode[0].active = false;
            this.spawnEnabled = false;
            this.scheduleOnce(() => Slash.instance.overNode.active = true, 1);
            Slash.instance.touchEnabled = false;
            this.savePoint();
        }
    }
    /*Tính điểm*/
    pointCount(){
        this.destroyedCount++;
        this.destroyedCountLabel.string = `${this.destroyedCount}`;
    }
    savePoint(){
        this.gameOverPointLabel.string = `${this.destroyedCount}`;
        if(this.highPoint < this.destroyedCount){
            this.highPoint = this.destroyedCount;
            this.highPointLabel.string = `${this.highPoint}`;
        }
    }
    /*spawn cut*/
    spawnCut(){
        
        if(Slash.instance.nameFruit == 'Bomb'){
            this.spawnEnabled = false;
            let prefabBombCut = instantiate(this.prefabBombCut); 
            prefabBombCut.position = Slash.instance.desPos;
            this.scheduleOnce(()=>this.node.addChild(prefabBombCut));
            this.savePoint();
            this.scheduleOnce(() => Slash.instance.overNode.active = true, 1);
        }if(Slash.instance.nameFruit == 'Kiwi'){
            this.spawnEnabled = true;
            this.isPressing = true;
            //add prefab cut
            let prefab0 = instantiate(this.prefab0); 
            prefab0.position = Slash.instance.desPos;
            this.scheduleOnce(()=>this.node.addChild(prefab0));
            let prefab1 = instantiate(this.prefab1); 
            prefab1.position = Slash.instance.desPos;
            this.scheduleOnce(()=>this.node.addChild(prefab1));
            //set van toc
            const initialSpeed = new Vec2 (-10, 0);
            prefab0.getComponent(RigidBody2D).linearVelocity = initialSpeed;
            const initialSpeed1 = new Vec2 (10, 0);
            prefab1.getComponent(RigidBody2D).linearVelocity = initialSpeed1;
            //set goc cua vat
            prefab0.angle = Slash.instance.angleFruit;
            prefab1.angle = Slash.instance.angleFruit;
        }if(Slash.instance.nameFruit == 'Lemon'){
            this.spawnEnabled = true;
            this.isPressing = true;
            //add prefab cut
            let prefab2 = instantiate(this.prefab2); 
            prefab2.position = Slash.instance.desPos;
            this.scheduleOnce(()=>this.node.addChild(prefab2));
            let prefab3 = instantiate(this.prefab3); 
            prefab3.position = Slash.instance.desPos;
            this.scheduleOnce(()=>this.node.addChild(prefab3));
            //set van toc
            const initialSpeed1 = new Vec2 (10, 0);
            prefab3.getComponent(RigidBody2D).linearVelocity = initialSpeed1;
            const initialSpeed = new Vec2 (-10, 0);
            prefab2.getComponent(RigidBody2D).linearVelocity = initialSpeed;
            //set goc cua vat
            prefab2.angle = Slash.instance.angleFruit;
            prefab3.angle = Slash.instance.angleFruit;
        }if(Slash.instance.nameFruit == 'Orange'){
            this.spawnEnabled = true;
            this.isPressing = true;
            //add prefab cut
            let prefab4 = instantiate(this.prefab4); 
            prefab4.position = Slash.instance.desPos;
            this.scheduleOnce(()=>this.node.addChild(prefab4));
            let prefab5 = instantiate(this.prefab5); 
            prefab5.position = Slash.instance.desPos;
            this.scheduleOnce(()=>this.node.addChild(prefab5));
            //set van toc
            const initialSpeed = new Vec2 (-10, 0);
            prefab4.getComponent(RigidBody2D).linearVelocity = initialSpeed;
            const initialSpeed1 = new Vec2 (10, 0);
            prefab5.getComponent(RigidBody2D).linearVelocity = initialSpeed1;
            //set goc cua vat
            prefab4.angle = Slash.instance.angleFruit;
            prefab5.angle = Slash.instance.angleFruit;
        }if(Slash.instance.nameFruit == 'Pear'){
            this.spawnEnabled = true;
            this.isPressing = true;
            //add prefab cut
            let prefab6 = instantiate(this.prefab6); 
            prefab6.position = Slash.instance.desPos;
            this.scheduleOnce(()=>this.node.addChild(prefab6));
            let prefab7 = instantiate(this.prefab7); 
            prefab7.position = Slash.instance.desPos;
            this.scheduleOnce(()=>this.node.addChild(prefab7));
            //set van toc
            const initialSpeed = new Vec2 (-10, 0);
            prefab6.getComponent(RigidBody2D).linearVelocity = initialSpeed;
            const initialSpeed1 = new Vec2 (10, 0);
            prefab7.getComponent(RigidBody2D).linearVelocity = initialSpeed1;
            //set goc cua vat
            prefab6.angle = Slash.instance.angleFruit;
            prefab7.angle = Slash.instance.angleFruit;
        }if(Slash.instance.nameFruit == 'Watermelon'){
            this.spawnEnabled = true;
            this.isPressing = true;
            //add prefab cut
            let prefab8 = instantiate(this.prefab8); 
            prefab8.position = Slash.instance.desPos;
            this.scheduleOnce(()=>this.node.addChild(prefab8));
            let prefab9 = instantiate(this.prefab9); 
            prefab9.position = Slash.instance.desPos;
            this.scheduleOnce(()=>this.node.addChild(prefab9));
            //set van toc
            const initialSpeed = new Vec2 (-10, 0);
            prefab8.getComponent(RigidBody2D).linearVelocity = initialSpeed;
            const initialSpeed1 = new Vec2 (10, 0);
            prefab9.getComponent(RigidBody2D).linearVelocity = initialSpeed1;
            //set goc cua vat
            prefab8.angle = Slash.instance.angleFruit;
            prefab9.angle = Slash.instance.angleFruit;
        }if(Slash.instance.nameFruit == 'Heart'){
            this.spawnEnabled = true;
            this.isPressing = true;
            //add prefab cut
            let prefab10 = instantiate(this.prefab10); 
            prefab10.position = Slash.instance.desPos;
            this.scheduleOnce(()=>this.node.addChild(prefab10));
            let prefab11 = instantiate(this.prefab11); 
            prefab11.position = Slash.instance.desPos;
            this.scheduleOnce(()=>this.node.addChild(prefab11));
            //set van toc
            const initialSpeed = new Vec2 (-10, 0);
            prefab10.getComponent(RigidBody2D).linearVelocity = initialSpeed;
            const initialSpeed1 = new Vec2 (10, 0);
            prefab11.getComponent(RigidBody2D).linearVelocity = initialSpeed1;
            //set goc cua vat
            prefab10.angle = Slash.instance.angleFruit;
            prefab11.angle = Slash.instance.angleFruit;
        }
    }
}

