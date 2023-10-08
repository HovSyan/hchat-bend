export class Logger {
    logln(...msg: any[]): void {
        console.log(...msg);
    }

    log(...msg: any[]): void {
        process.stdout.write(`${msg.join(' ')}`);
    }
}