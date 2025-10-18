import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { PurgeCSSPlugin } from 'purgecss-webpack-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default merge(common, {
    optimization: {
        minimize: false,
        minimizer: [
            `...`,
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }]
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /\.module\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.css$/i,
                include: /\.module\.css$/i,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            // this is true by default. set to false to use default exports
                            namedExport: false,
                            localIdentName: '[hash:base64]'
                        }
                    }
                }],
            },
            {
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            quietDeps: true,
                            silentDeprecations: ['import']
                        }
                    }
                }
                ],
            },
            {
                test: /\.(png|jpg|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    }
                },
                generator: {
                    filename: './assets/images/[name].[contenthash:12][ext]'
                },
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(
                `${path.join(__dirname, '../src')}/**/*`,
                { nodir: true }
            )
        })
    ],
    mode: 'production',
});