export class Logger {

  public constructor(private readonly namespace: string) {}

  private get prefix() {
    return `[${this.namespace}]`
  }

  public info(...message: string[]) {
    console.info(this.prefix, ...message)
  }

}