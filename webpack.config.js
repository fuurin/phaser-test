const path = require("path");

module.exports = {
	devtool: "inline-source-map",
 	entry: "./src/app.ts",
 	resolve: {
   		extensions: [".ts", ".js"]
   	},
 	module: {
   		rules: [
			{
				test: /\.ts$/,
				use: "awesome-typescript-loader",
				exclude: [/node_modules/],
			}
   		]
   	},
 	output: {
 		filename: "app.js",
 		path: path.join(__dirname, "dist"),
	},
	devServer: {
		open: true,
		contentBase: path.join(__dirname, 'dist'),
		watchContentBase: true,
	}
 }