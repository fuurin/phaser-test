export class FPS {
    private _fps: number = 0;
    private frames: number = 0;
    private timer: NodeJS.Timeout;

    public start(): FPS {
        this.frames = 0;
        this._fps = 0;
        this.timer = setInterval(() => {
            this._fps = this.frames;
            this.frames = 0;
        }, 1000);
        return this;
    }

    public stop() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    public update() {
        this.frames++;
    }

    get fps(): number {
        return this._fps
    }
}