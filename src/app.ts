import "phaser";
import { MainScene } from "./mainScene";
import { WelcomeScene } from "./welcomeScene";
import { ScoreScene } from "./scoreScene";

const config: Phaser.Types.Core.GameConfig = {
    title: "Phaser Test",
    width: 800,
    height: 600,
    parent: "app",
    scene: [WelcomeScene, MainScene, ScoreScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    backgroundColor: "#000033"
}

export class PhaserTestGame extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config)
    }
}

window.onload = () => {
    var game = new PhaserTestGame(config);
}