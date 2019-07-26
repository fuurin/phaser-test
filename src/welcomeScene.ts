import "phaser";

export class WelcomeScene extends Phaser.Scene {
    title: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;
    enter: Phaser.Input.Keyboard.Key;

    constructor() {
        super({
            key: "WelcomeScene"
        });
    }

    create() {
        const titleText: string = "Starfall";
        this.title = this.add.text(
            150, 200, titleText,
            { font: '128px Arial Bold', fill: '#FBFBAC'}
        );
        
        const hintText: string = "Enter to start";
        this.hint = this.add.text(
            300, 350, hintText,
            { font: "24px Arial Bold", fill: '#FBFBAC' }
        );

        this.enter = this.input.keyboard.addKey("ENTER");
    }

    update(time: number) {
        if (this.enter.isDown) {
            this.scene.start("MainScene");
        }
    }
}