const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = configDirs => {
  let prodConfig = Object.assign({}, require('./common')(configDirs));
  prodConfig = {
    ...prodConfig,
    devtool: 'source-map',
    output: {
      ...prodConfig.output,
      filename: '[name].[contenthash:8].js'
    },
    module: {
      ...prodConfig.module,
      rules: [
        ...prodConfig.module.rules,
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      ...prodConfig.plugins,
      // new MinifyPlugin(),
      new MiniCssExtractPlugin({ filename: '[name].css' }),
      new CompressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: { level: 11 },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false
      }),
      new BundleAnalyzerPlugin()
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: true,
          parallel: true,
          terserOptions: {
            extractComments: 'all',
            compress: {
              drop_console: true
            }
          }
        }),
        new OptimizeCssAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }]
          }
        })
      ],
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 5,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            }
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      },
      runtimeChunk: 'single'
    }
  };
  return prodConfig;
};
