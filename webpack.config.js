module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: './build/index.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.styl$/, loader: 'style!css!stylus' }
        ]
    }
};
