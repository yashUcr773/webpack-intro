import path from 'path';
import common from './webpack.common.js';
import { merge } from 'webpack-merge';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default merge(common, {
    mode: 'development',
    devServer: {
        port: 3008,
        static: {
            directory: path.resolve(__dirname, '..'),
        },
        devMiddleware: {
            // If you are using dev server, not writing to disk and html file is in src and not in dist,
            // you will not see the script to get.
            index: '../dist/main.html',
            // By default dev-server doesn't write files to disk and stores them in memory only.
            // So dist folder will be empty and you won't be able to see the generated files.
            // This option enables that so that other tools
            // (e.g., backend server) can read them or Developer can debug easily.
            writeToDisk: true,
        },
        client: {
            // Shows a full-screen overlay in the browser when there are compiler errors or warnings
            overlay: false
        },
        // Enable to reload the page when changes are made. Disable for Hot Module Replacement.
        liveReload: false,
        // Enable Hot Module Replacement without page reload as fallback in case of build failures.
        hot: true,
        // Automatically open the browser when the server starts
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]__[md4:hash:7]',
                                namedExport: false,
                            }
                        }
                    }
                ],
            },
        ],
    },
});