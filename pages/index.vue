<template>
  <section class="container">
    <div>
      <h1 class="title">
        アフパル計算機
      </h1>
      <h2 class="subtitle">
        @slackpulse
      </h2>

      <div class="links">
        <a href="https://github.com/slackpulse/slackpulse.github.io" target="_blank" class="button--grey">Github</a>
      </div>

      <h3>新着ニュース</h3>
      <div class="news">
        <a class="news--item" v-for="link in links" v-bind:href="link.url">
          <span class="news--title">{{link.title}}</span><br />
          <span class="news--link">{{link.url}}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~plugins/axios'
import jsonp from 'jsonp'
import Promise from 'bluebird'

const FETCH_URL = 'https://script.google.com/macros/s/AKfycbx-lmU0zm5hJ5Ko8rt1O6fRcWoyES04_g4e6Ko4xN3R1-QqCcA/exec'

export default {
  async fetch({store, params}) {
    if (store.state.links.length) {
      return Promise.resolve()
    }
    if (!process.BROWSER_BUILD) {
      return axios.get(FETCH_URL)
        .then((res) => {
          const sorted = [].concat(res.data)
            .sort((a, b) => {
              if (a.createdAt < b.createdAt) {
                return 1
              }
              if (a.createdAt > b.createdAt) {
                return -1
              }
              return 0
            })
          store.commit('LINK_RESET')
          store.commit('LINK_RETRIEVED', {data: sorted})
        })
    }

    return new Promise((resolve, reject) => {
      jsonp(FETCH_URL, null, (err, data) => {
        if (err) {
          reject(err)
          return
        }
        const sorted = [].concat(data)
          .sort((a, b) => {
            if (a.createdAt < b.createdAt) {
              return 1
            }
            if (a.createdAt > b.createdAt) {
              return -1
            }
            return 0
          })
        store.commit('LINK_RESET')
        store.commit('LINK_RETRIEVED', {data: sorted})
        resolve()
      })
    })
  },
  computed: {
    links() {
      return this.$store.state.links
    }
  },
}
</script>

<style>
.title
{
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 2rem;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle
{
  font-weight: 300;
  font-size: 1.5rem;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links
{
  padding-top: 15px;
  margin-bottom: 20px;
}

.news {
  width: 100%;
  margin: auto;
  box-sizing: border-box;
}
.news--item{
  width: 100%;
  margin: auto;
  padding: 0.5rem 2rem 0.5rem;
  box-sizing: border-box;
}
.news--title {
  width: 100%;
  font-weight: bold;
}
.news--link {
  width: 100%;
  word-break: break-all;
  white-space: prewrap;
}
.news a {
  display: inline-block;
  color: #3498db;
  text-decoration: none;
}
.news a:hover {
  color: #fff;
  background-color: #3498db;
}
</style>
