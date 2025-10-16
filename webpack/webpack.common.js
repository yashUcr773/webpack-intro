import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    entry: './src/scripts/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'scripts/[name].[contenthash:12].js',
        // Remove all files in output directory before generating new build files
        clean: true,
        // clean: {
        //     // only print logs to console when files are actually removed
        //     dry: true,
        //     // keep the following files instead of deleting them
        //     keep: /\.css/,
        // },
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ['html-loader'],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: '[name].html',
        }),
    ],
    mode: 'production',
};
