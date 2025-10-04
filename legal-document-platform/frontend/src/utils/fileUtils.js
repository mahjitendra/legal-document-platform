export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

export const getFileName = (path) => {
  return path.split('/').pop();
};

export const isImageFile = (filename) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
  const ext = getFileExtension(filename).toLowerCase();
  return imageExtensions.includes(ext);
};

export const isPDFFile = (filename) => {
  return getFileExtension(filename).toLowerCase() === 'pdf';
};

export const isDocumentFile = (filename) => {
  const docExtensions = ['doc', 'docx', 'pdf', 'txt', 'odt'];
  const ext = getFileExtension(filename).toLowerCase();
  return docExtensions.includes(ext);
};

export const validateFileSize = (file, maxSizeInMB) => {
  const maxSize = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSize;
};

export const validateFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

export const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};

export const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};
