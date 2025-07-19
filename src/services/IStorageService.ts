export interface IStorageService {
    upload(buffer: Buffer, key: string): Promise<void>;
    delete(key: string): Promise<void>;
    getUrl(key: string): string;
  }
  