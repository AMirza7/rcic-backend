import { LocalStorageService } from "./LocalStorageService";
import { WasabiStorageService } from "./WasabiStorageService";
import { IStorageService } from "./IStorageService";

const wasabi = new WasabiStorageService();
const local  = new LocalStorageService();

export const StorageService: IStorageService = {
  async upload(buf, key) {
    try { return await wasabi.upload(buf, key); }
    catch { return await local.upload(buf, key); }
  },
  async delete(key) {
    try { return await wasabi.delete(key); }
    catch { return await local.delete(key); }
  },
  getUrl(key) {
    try { return wasabi.getUrl(key); }
    catch { return local.getUrl(key); }
  },
};
