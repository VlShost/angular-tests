import { Injectable } from '@angular/core';
import { FileToUpload } from '../interfaces/file-to-upload';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private maxFileSize = 2 * 1024 * 1024;
  private allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];

  validateFiles(files: File[]): {
    validFiles: FileToUpload[];
    errors: string[];
  } {
    const validFiles: { name: string; size: number; type: string }[] = [];
    const errors: string[] = [];

    for (const file of files) {
      if (file.size > this.maxFileSize) {
        errors.push(`File "${file.name}" is too big`);
        continue;
      }

      if (!this.allowedTypes.includes(file.type)) {
        errors.push(`Unsupported file format for "${file.name}"`);
        continue;
      }

      validFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
      });
    }

    return { validFiles, errors };
  }
}
