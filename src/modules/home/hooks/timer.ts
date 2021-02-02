class Timer {
    private fxNow: number;

    constructor() {
        this.fxNow = undefined;
    }

    private createFxNow() {
        window.setTimeout(() => {
            this.fxNow = undefined;
        });

        this.fxNow = Date.now();
        return this.fxNow;
    }

    getFxNow() {
        return this.fxNow || this.createFxNow();
    }
}

export default Timer;
