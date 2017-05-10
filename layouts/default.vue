<template>
  <div class="app">
    <header v-bind:style="headerStyle">
      <div class="navigation">
        <nuxt-link to="/" class="navitem" exact>トップ</nuxt-link>
        <nuxt-link to="/xp" class="navitem" exact>経験値</nuxt-link>
        <nuxt-link to="/portable" class="navitem">ポータブル</nuxt-link>
      </div>
    </header>
    <nuxt/>
    <div class="disqus">
      <vue-disqus shortname="slackpulse" :identifier="$route.path"></vue-disqus>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueTranslate from 'vue-translate-plugin'
import VueDisqus from 'vue-disqus/VueDisqus.vue'

Vue.use(VueTranslate)

Object.assign(String.prototype, {
  reverse() {
    return this.split('').reverse().join('')
  },
  commify() {
    const num = parseInt(this, 10)
    return num.commify()
  },
  trunc(length) {
    if (this.length > length) {
      return [this.substring(0, length - 1), '...'].join('')
    }
    return this
  }
})
Object.assign(Number.prototype, {
  commify() {
    let str = this.toString()
    str = str.reverse()
    str = str.replace(/(\d\d\d)(?=\d)(?!\d*\.)/g, '$1,')
    str = str.reverse()
    return str
  }
})
Vue.filter('commify', value => {
  return value ? value.commify() : ''
})
Vue.filter('trunc', (value) => {
  return value ? value.trunc(140) : ''
})

var ticking = false

export default {
  mounted() {
    this.$nextTick(() => {
      const that = this
      window.addEventListener('scroll', (e) => {
        that.$store.commit('SET_SCROLL', window.scrollY)
        if (!ticking) {
          window.requestAnimationFrame(() => {
            ticking = false
          })
        }
        ticking = true
      })
      this.$translate.setLang('ja')
    })
  },
  computed: {
    scrollY() {
      return this.$store.state.scrollY
    },
    headerStyle() {
      return {
        transform: ['translateY(', this.scrollY, 'px)'].join(''),
      }
    },
  },
  components: {
    VueDisqus,
  },
}
</script>

<style>
html
{
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*, *:before, *:after
{
  box-sizing: border-box;
  margin: 0;
}
.button--green
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover
{
  color: #fff;
  background-color: #3b8070;
}
.button--blue
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3498db;
  color: #3498db;
  text-decoration: none;
  padding: 10px 30px;
}
.button--blue:hover
{
  color: #fff;
  background-color: #3498db;
}
.button--grey
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover
{
  color: #fff;
  background-color: #35495e;
}

h2 {
  margin-top: 40px;
  margin-bottom: 40px;
}

h1,h2,h3,h4,h5,h6 {
  color: #526488;
  text-align: center;
}

.app {
  width: 100%;
  z-index: 0;
}
.container
{
  min-height: 80vh;
  max-width: 100vw;
  overflow-x: hidden;
  padding-bottom: 40px;
  z-index: 1;
  padding-top: 4rem;
}
.container > * {
  max-width: 100%;
}
.layout-enter-active, .layout-leave-to {
    transition: opacity .5s;
}
.layout-enter, .layout-leave-to {
    opacity: 0;
}
header {
  min-height: 4rem;
  z-index: 5000;
  position: absolute;
  width: 100%;
  top: 0;
}
.navigation {
  lost-flex-container: row;
  border: 1px solid #3498db;
  box-sizing: border-box;
  background-color: hsl(212, 88%, 54%);
}
.navitem
{
  lost-column: 1/3 3 1px flex;
  font-weight: bold;
  background-color: hsl(212, 88%, 54%);
  color: #ffffff;
  text-decoration: none;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
}
.navitem:hover
{
  color: #3498db;
  background-color: #ffffff;
}
.row {
  lost-flex-container: row;
  min-width: 260px;
  box-sizing: border-box;

  &.center {
    lost-align: center;
    text-align: center;
    min-height: 4rem;
  }
}
.label {
  display: block;
  min-width: 80px;
  margin-top: auto;
  margin-bottom: auto;
  font-weight: bold;
}
.statistics {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
}
.col2 {
  lost-column: 1/2 flex;
  lost-flex-container: column;
  padding-left: 1rem;
  padding-right: 1rem;

  &.center {
    text-align: center;
  }
  &.left {
    text-align: left;
  }
  &.right {
    text-align: right;
  }
}
.slider-wrapper {
  min-width: 300px;
  width: 80%;
  margin: 2rem auto 0;
}
.form-start {
  margin-top: 40px;
}

.disqus {
  padding: 4rem;
}
</style>
