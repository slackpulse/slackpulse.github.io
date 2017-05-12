<template>
<section class="container">
  <nuxt-link to="/weapons/" tag="div" class="back">戻る</nuxt-link>
  <div class="weapon" v-if="weapon">
    <div class="name">{{ weapon.name }}</div>
    <div class="fonetic">{{ weapon.fonetic }}</div>
    <div>
      <div class="class_name">{{ weapon['class_name'] }}</div>
      <div class="slot">{{ weapon.slot | slot }}</div>
    </div>
    <div class="description">{{ weapon.description }}</div>
    <div v-bind:class="className(s.series_id)" v-for="s in weapon.series">{{ s.series_name || 'ノーマル' }}</div>
    <div><a class="hashtag" v-bind:href="'https://twitter.com/search?f=images&q=' + encodeURIComponent(hashtag)">Twitterで {{ hashtag }} を検索</a></div>
  </div>
</section>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import Icon from 'vue-awesome/components/Icon'
require('vue-awesome/icons')

const WEAPONS_URL = 'https://slackpulse.sirohako.com/weapons.json'
const WEAPONMAPPINGS_URL = 'https://slackpulse.sirohako.com/mapping.json'

export default {
  mounted() {
    const that = this
    this.$nextTick(() => {
      this.loading = true
      var weapon = null
      if (this.$store.state.weapons.length) {
        weapon = _.find(this.$store.state.weapons, { ID: parseInt(this.$route.params.id, 10) })
        this.$store.commit('CHANGE_WEAPON', weapon)
        return
      }
      axios.get(WEAPONS_URL)
        .then((res) => {
          that.$store.commit('WEAPONS_RETRIEVED', res.data)
          that.loading = false
          return axios.get(WEAPONMAPPINGS_URL)
        })
        .then((res) => {
          return that.$store.commit('WEAPONMAPPINGS_RETRIEVED', res.data)
        })
        .then((res) => {
          return that.$store.commit('JOIN_WEAPON')
        })
        .then(() => {
          weapon = _.find(that.$store.state.weapons, { ID: parseInt(that.$route.params.id, 10) })
          console.log(that.$route.params.id, that.$store.state.weapons, weapon)
          that.$store.commit('CHANGE_WEAPON', weapon)
        })
    })
  },
  asyncData() {
    return {
      id: null
    }
  },
  watch: {
    '$route'(to, from) {
      const weapon = _.find(this.$store.state.weapons, to.params.id)
      this.$store.commit('CHANGE_WEAPON', weapon)
    }
  },
  computed: {
    weapon() {
      return this.$store.state.weapon
    },
    hashtag() {
      return ['#アフパル', this.replaceWS(this.weapon.name)].join('')
    }
  },
  filters: {
    slot(value) {
      if (!value) {
        return ''
      }
      return value === 'primary' ? 'メイン' : 'サブ'
    },
  },
  methods: {
    className(value) {
      return 'series series-' + value
    },
    replaceWS(value) {
      return value.replace(/[\s-]/g, '')
    },
  },
  components: {
    Icon,
  },
}
</script>

<style scoped>
.container {
	background: #000;
}
.back {
  margin: 1rem 1.2rem;
  text-decoration: none;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 0.2rem;
  width: 4rem;
  text-align: center;
}
.weapon {
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);
  color: #fff;
  padding: 1rem;
  width: 90%;
  border-radius: 0.2rem;
  border: 1px solid #fff;
  margin: 1rem auto;
}
.name {
  font-weight: bold;
  display: inline-block;
}
.class_name {
  font-size: 0.8rem;
  display: inline-block;
  margin-bottom: 0.2rem;
  padding: 0.2rem 0.2rem;
}
.slot {
  font-size: 0.8rem;
  display: inline-block;
  margin-bottom: 0.2rem;
  padding: 0.2rem 0.2rem;
}
.fonetic {
  font-size: 0.8rem;
  display: inline-block;
  padding: 0.2rem 0.5rem;
}
.description {
  padding: 0.5rem 1rem 0.5rem 0;
  box-sizing: border-box;
}
.series {
  font-size: 0.9rem;
  font-weight: bold;
  display: inline-block;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  background-color: #000;
  color: #fff;
  padding: 0.2rem 0.5rem;
  line-height: 1.2rem;
  box-sizing: border-box;
}
.series-1 {
}
.series-2 {
  background-color: #ee0000;
  color: #fff;
}
.series-3 {
  background-color: #f17d37;
  color: #000;
}
.series-4 {
  background-color: #364532;
  color: #fff;
}
.series-5 {
  background-color: #87242d;
  color: gold;
}
.series-6 {
  background-color: #62b048;
  color: #fff;
}
.series-7 {
  background-color: #ddd;
  color: #000;
}
.series-8 {
  border: 1px solid #ff0000;
  background-color: #fff;
  color: #ff0000;
}
.series-9 {
  background-color: #ef6616;
  color: #fff;
}
.series-10 {
  background-color: #253765;
  color: #fff;
}
.series-11 {
  background-color: #257022;
  color: gold;
}
.series-12 {
  background-color: #ecd837;
  color: #000;
}
.series-13 {
  background-color: #c73e45;
  color: #fff;
}
.series-14 {
  background-color: #9f657e;
  color: #fff;
}
.hashtag {
  text-decoration: none;
  color: #fff;
}
</style>
