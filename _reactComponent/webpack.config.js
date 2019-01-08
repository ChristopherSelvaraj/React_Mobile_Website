var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve('../_public/react');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: APP_DIR + '/index.js',
    output: {
        path: BUILD_DIR,
        filename: 'reactdist.js'
    },
   plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.ProvidePlugin({
            Promise: 'es6-promise',
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: APP_DIR,
                loader: 'babel-loader',
                query:
                    {
                        presets: ['env', 'react']
                    },
                plugins :[
                        "transform-object-rest-spread"
                    ]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
};

module.exports = config;
