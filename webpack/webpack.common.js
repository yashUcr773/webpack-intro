import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    entry: './src/scripts/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[contenthash:12].js',
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ['html-loader'],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: '[name].html',
        }),
    ],
    mode: 'production',
};
