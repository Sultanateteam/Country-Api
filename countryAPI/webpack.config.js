const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
    //mode
    mode: 'production',
    //entry
    entry: {
        app: path.resolve(__dirname, './src/app.js'),
        about: path.resolve(__dirname, './src/main.js'),
    },
    //output
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name][contenthash].js',
        clean: true,
    },
    //loaders
    module: {
        // rules: [
            // {
            //   test: /\.css$/i,
            //   loader: "css-loader",
            // },
        //   ],
          rules: [
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
          ],
      },
    //plugins
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'Country API',
            template: './src/index.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            title: 'Country About',
            template: './src/tempInfo.html',
            chunks: ['about']
        }),
        new MiniCssExtractPlugin(),

    ],
    //Devserver
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        hot: true,
        open: true,
        historyApiFallback: true,
      },
}