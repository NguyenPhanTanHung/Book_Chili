const path = require('path');
const { getDefaultConfig } = require('metro-config');

module.exports = {
  resolver: {
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'],
  },
};

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  config.resolver.assetExts.push('ttf');
  return config;
})();