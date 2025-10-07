export interface IS3Service {
  uploadImage(
    file: Buffer,
    fileName: string,
    contentType: string,
  ): Promise<string>;
  deleteImage(imageUrl: string): Promise<void>;
}
