import { DataJob } from './data.job';

export class TransformJob extends DataJob {
  constructor(protected input: any[]) {
    super('Transform');
  }

  setInput(...args: any): void {
    this.input = args[0];
  }

  protected async operation(): Promise<any[]> {
    const transformed = this.input.map((row) => ({
      timestamp: new Date(row.timestamp),
      sensorId: String(row.sensorId),
      value: parseFloat(row.value),
    }));

    console.log(`[Transform] Transformed ${transformed.length} records`);
    return transformed;
  }
}
