<template>
<section class="container">
  <div class="row">
  <div class="form">
		<div class="search">
			<input type="search" v-on:input="changeQuery" v-bind:value="weaponQuery">
			<icon name="search"></icon>
		</div>
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
import Icon from 'vue-awesome/components/Icon'
require('vue-awesome/icons')

const WEAPONS_URL = 'https://slackpulse.sirohako.com/weapons.json'
const WEAPONMAPPINGS_URL = 'https://slackpulse.sirohako.com/mapping.json'

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
      if (this.$store.state.weapons.length) {
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
    })
  },
  computed: {
    weaponQuery: {
      set(value) {
        this.$store.commit('CHANGE_WEAPON_QUERY', value)
      },
      get() {
        return this.$store.state.weaponQuery
      }
    },
    weapons() {
      return this.$store.state.weapons
    },
    filteredWeapons() {
      const that = this
      if (!this.weaponQuery) {
        return this.weapons
      }
      return _.filter(this.weapons, (weapon) => {
        return new RegExp(that.weaponQuery, 'ig').test(weapon.summary)
      })
    },
  },
  methods: {
    changeQuery(event) {
      this.weaponQuery = (event.target || event.sourceElement).value
    }
  },
  components: {
    WeaponListItem,
    Icon,
  },
}

</script>

<style scoped>
.container {
	background: #000;
}
.form {
	position: relative;
  margin: 0;
  height: 4rem;
  width: 100%;
  padding: 2rem;
}
.search {
  height: 2rem;
	position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 90%;
  max-width: 300px;
  margin: auto;
  z-index: 1;
}
.fa-icon {
  z-index: 3;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0.5rem;
  margin-top: auto;
  margin-bottom: auto;
  width: 1rem;
  height: 1rem;
  color: rgba(0, 0, 0, 0.4);
}
input[type="search"] {
  border-radius: 1rem;

  z-index: 2;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
  height: 2rem;
  box-sizing: border-box;
  line-height: 2rem;
  font-size: 1rem;
  padding: 0.5rem 0.8rem 0.5rem 2rem;
}
ul {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0;
}
.weapon {
  margin-bottom: 1rem;
  display: inline-block;
  list-style: none;
  box-sizing: border-box;
  margin: 0 auto 1rem;
  position: relative;
  left: 0;
  right: 0;
  width: 90%;
}
a {
  color: inherit;
  text-decoration: none;
}
</style>
