import "phaser";

export class ScoreScene extends Phaser.Scene {
    score: number;
    result: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: "ScoreScene"
        });
    }

    init(params: any) {
        this.score = params["starsCaught"];
    }

    create() {
        const resultText: string = `Your score is ${this.score} !`;
        this.result = this.add.text(
            200, 250, resultText,
            { font: "48px Arial Bold", fill: "#FBFBAC" }
        );

        const hintText: string = "Enter to restart";
        this.result = this.add.text(
            300, 350, hintText,
            { font: "24px Arial Bold", fill: "#FBFBAC" }
        );

        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start("WelcomeScene");
        });
    }
}