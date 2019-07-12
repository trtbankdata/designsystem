const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = env => {
    const config = {
        mode: "production",
        entry: {
            'resize-observer-polyfill': './projects/kirby/src/polyfills/resize-observer-polyfill.js',
            'resize-observer-polyfill-loader': './projects/kirby/src/polyfills/resize-observer-polyfill-loader',
        },
        output: {
            filename: '[name].min.js',
            path: path.resolve(__dirname, 'projects/kirby/src/polyfills/')
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: "./projects/cookbook/src/polyfills/resize-observer-polyfill-loader.js" },
            ]),
        ]
    };

    return config;
};
