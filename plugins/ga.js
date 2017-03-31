import router from '~router'
if (process.env.NODE_ENV === 'production') {
  ((i, s, o, g, r, a, m) => {
    i['GoogleAnalyticsObject'] = r
    i[r] = i[r] || (() => {
      (i[r].q = i[r].q || []).push(arguments)
    })
    i[r].l = 1 * new Date()
    a = s.createElement(o)
    m = s.getElementsByTagName(o)[0]
    a.async = 1
    a.src = g
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')
  ga('create', 'UA-83619602-1', 'auto')

  router.afterEach((to, from) => {
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}
