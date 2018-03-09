
var _ = require('lodash');
var path = require('path');
var glob = require('glob');
var pathCfg = require('./path.config');

//console.log('>>> pathCfg', pathCfg, "\n");
//console.log('>>> __dirname', __dirname, "\n");

function getDirName(file) {
    var arr = path.dirname(file).split('/');
    return arr[arr.length - 1];
}

function resolvePathWithDirectory(globPath) {
    var files = glob.sync(globPath);
    console.log(files);
    var entries = {};
    var entry, filename, i, l;

    for (i = 0, l = files.length; i < l; i++) {
        entry = files[i];
        filename = path.basename(entry, path.extname(entry));
        entries[getDirName(entry) + '/' + filename] = entry;
    }

    return entries;
}

module.exports = {

	// 대상: 웹팩이 파일을 읽어 들이는 부분
	entry: _.merge(
    resolvePathWithDirectory(pathCfg.srcDir + 'components/**/*.js'),
    {
      vender: ['jquery','jquery-lazyload']
    }
  ),

  resolve: {
    modules: ['node_modules','.'+pathCfg.srcDir+'lib/m.jquery.lib'],
    extensions: ['.js', '.json', '.jsx', '.css']
  },

	// 결과: 결과물 처리
	output: {

		// 배포 빌드 시 로더(url-loader) 사용 시 css 내부 url들을 업데이트 해주기 위한 것 (prefix 같은..)
		publicPath 	: '/',

		// 어디에?
		path 	 	: path.resolve(pathCfg.distDir + 'js/'),

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
