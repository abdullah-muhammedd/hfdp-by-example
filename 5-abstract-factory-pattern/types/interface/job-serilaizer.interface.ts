export interface JobSerializerInterface {
  serialize(data: any): string;
  deserialize(serialized: string): any;
}
