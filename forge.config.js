const path = require('path');

module.exports = {
  packagerConfig: {
    name: 'Stemulator',
    asar: {
      unpack: '**/node_modules/@ffmpeg-installer/**', // Ensures FFmpeg is unpacked
      unpackDir: 'models_dist',
    },
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
