import AWS from "aws-sdk";
import { IStorageService } from "./IStorageService";

export class WasabiStorageService implements IStorageService {
  private s3 = new AWS.S3({
    endpoint: new AWS.Endpoint(process.env.WASABI_ENDPOINT!),
    accessKeyId: process.env.WASABI_KEY,
    secretAccessKey: process.env.WASABI_SECRET,
    signatureVersion: "v4",
  });
  private bucket = process.env.WASABI_BUCKET!;

  async upload(buffer: Buffer, key: string) {
    await this.s3
      .putObject({ Bucket: this.bucket, Key: key, Body: buffer, ACL: "private" })
      .promise();
  }

  async delete(key: string) {
    await this.s3
      .deleteObject({ Bucket: this.bucket, Key: key })
      .promise();
  }

  getUrl(key: string) {
    return this.s3.getSignedUrl("getObject", {
      Bucket: this.bucket,
      Key: key,
      Expires: 3600,
    });
  }
}
