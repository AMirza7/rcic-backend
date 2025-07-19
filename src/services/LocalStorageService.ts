import { IStorageService } from "./IStorageService";
import fs from "fs/promises";
import path from "path";

export class LocalStorageService implements IStorageService {
  private base = path.resolve(process.cwd(), "uploads");

  async upload(buffer: Buffer, key: string) {
    const full = path.join(this.base, key);
    await fs.mkdir(path.dirname(full), { recursive: true });
    await fs.writeFile(full, buffer);
  }

  async delete(key: string) {
    await fs.unlink(path.join(this.base, key));
  }

  getUrl(key: string) {
    return `/uploads/${key}`;
  }
}
