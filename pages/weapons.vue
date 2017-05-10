<template>
<section class="container">
  <h2>武器</h2>
  <div class="row">
  <ul>
    <li class="weapon" v-for="key in weaponKeys">
      <weapon-list-item :weapon="weaponByKey(key)"></weapon-list-item>
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
    }
  },
  mounted() {
    const that = this
    this.$nextTick(() => {
      this.loading = true
      axios.get(WEAPONMAPPINGS_URL)
        .then((res) => {
          that.$store.commit('WEAPONMAPPINGS_RETRIEVED', res.data)
        })
      axios.get(WEAPONS_URL)
        .then((res) => {
          that.$store.commit('WEAPONS_RETRIEVED', res.data)
          that.loading = false
        })
    })
  },
  computed: {
    weapons() {
      return this.$store.state.weapons
    },
    weaponMappings() {
      return this.$store.state.weaponMappings
    },
    weaponKeys() {
      return _.chain(this.weaponMappings)
        .groupBy('weapon_name')
        .keys()
        .value()
    },
  },
  methods: {
    weaponsByKey(key) {
      return _.filter(this.weaponMappings, {weapon_name: key})
    },
    weaponByKey(key) {
      return _.find(this.weapons, {name: key})
    },
  },
  components: {
    WeaponListItem,
  },
}

</script>

<style scoped>
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
