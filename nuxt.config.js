module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'アフパル計算機',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      {
        hid: 'アフパル計算機',
        name: 'アフパル計算機',
        content: 'アフターパルス計算機'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#3B8070'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: [
      require('postcss-cssnext')(),
      require('postcss-nested')(),
      require('lost')(),
    ],
  },
  plugins: [
    '~plugins/axios',
    { src: '~plugins/ga.js', ssr: false },
  ],
	minify: {
		collapseBooleanAttributes: true,
		collapseWhitespace: true,
		decodeEntities: true,
		minifyCSS: true,
		minifyJS: true,
		processConditionalComments: true,
		removeAttributeQuotes: false,
		removeComments: false,
		removeEmptyAttributes: true,
		removeOptionalTags: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: false,
		removeStyleLinkTypeAttributes: false,
		removeTagWhitespace: false,
		sortAttributes: true,
		sortClassName: true,
		trimCustomFragments: true,
		useShortDoctype: true,
	}
}
