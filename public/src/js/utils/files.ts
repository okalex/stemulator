export function getFileNameFromPath(path: string) {
  const regex = /^(.*[\\\/])([^\\\/]+)(\.[^\\\/.]+)$/;
  const match = path.match(regex);
  if (match) {
    const fileName = match[2];
    return fileName;
  }
}
