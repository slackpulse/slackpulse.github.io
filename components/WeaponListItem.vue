<template>
<div class="weapon" v-if="weapon">
  <nuxt-link :to="{ name: 'weapons-id', params: { id: weapon.ID }}" tag="div" class="name">
    {{ weapon.name }}
  </nuxt-link>
  <div v-on:click="onClickTag" class="fonetic">{{ weapon.fonetic }}</div>
  <div>
    <div v-on:click="onClickTag" class="class_name">{{ weapon['class_name'] }}</div>
    <div v-on:click="onClickTag" class="slot">{{ weapon.slot | slot }}</div>
  </div>
  <div class="description">{{ weapon.description }}</div>
  <div v-on:click="onClickTag" v-bind:class="className(s.series_id)" v-for="s in weapon.series">{{ s.series_name || 'ノーマル' }}</div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  props: ['weaponId'],
  computed: {
    weapon() {
      return _.find(this.$store.state.weapons, {ID: this.weaponId})
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
  methods: {
    className(value) {
      return 'series series-' + value
    },
    onClickTag(event) {
      this.$store.state.weaponQuery = event.target.innerText
      event.stopPropergation()
      return false
    }
  },
}

</script>

<style scoped>
.weapon {
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);
  color: #fff;
  padding: 1rem;
  width: 100%;
  border-radius: 0.2rem;
  border: 1px solid #fff;
}
.name {
  font-weight: bold;
  display: inline-block;
  color: #fff;
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
</style>
