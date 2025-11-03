import webpack from 'webpack'
import { resolve } from 'path'

const config: webpack.Configuration = {
    mode: 'none',
    devtool: 'inline-source-map',
    entry: {
        'bundle': './src/scripts/index.ts'
    },
    target: 'node',
    module: {
        rules: [{
            exclude: /node_modules/,
            use: {
                loader: 'ts-loader',
                options: {
                    transpileOnly: false,
                }
            }
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: resolve('./', 'dist'),
    },
}

export default config;