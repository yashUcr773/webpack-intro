import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { PurgeCSSPlugin } from 'purgecss-webpack-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { glob } from 'glob';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default merge(common, {
    output: {
        publicPath: '/static/',
    },
    optimization: {
        minimize: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }]
                }
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ["mozjpeg", { quality: 40, progressive: true }],
                            ["pngquant", { quality: [0.7, 0.9] }],
                            [
                                "svgo",
                                {
                                    plugins: [
                                        {
                                            name: "preset-default",
                                            params: {
                                                overrides: {
                                                    removeViewBox: false,
                                                    cleanupIds: false,
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
                generator: [
                    {
                        type: 'asset',
                        preset: 'webp-custom-name',
                        implementation: ImageMinimizerPlugin.imageminGenerate,
                        options: {
                            plugins: ['imagemin-webp']
                        }
                    }
                ]
            }),
        ],
        // // based on vendors
        // splitChunks: {
        //     cacheGroups: {
        //         jquery: {
        //             test: /[\\/]node_modules[\\/]jquery[\\/]/,
        //             chunks: 'initial',
        //             name: 'jquery'
        //         },
        //         bootstrap: {
        //             test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
        //             chunks: 'initial',
        //             name: 'bootstrap'
        //         }
        //     }
        // },

        // // based on size
        // splitChunks: {
        //     chunks: 'all',
        //     maxSize: 100 * 1024,
        //     minSize: 50 * 1024,
        //     name(module, chunks, cacheGroupKey) {
        //         const fileName = path.basename(module.identifier());
        //         return fileName;
        //     }
        // },

        // // based on our code vs external libs
        // splitChunks: {
        //     chunks: 'all',
        //     maxSize: Infinity,
        //     minSize: 0,
        //     cacheGroups: {
        //         node_modules: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name: 'node_modules'
        //         }
        //     }
        // },

        // bundle based on every dependency
        // splitChunks: {
        //     chunks: 'all',
        //     maxSize: Infinity,
        //     minSize: 0,
        //     cacheGroups: {
        //         node_modules: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name(module) {
        //                 const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)[\\/]|$/)[1];
        //                 return packageName
        //             }
        //         }
        //     }
        // },

        // custom strat
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxSize: Infinity,
            minSize: 2000,
            cacheGroups: {
                lodash: {
                    test: /[\\/]node_modules[\\/]lodash-es[\\/]/,
                    name: 'lodash-es',
                },
                node_modules: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'node_modules',
                    chunks: 'initial',
                },
                async: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'async',
                    name(module, chunks) {
                        return chunks.map(chunk => chunk.name).join('-');
                    },
                }
            }
        },
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
    devtool: 'hidden-source-map',
    mode: 'production',
});