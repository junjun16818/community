var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin')

// Webpack Config
var webpackConfig = {
    entry: {
        'polyfills': './client/polyfills.browser.ts',
        'vendor':    './client/vendor.browser.ts',
        'main':       './client/main.browser.ts',
        'library':       './client/library.browser.ts',
    },

    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            // 'Morris': 'morris.js',
            'Raphael': 'raphael'
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'library', 'vendor', 'polyfills'], minChunks: Infinity }),
        new CopyWebpackPlugin([
            { from: 'index.html', to: path.join(__dirname, 'dist/client'), context: path.join(__dirname, 'client') },
            { from: '**/*', to: path.join(__dirname, 'dist/client'), context: path.join(__dirname, 'resource/') },
            { from: 'editor.md/**/*', to: path.join(__dirname, 'dist/client'), context: path.join(__dirname, 'node_modules/') }
        ])
    ],

    module: 
    {
        loaders: [
            // .ts files for TypeScript
            { test: /\.ts$/, loaders: [`awesome-typescript-loader?tsconfig=${__dirname}/tsconfig-es5.json`, 'angular2-template-loader'] },
            // { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
            { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
            { test: /\.(png|jpg|woff|woff2|eot|ttf|svg|gif)?(\?#[a-z0-9]+-[a-z0-9]+)?(\?-[a-z0-9]+)?(\?[0-9]+)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=100000' },
            { test: /\.html$/, loader: 'raw-loader' }
        ]
    },
    devtool: 'cheap-module-source-map',
    cache: true,
    debug: true,
    output: {
        path: './dist/client',
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        root: [ path.join(__dirname, 'client') ],
        extensions: ['', '.ts', '.js']
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },

    node: {
        global: 1,
        crypto: 'empty',
        module: 0,
        Buffer: 0,
        clearImmediate: 0,
        setImmediate: 0,
        fs: 'empty'
    }
}

var fs = require('fs')

var nodeModules = {}

fs.readdirSync('node_modules').filter(function(x) {
    return ['.bin'].indexOf(x) === -1
}).forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
})

var serverConfig = {
    entry: { index: "./server/server.ts" },
    output: {
        path: __dirname,
        filename: "./dist/server/server.js"
    },
    target: 'node',
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    resolve: {
        extensions: ['', '.ts', 'js']
    },
    node: {
        __dirname: false
    },
    externals: nodeModules
}

//webpackConfig
module.exports = [ webpackConfig, serverConfig]
 