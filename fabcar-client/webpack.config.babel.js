const path = require('path');

const APP_DIR = path.join(__dirname, 'public/');
const BUILD_DIR = path.resolve(__dirname, 'dist/');

const configDirs = {
  BUILD_DIR,
  APP_DIR,
  ALIAS_PATH: path.resolve(__dirname, 'src/')
};

const buildConfig = env => {
  if (env === 'dev' || env === 'prod') {
    return require(`./config/${env}.js`)(configDirs);
  }
  console.log("Wrong webpack build parameter. Possible choices: 'dev' or 'prod'.");
  return null;
};
module.exports = buildConfig;
