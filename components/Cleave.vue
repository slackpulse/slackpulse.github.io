<template>
<input :type="type" v-bind:value="value" v-on:keyup="onChangeValue" />
</template>

<script>
import _ from 'lodash'
import Cleave from 'cleave.js'

export default {
  props: [
    'state-key',
    'setter',
    'type',
    'options',
  ],
  data() {
    return {
      cleave: null,
    }
  },
  mounted() {
    this.cleave = new Cleave(this.$el, this.options)
  },
  beforeDestroy() {
    this.cleave.destroy()
    this.cleave = null
  },
  computed: {
    value: {
      get() {
        return _.get(this.$store.state, this.stateKey, null)
      },
      set(value) {
        this.$store.dispatch(this.setter, value)
      },
    },
  },
  methods: {
    onChangeValue(event) {
      this.value = event.target.value
    },
  },
}
</script>
