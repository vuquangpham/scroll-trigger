// config
const config = require('./config');

// export
module.exports = {
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            '@': config.paths.srcDirectory,
        },
    },
};