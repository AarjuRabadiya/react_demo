const webpack = require("webpack");
const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const env = require("dotenv").config();
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const CompressionPlugin = require("compression-webpack-plugin");
const ENV = process.env.NODE_ENV || "development";
const TerserPlugin = require("terser-webpack-plugin");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// console.log(ENV);

module.exports = {
  entry: "./Src/index.js",
  node: {
    fs: "empty",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader?limit=100000",
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      Components: path.resolve(__dirname, "Src/App/Components"),
      Pages: path.resolve(__dirname, "Src/App/Pages"),
      Partials: path.resolve(__dirname, "Src/App/Partials"),
      Base: path.resolve(__dirname, "Src/App"),
      Src: path.resolve(__dirname, "Src"),
      Stores: path.resolve(__dirname, "Src/App/Stores"),
    },
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    publicPath: "/",
    // publicPath: "/mining/",
    // filename: "[name].[hash].js",
    filename: "[name].js",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
      }),
    ],
  },

  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        API_URL: JSON.stringify(process.env.API_URL),
        BASE_URL: JSON.stringify(process.env.BASE_URL),
        OPENSEA_URL: JSON.stringify(process.env.OPENSEA_URL),
        CLIENTID: JSON.stringify(process.env.CLIENTID),
        APPID: JSON.stringify(process.env.APPID),
      },
    }),

    new HtmlWebpackPlugin({
      title: "Caching",
      template: "index.html",
    }),
  ].concat(
    ENV === "production"
      ? [
          new webpack.optimize.OccurrenceOrderPlugin(),
          new webpack.optimize.AggressiveMergingPlugin(),
          new CleanWebpackPlugin({
            //root: '/',
            verbose: true,
            dry: false,
            cleanOnceBeforeBuildPatterns: ["./*.js", "./*.js.gz"],
          }),

          // new BundleAnalyzerPlugin(),
          new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
          }),
          new HtmlWebpackPlugin({
            title: "Caching",
            template: "index.html",
          }),

          new CleanWebpackPlugin({
            //root: '/',
            verbose: true,
            dry: false,
            cleanOnceBeforeBuildPatterns: ["./*.js", "./*.js.gz"],
          }),
        ]
      : []
  ),
  devServer: {
    // host: "192.168.22.74",
    // https: true,
    host: "localhost",
    port: "3000",
    contentBase: "./dist",
    hot: true,
    historyApiFallback: true,
  },
};
