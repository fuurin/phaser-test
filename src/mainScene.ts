import "phaser"
import { FPS } from "./fps";

export class MainScene extends Phaser.Scene {
    delta: number;
    lastStarTime: number;
    starsCaught: number;
    starsFallen: number;
    sand: Phaser.Physics.Arcade.StaticGroup;
    info: Phaser.GameObjects.Text;

    fpsInfo: Phaser.GameObjects.Text;
    fps: FPS = new FPS();

    constructor() {
        super({
            key: "MainScene"
        });
    }

    init(params: any) {
        this.delta = 1000;
        this.lastStarTime = 0;
        this.starsCaught = 0;
        this.starsFallen = 0;
    }

    preload() {
        this.load.setBaseURL(
            "https://raw.githubusercontent.com/mariyadavydova/" +
            "starfall-phaser3-typescript/master/");
        this.load.image("star", "assets/star.png");
        this.load.image("sand", "assets/sand.jpg");
    }

    create() {
        this.sand = this.physics.add.staticGroup({
            key: 'sand',
            frameQuantity: 20
        })
        Phaser.Actions.PlaceOnLine(
            this.sand.getChildren(),
            new Phaser.Geom.Line(20, 580, 820, 580)
        );
        this.sand.refresh();
        
        this.info = this.add.text(
            10, 10, "Text for Score",
            {font: '24px Ariel Bold', fill: '#FBFBAC' }
        )

        this.fpsInfo = this.add.text(
            700, 10, "-- [fps]",
            {font: '24px Ariel Bold', fill: '#FBFBAC' }
        )

        this.events.on("shutdown", () => this.fps.stop());
        this.fps.start();
    }

    update(time: number) {
        const diff: number = time - this.lastStarTime;
        if(diff > this.delta) {
            this.lastStarTime = time;
            if (this.delta > 500) {
                this.delta -= 20;
            }
            this.emitStar();
        }

        this.info.text = `${this.starsCaught} caught - ` + 
                         `${this.starsFallen} fallen (max 3)`;
        
        this.fps.update();
        this.fpsInfo.text = `${this.fps.fps} [fps]`
    }

    private onClick(star: Phaser.Physics.Arcade.Image): () => void {
        return () => {
            star.setTint(0x00ff00);
            star.setVelocity(0, 0);
            this.starsCaught += 1;
            this.time.delayedCall(100, (star: Phaser.Physics.Arcade.Image) => {
                star.destroy();
            }, [star], this);
        }
    }

    private onFall(star: Phaser.Physics.Arcade.Image): () => void {
        return () => {
            star.setTint(0xff0000);
            this.starsFallen += 1;
            this.time.delayedCall(100, (star: Phaser.Physics.Arcade.Image) => {
                star.destroy();
                if (this.starsFallen > 2) {
                    const params = {starsCaught: this.starsCaught};
                    this.scene.start("ScoreScene", params);
                }
            }, [star], this);
        }
    }

    private emitStar() {
        const x = Phaser.Math.Between(25, 775);
        const y = 26;
        const star = this.physics.add.image(x, y, "star");
        star.setDisplaySize(50, 50);
        star.setVelocity(0, 200);
        star.setInteractive();
        star.on('pointerdown', this.onClick(star), this);
        this.physics.add.collider(star, this.sand, this.onFall(star), null, this);
    }
}