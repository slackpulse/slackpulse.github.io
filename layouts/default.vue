<template>
  <div class="app">
    <header>
      <div class="navigation">
        <nuxt-link to="/" class="button--blue" exact>トップ</nuxt-link>
        <nuxt-link to="/xp" class="button--blue" exact>経験値</nuxt-link>
        <nuxt-link to="/portable" class="button--blue">ポータブル</nuxt-link>
      </div>
    </header>
    <nuxt/>
  </div>
</template>

<script>
import Vue from 'vue'
import VueTranslate from 'vue-translate-plugin'

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
export default {
  mounted() {
    this.$nextTick(() => {
      this.$translate.setLang('ja')
    })
  }
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

hr {
  border: 0;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.app {
  width: 100%;
}
.container
{
  min-height: 80vh;
  max-width: 100vw;
  overflow-x: hidden;
  padding-bottom: 40px;
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
}
.navigation {
  lost-flex-container: row;
}
.navigation > a {
  display: block;
  height: 3rem;
  line-height: 3rem;
  padding: 0 1.5rem;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
}
.row {
  lost-flex-container: row;
  min-width: 260px;
  box-sizing: border-box;

  &.center {
    lost-align: center;
    text-align: center;
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

</style>
