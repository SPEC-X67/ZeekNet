export interface IS3Service {
  uploadImage(file: Buffer, fileName: string, contentType: string): Promise<string>;
  uploadImageToFolder(file: Buffer, fileName: string, contentType: string, folder: string): Promise<string>; 
  getImageUrl(key: string): string; 
  deleteImage(imageUrl: string): Promise<void>;
  deleteImageByKey(key: string): Promise<void>; 
  getSignedUrl(key: string, expiresIn?: number): Promise<string>; 
  extractKeyFromUrl(imageUrl: string): string; 
  // Upload resumes (PDF/DOC/DOCX) into a dedicated folder, return public URL or key depending on implementation
  uploadResume?(file: Buffer, fileName: string, contentType: string): Promise<string>;
}