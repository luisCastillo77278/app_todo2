const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const htmlRules = {
    test: /\.html$/,
    loader: 'html-loader'
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
    filename: '[name].css',
    ignoreOrder: false
}

const copyWebpackPluginConfig = {
    patterns:[
        {from: 'src/assets/', to: 'assets/'},
    ]
}

module.exports = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'docs'),
        clean: true
    },
    module: {
        rules:[
            htmlRules,
            fileRules,
            cssRules,
            styleGlobalRules
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