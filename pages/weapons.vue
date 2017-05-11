<template>
<section class="container">
  <div class="row">
  <div class="search">
		<input type="search" v-model="query">
  </div>
  <ul>
    <li class="weapon" v-for="weapon in filteredWeapons">
      <weapon-list-item :weapon-id="weapon.ID"></weapon-list-item>
    </li>
  </ul>
  </div>
</section>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import WeaponListItem from '~components/WeaponListItem'

const WEAPONS_URL = 'https://slackpulse.sirohako.com/weapons.json'
const WEAPONMAPPINGS_URL = 'https://slackpulse.sirohako.com/mapping.json'

export default {
  data() {
    return {
      loading: false,
      query: '',
    }
  },
  mounted() {
    const that = this
    this.$nextTick(() => {
      this.loading = true
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
    })
  },
  computed: {
    weapons() {
      return this.$store.state.weapons
    },
    filteredWeapons() {
      const that = this
      if (!this.query) {
        return this.weapons
      }
      return _.filter(this.weapons, (weapon) => {
        return new RegExp(that.query, 'ig').test(weapon.summary)
      })
    },
  },
  components: {
    WeaponListItem,
  },
}

</script>

<style scoped>
.search {
  position: relative;
  width: 100%;
	height: 4rem;
}
input[type="search"] {
  position: absolute;
  top: 0;
	bottom: 0;
	left: 0;
  right: 0;
	width: 90;
	max-width: 300px;
	margin: auto;
	box-sizing: border-box;
	height: 2rem;
  line-height: 2rem;
  font-size: 1rem;
  padding: 0.2rem 0.8rem;
}
ul {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.weapon {
  margin-bottom: 1rem;
  display: inline-block;
  width: 100%;
  list-style: none;
  box-sizing: border-box;
}
</style>
