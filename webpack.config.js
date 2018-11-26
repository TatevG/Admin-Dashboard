const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const modules = require('./webpack.config.modules');

const publicPath = '/';
const srcPath = path.join(__dirname, 'src');
const outputPath = path.resolve(__dirname, 'dist');

let BASE_URL = '';
switch (process.env.NODE_ENV) {
    case 'production':
        BASE_URL = 'http://46.101.151.42/api';
        break;
    case 'staging':
        BASE_URL = 'http://46.101.151.42:8080/api';
        break;
    default:
        BASE_URL = 'http://192.168.2.103:8888/api';
        break;
}

const config = {

    entry: {
        app: path.join(srcPath, 'index.jsx'),
        login: path.join(srcPath, 'containers', 'login', 'index.jsx'),
        addShop: path.join(srcPath, 'containers', 'addShop', 'index.jsx'),
        addShopType: path.join(srcPath, 'containers', 'addShopType', 'index.jsx'),
        administrativeUser: path.join(srcPath, 'containers', 'administrativeUser', 'index.jsx'),
        analitics: path.join(srcPath, 'containers', 'analitics', 'index.jsx'),
        bonusIn: path.join(srcPath, 'containers', 'bonusIn', 'index.jsx'),
        bonusOut: path.join(srcPath, 'containers', 'bonusOut', 'index.jsx'),
        cards: path.join(srcPath, 'containers', 'cards', 'index.jsx'),
        editShop: path.join(srcPath, 'containers', 'editShop', 'index.jsx'),
        news: path.join(srcPath, 'containers', 'news', 'index.jsx'),
        products: path.join(srcPath, 'containers', 'products', 'index.jsx'),
        root: path.join(srcPath, 'containers', 'root', 'index.jsx'),
        shopList: path.join(srcPath, 'containers', 'shopList', 'index.jsx'),
        shopsActivity: path.join(srcPath, 'containers', 'shopsActivity', 'index.jsx'),
        users: path.join(srcPath, 'containers', 'users', 'index.jsx'),
    },

    output: {
        path: outputPath,
        publicPath: publicPath,
        filename: '[name].bundle-[hash].js',
    },
    optimization: {
        minimize: process.env.NODE_ENV !== 'developmant',
        runtimeChunk: {
            name: 'vendor'
        },
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 10,
            maxInitialRequests: 5,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                default: false,
                commons: {
                    test: /node_modules/,
                    name: "vendor",
                    chunks: "initial",
                    minSize: 3
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },

    module: modules,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'developmant'),
            'process.env.BASE_URL': JSON.stringify(BASE_URL),
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),

        }),
        new MiniCssExtractPlugin({
            filename: "[name][hash].css",
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        port: 3030,
        host: 'localhost',
        disableHostCheck: true,
        historyApiFallback: true,
    },
};
if (process.env.NODE_ENV === 'developmant') {
    config.devtool = 'source-map';
}
module.exports = config;