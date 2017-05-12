process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
var axios = require('axios')

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
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:site',
        content: 'slackpulse.github.io',
      },
      {
        name: 'twitter:title',
        content: 'アフパル計算機',
      },
      {
        name: 'twitter:description',
        content: 'イベント情報・XP計算機などアフターパルスのお役立ちツール',
      },
      {
        name: 'twitter:image',
        content: 'https://slackpulse.github.io/apple-touch-icon.png',
      },
      {
        name: 'twitter:url',
        content: 'https://slackpulse.github.io/',
      },
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
  generate: {
    routes: function(callback) {
      axios.get('https://slackpulse.sirohako.com/weapons.json')
        .then((res) => {
          var routes = res.data.map((weapon) => {
            return '/weapons/' + weapon.ID
          })
          callback(null, routes)
        })
        .catch(callback)
    }
  },
  router: {
    extendRoutes: function(routes) {
      routes.find(function(r) {
        r.path.includes('weapons/_id.vue').path = '/weapons/:id/'
      })
    },
  },
  plugins: [
    '~plugins/axios',
    {src: '~plugins/ga.js', ssr: false},
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
