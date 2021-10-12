const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const javaScriptRules = {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modues$/,
    options: {
        presets: ['@babel/preset-env']
    }
}

const htmlRules = {
    test: /\.html$/,
    loader: 'html-loader',
    options: {
        minimize: true,
        sources: false
    }
}

const fileRules = {
    test: /\.(png|jpe?g|gif)$/,
    loader: 'file-loader',
    options:{
        name: '[path][name].[ext]'
    }
}

const cssRules = {
    test: /\.css$/,
    exclude: /styles.css$/,
    use: ['style-loader','css-loader']
}

const styleGlobalRules = {
    test: /styles.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader']
}

const htmlWebpackPluginConfig = {
    template: '/src/index.html'
}

const miniCssExtractPluginConfig = {
    filename: '[name].[fullhash].css',
    ignoreOrder: false
}

const copyWebpackPluginConfig = {
    patterns:[
        {from: 'src/assets/', to: 'assets/'},
    ]
}

module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'docs'),
        clean: true,
        filename: '[name].[fullhash].js'
    },
    module: {
        rules:[
            javaScriptRules,
            htmlRules,
            fileRules,
            cssRules,
            styleGlobalRules
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    },
    plugins:[
        new HtmlWebpackPlugin( htmlWebpackPluginConfig ),
        new MiniCssExtractPlugin( miniCssExtractPluginConfig ),
        new CopyWebpackPlugin( copyWebpackPluginConfig  )
    ],
    devServer: {
        open: true,
        port: 3000,
        compress: true 
    }

}