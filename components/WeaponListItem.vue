<template>
<div class="weapon" v-if="weapon">
  <div class="name">{{ weapon.name }}</div>
  <div class="fonetic">{{ weapon.fonetic }}</div>
  <div>
    <div class="class_name">{{ weapon['class_name'] }}</div>
    <div class="slot">{{ weapon.slot | slot }}</div>
  </div>
  <div class="description">{{ weapon.description }}</div>
  <div class="series" v-for="mapping in mappingsById(weapon.ID)">{{ mapping.series_name || 'ノーマル' }}</div>
</div>
</template>

<script>
import _ from 'lodash'

export default {
  props: ['weapon'],
  computed: {
    weaponMappings() {
      return this.$store.state.weaponMappings
    },
  },
  methods: {
    mappingsById(id) {
      return _.chain(this.weaponMappings)
        .filter((mapping) => {
          if (mapping.series_id === 1) {
            return false
          }
          return id === mapping.weapon_id
        })
        .value()
    },
  },
  filters: {
    slot(value) {
      if (!value) {
        return ''
      }
      return value === 'primary' ? 'メイン' : 'サブ'
    },
  },
}

</script>

<style scoped>
.weapon {
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
  font-size: 0.8rem;
  display: inline-block;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  background-color: #000;
  color: #fff;
  padding: 0.2rem 0.5rem;
  line-height: 1.2rem;
}
</style>
