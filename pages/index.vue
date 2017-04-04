<template>
  <section class="container">
    <h1 class="title">
      アフパル計算機
    </h1>
    <h2 class="subtitle">
      @slackpulse
    </h2>

    <div class="links">
      <a href="https://github.com/slackpulse/slackpulse.github.io" target="_blank" class="button--grey">Github</a>
    </div>

    <h3>イベント</h3>
    <div class="news" v-show="events.length">
      <a class="news--item" v-for="link in events" v-bind:href="link.url">
        <div class="news--content">
          <span class="news--title">{{link.title | trunc}}</span>
          <span class="news--term">{{link.startAt | dateformat}} から {{link.endAt | dateformat}} まで</span>
        </div>
      </a>
    </div>

    <h3>新着ニュース</h3>
    <div class="news" v-show="links.length">
      <a class="news--item" v-for="link in links" v-bind:href="link.url">
        <img class="news--image" v-bind:src="link | eyecatch" />
        <div class="news--content">
          <span class="news--title">{{link.title | trunc}}</span>
          <span class="news--link">{{link.url}}</span>
        </div>
      </a>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import jsonp from 'jsonp'
import moment from 'moment'

moment.locale('ja')

const TIMELINE_FETCH_URL = 'https://script.google.com/macros/s/AKfycbyeKuozUgWPCcgUsSikZB-_1m5uafP8OYW0iA8sLcMb5aF5GQld/exec'
const FETCH_URL = 'https://script.google.com/macros/s/AKfycbx-lmU0zm5hJ5Ko8rt1O6fRcWoyES04_g4e6Ko4xN3R1-QqCcA/exec'

export default {
  data() {
    return {
      loading: false,
      events: [],
    }
  },
  mounted() {
    const that = this
    this.$nextTick(() => {
      this.loading = true
      jsonp(TIMELINE_FETCH_URL, null, (err, data) => {
        if (err) {
          return
        }
        that.events = _.chain(data)
          .sort((a, b) => {
            if (a.startAt < b.startAt) {
              return 1
            }
            if (a.startAt > b.startAt) {
              return -1
            }
            return 0
          })
          .map((item) => {
            item.startAt = moment(item.startAt, 'MM/DD HH:mm')
            item.endAt = moment(item.endAt, 'MM/DD HH:mm')
            return item
          })
          .reject((item) => {
            return item.endAt.toDate() < Date.now()
          })
          .value()
      })
      jsonp(FETCH_URL, null, (err, data) => {
        that.loading = false
        if (err) {
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
        that.$store.commit('LINK_RESET')
        that.$store.commit('LINK_RETRIEVED', {data: sorted})
      })
    })
  },
  computed: {
    links() {
      return this.$store.state.links
    }
  },
  filters: {
    eyecatch(link) {
      if (!link || !link.title) {
        return null
      }

      if (/^\[event\]/i.test(link.title)) {
        return require('~static/images/logo-gamevil-event-80.png')
      }
      if (/^\[notice\]/i.test(link.title)) {
        return require('~static/images/logo-gamevil-notice-80.png')
      }
      if (/アフターパルス/i.test(link.title)) {
        return require('~static/images/logo-gamevil-japan-80.png')
      }
      return require('~static/images/logo-gamevil-80.png')
    },
    dateformat(iso) {
      return moment(iso).format('M月D日 (ddd) H:mm')
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
  margin-top: 40px;
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
  text-align: center;
  margin-bottom: 30px;
}

.news {
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  margin-bottom: 30px;
}
.news--item{
  width: 100%;
  margin: auto;
  padding: 1rem 2rem 1rem;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.news--image {
  position: relative;
  width: 40px;
  height: 40px;
  display: inline-block;
  margin-right: 0.5rem;
}
.news--content {
  width: 320px;
  position: relative;
  display: block;
}
.news--title {
  width: 100%;
  font-weight: bold;
  max-height: 80px;
  overflow-y: hidden;
  text-overflow: ellipsis;
  display: block;
}
.news--link {
  width: 100%;
  word-break: break-all;
  white-space: prewrap;
  display: block;
}
.news--term {
  width: 100%;
  word-break: break-all;
  white-space: prewrap;
  display: block;
  font-size: 0.9rem;
}
.news a {
  color: #3498db;
  text-decoration: none;
}
.news a:hover {
  color: #fff;
  background-color: #3498db;
}
</style>
