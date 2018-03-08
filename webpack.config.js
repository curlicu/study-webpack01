
console.log('__dirname: ' + __dirname)

module.exports = {

	// 대상: 웹팩이 파일을 읽어 들이는 부분
	entry: {
		index 		: './index.js',
		main 		: './main.js'
	},
	// 결과: 결과물 처리
	output: {

		// 배포 빌드 시 로더(url-loader) 사용 시 css 내부 url들을 업데이트 해주기 위한 것 (prefix 같은..)
		publicPath 	: '/',

		// 어디에?
		path 	 	: __dirname + '/resources',

		// 어떻게?, [hash](매번), [chunkhash](변경있을 때만) -> 캐싱 정책
		filename 	: '[name].[chunkhash].js'
	},

	// loader
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	}
};