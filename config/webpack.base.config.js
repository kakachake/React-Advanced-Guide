const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const devConfig = require("./webpack.dev.config");

const Appconfig = {
  entry: "./src/index.tsx",
  output: {
    path: __dirname + "../dist",
    filename: "[name].js",
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".json",
    ] /* 这几个后缀名的文件后缀可以省略不写 */,
    alias: {
      "@": path.join(__dirname, "./src") /* @就表示根目录src这个路径 */,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "imgs/",
            limit: 2048,
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
      },
    ],
  },
  optimization: {
    /* 代码分割 */
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = (env) => {
  if (env && env.production) {
    return merge(Appconfig);
  } else {
    return merge(Appconfig, devConfig);
  }
};
