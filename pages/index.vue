<template>
  <section class="container">
    <h1 class="title">
      アフパル計算機
    </h1>
    <div class="links">
      <a href="https://github.com/slackpulse/slackpulse.github.io" target="_blank" class="button--grey">Github</a>
    </div>

    <h3>イベント</h3>
    <div class="event" v-show="events.length">
      <a class="event--item" v-for="link in events" v-bind:href="link.url">
        <img class="event--icon" v-bind:src="link | eventicon" />
        <div class="event--content">
          <span class="event--title">{{link.title | trunc}}</span>
          <span class="event--term event--term--main">{{link.startAt | dateformat}} - {{link.endAt | dateformat}}</span>
          <span class="event--term event--term--pst">{{link.startAt | asPDT}} - {{link.endAt | asPDT}}</span>
          <span class="event--infuture" v-if="inFuture(link)">{{inFuture(link)}}</span>
          <span class="event--fromnow" v-if="fromNow(link)">{{fromNow(link)}}</span>
          <span class="event--link">{{link.url | asDomain }}</span>
        </div>
      </a>
    </div>

    <h3>新着ニュース</h3>
    <div class="news" v-show="links.length">
      <a class="news--item" v-for="link in links" v-bind:href="link.url">
				<div class="news--image" v-bind:style="{backgroundImage: 'url(' + newsicon(link) + ')'}"></div>
        <div class="news--content">
          <span class="news--title">{{link.title | trunc}}</span>
          <span class="news--link">{{link.url | asDomain }}</span>
        </div>
      </a>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import moment from 'moment-timezone'

moment.locale('ja')

const TIMELINE_FETCH_URL = 'https://slackpulse.sirohako.com/events.json'
const FETCH_URL = 'https://slackpulse.sirohako.com/news.json'

export default {
  data() {
    return {
      loading: false,
    }
  },
  mounted() {
    const that = this
    this.$nextTick(() => {
      this.loading = true
      axios.get(TIMELINE_FETCH_URL)
        .then((res) => {
          const events = _.chain(res.data)
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
              item.url = item.url || '#'
              item.startAt = moment(item.startAt, 'MM/DD HH:mm')
              item.endAt = moment(item.endAt, 'MM/DD HH:mm')
              return item
            })
            .reject((item) => {
              return item.endAt.toDate() < Date.now()
            })
            .value()
          that.$store.commit('EVENT_RETRIEVED', {
            data: events
          })
        })
      axios.get(FETCH_URL)
        .then((res) => {
          that.loading = false
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
          that.$store.commit('LINK_RETRIEVED', {
            data: sorted
          })
        })
    })
  },
  computed: {
    links() {
      return this.$store.state.links
    },
    events() {
      return this.$store.state.events
    }
  },
  methods: {
    inFuture(link) {
      if (link.startAt.toDate().getTime() - Date.now() <= 0) {
        return null
      }
      const duration = moment.duration(link.startAt.diff(moment()))
      const days = duration.days()
      const hours = duration.hours()
      const minutes = duration.get('minutes')

      return ['イベント開始まであと', [days, '日', hours, '時間', minutes, '分'].join('')].join('')
    },
    fromNow(link) {
      if (link.startAt.toDate().getTime() - Date.now() > 0) {
        return null
      }
      const duration = moment.duration(link.endAt.diff(moment()))
      const days = duration.days()
      const hours = duration.hours()
      const minutes = duration.minutes()

      return ['イベント終了まであと', [days, '日', hours, '時間', minutes, '分'].join('')].join('')
    },
    newsicon(link) {
      if (!link || !link.title) {
        return null
      }

      if (link.image && link.image !== 'undefined') {
        return link.image
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
  },
  filters: {
    eventicon(link) {
      if (link.startAt.toDate().getTime() - Date.now() <= 0) {
        return require('~static/images/hot.png')
      }
      return require('~static/images/soon.png')
    },
    asPDT(m) {
      const cloned = m.clone().tz('PST8PDT')
      cloned.locale('en')
      return cloned.format('M/D A h:mm z')
    },
    dateformat(m) {
      return m.format('M月D日 (ddd) Ah:mm')
    },
    asDomain(url) {
      if (url.length < 3) {
        return ''
      }
      return url.replace(/https?:[/][/]/ig, '').replace(/[/].*/ig, '')
    },
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

.event {
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  margin-bottom: 30px;
  z-index: 1;
}
.event--item{
  width: 100vw;
  margin: auto;
  padding: 1rem 5vw 1rem;
  box-sizing: border-box;
  z-index: 1;

  display: flex;
  justify-content: left;
  align-items: flex-start;

}
.event--icon {
  width: 7.5vw;
  height: 7.5vw;
  display: inline-block;
  box-sizing: border-box;
  margin-right: 2.5vw;
}
.event--image {
  width: 25vw;
  height: 25vw;
  display: inline-block;
  box-sizing: border-box;
  margin-right: 2.5vw;

	background-size: contain;
	background-repeat: no-repeat;
	background-position: center center;
}
.event--content {
  width: 75vw;
  position: relative;
  display: block;
}
.event--title {
  width: 100%;
  font-weight: bold;
  max-height: 80px;
  overflow-y: hidden;
  text-overflow: ellipsis;
  display: block;
}
.event--link {
  width: 100%;
  word-break: break-all;
  white-space: prewrap;
  display: block;
  font-size: 0.8rem;
  color: #3498db;
}
.event--term {
  width: 100%;
  word-break: break-all;
  white-space: prewrap;
  display: block;
  font-size: 0.8rem;
}
.event--term--main {
  font-weight: bold;
}
.event--term--pst {
  font-style: italic;
  color: #999;
}
.event--infuture {
  width: 100%;
  color: #0000ee;
  font-weight: bold;
  font-size: 0.9rem;
  display: block;
}

.event--fromnow {
  width: 100%;
  color: #ee0000;
  font-weight: bold;
  font-size: 0.9rem;
  display: block;
}
.event a {
  color: #35495e;
  text-decoration: none;
}
.event a:hover {
  color: #fff;
  background-color: #3498db;
}

.news {
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  margin-bottom: 30px;
  z-index: 1;
}
.news--item {
  width: 100vw;
  margin: auto;
  padding: 1rem 5vw 1rem;
  box-sizing: border-box;
  z-index: 1;

  display: flex;
  justify-content: left;
  align-items: flex-start;
}
.news--icon {
  width: 7.5vw;
  height: 7.5vw;
  display: inline-block;
  box-sizing: border-box;
  margin-right: 2.5vw;
}
.news--image {
  width: 20vw;
	padding-bottom: 15%;
  display: inline-block;
  box-sizing: border-box;
  margin-right: 2.5vw;

	background-size: contain;
	background-repeat: no-repeat;
	background-position: top center;
}
.news--content {
  width: 60vw;
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
  font-size: 0.8rem;
  color: #3498db;
}
.news--term {
  width: 100%;
  word-break: break-all;
  white-space: prewrap;
  display: block;
  font-size: 0.8rem;
}
.news--term--main {
  font-weight: bold;
}
.news--term--pst {
  font-style: italic;
  color: #999;
}
.news--infuture {
  width: 100%;
  color: #0000ee;
  font-weight: bold;
  font-size: 0.9rem;
  display: block;
}
.news--fromnow {
  width: 100%;
  color: #ee0000;
  font-weight: bold;
  font-size: 0.9rem;
  display: block;
}
.news a {
  color: #35495e;
  text-decoration: none;
}
.news a:hover {
  color: #fff;
  background-color: #3498db;
}
</style>
