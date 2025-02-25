export function getFileNameFromPath(path: string) {
  const regex = /^(.*[\\\/])([^\\\/]+)(\.[^\\\/.]+)$/;

  if (!path) {
    return '';
  }

  const match = path.match(regex);
  if (match) {
    const fileName = match[2];
    return fileName;
  }
}
