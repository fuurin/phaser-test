import "phaser"

export class MainScene extends Phaser.Scene {
    delta: number;
    lastStarTime: number;
    starsCaught: number;
    startFallen: number;
    sand: Phaser.Physics.Arcade.StaticGroup;
    info: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: "MainScene"
        });
    }

    init(params: any): void {
        this.delta = 1000;
        this.lastStarTime = 0;
        this.starsCaught = 0;
        this.startFallen = 0;
    }

    preload(): void {
        this.load.setBaseURL(
            "https://raw.githubusercontent.com/mariyadavydova/" +
            "starfall-phaser3-typescript/master/");
        this.load.image("star", "assets/star.png");
        this.load.image("sand", "assets/sand.jpg");
    }

    create(): void {
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
    }

    update(time: number): void {
        console.log(time)
    }
}