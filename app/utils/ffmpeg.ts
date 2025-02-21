export default function ffmpeg() {
  const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path.replace('app.asar', 'app.asar.unpacked');
  return ffmpegPath;
}
