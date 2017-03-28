<template>
  <div>
    <header>
      <div class="links">
        <nuxt-link to="/" class="button--blue" exact>トップ</nuxt-link>
        <nuxt-link to="/xp" class="button--blue" exact>経験値</nuxt-link>
        <nuxt-link to="/portable" class="button--blue">ポータブル</nuxt-link>
      </div>
    </header>
    <transition name="layout" mode="out-in">
      <nuxt/>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import VueTranslate from 'vue-translate-plugin'

Vue.use(VueTranslate)

Object.assign(String.prototype, {
  reverse() {
    console.log(this)
    return this.split('').reverse().join('')
  },
  commify() {
    const num = parseInt(this, 10)
    return num.commify()
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

.container
{
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
  overflow-scrolling: none;
  padding-bottom: 40px;
}
.layout-enter-active, .layout-leave-to {
    transition: opacity .5s;
}
.layout-enter, .layout-leave-to {
    opacity: 0;
}
</style>
