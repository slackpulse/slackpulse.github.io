<template>
<section class="container">
  <h2 v-translate>PORTABILITY CALCULATOR</h2>
  <div v-bind:class="affixClass" v-bind:style="affix">
		<div class="row">
			<div class="col2 center">
				<span class="label" v-translate>DISPLAY PORT.</span>
				<label class="statistics" v-if="isValid">{{sum | commify}}</label>
				<label v-else>{{t('Error')}}</label>
			</div>
			<div class="col2 center">
				<span class="label" v-translate>CALCULATED PORT.</span>
				<label class="statistics" v-if="isValid">{{portable | commify}}</label>
				<label v-else>{{t('Error')}}</label>
			</div>
		</div>
		<div class="row">
			<div class="col2 center">
				<span class="label" v-translate>SKATER</span>
				<label class="statistics" v-if="isValid">{{ t(skating ? 'YES' : 'NO') }}</label>
				<label v-else>{{t('Error')}}</label>
			</div>
			<div class="col2 center">
				<span class="label" v-translate>TIER</span>
				<label class="statistics" v-if="isValid">{{tier}}</label>
				<label v-else>{{t('Error')}}</label>
			</div>
		</div>
  </div>
  <div class="row form-start">
    <label class="label col2" for="portability-headgear" v-translate>HEADGEAR</label>
		<div class="slider-wrapper">
			<vue-slider v-bind="sliderOption1" v-model="headValue"></vue-slider>
		</div>
  </div>
  <div class="row">
    <label class="label col2" for="portability-torso" v-translate>TORSO</label>
		<div class="slider-wrapper">
			<vue-slider v-bind="sliderOption1" v-model="torsoValue"></vue-slider>
		</div>
  </div>
  <div class="row">
    <label class="label col2" for="portability-pants " v-translate>LEG</label>
		<div class="slider-wrapper">
			<vue-slider v-bind="sliderOption1" v-model="pantsValue"></vue-slider>
		</div>
  </div>
  <div class="row">
    <label class="label col2" for="portability-weapon" v-translate>WEAPON</label>
		<div class="slider-wrapper">
			<vue-slider v-bind="sliderOption2" v-model="weaponValue"></vue-slider>
		</div>
  </div>
  <div class="row">
    <label class="label col2" for="portability-addition" v-translate>+RATE(%)</label>
		<div class="slider-wrapper">
			<vue-slider v-bind="sliderOption3" v-model="rateValue"></vue-slider>
		</div>
  </div>
</section>
</template>

<script>
import _ from 'lodash'
let VueSlider = null
if (process.BROWSER_BUILD) {
  VueSlider = require('vue-slider-component')
}

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g

function getUniqueStr(myStrong) {
  let strong = 1000
  if (myStrong) {
    strong = myStrong
  }
  return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)
}

var ticking = false

export default {
  locales: {
    'ja': {
      'PORTABILITY CALCULATOR': 'アフパルポータブル計算機',
      'HEAD': '頭',
      'HEADGEAR': 'ヘッドギア',
      'TORSO': '胴体',
      'LEG': '脚',
      'WEAPON': '武器',
      '+RATE(%)': '加算率(%)',
      'DISPLAY PORT.': '表示ポータブル',
      'CALCULATED PORT.': '算出ポータブル',
      'DISPLAYED': '表示',
      'CALCULATED': '算出',
      'SKATER': 'スケート可能',
      'TIER': 'ギヤ',
      'YES': 'はい',
      'NO': 'いいえ',
      'CLEAR': 'クリア',
      'TWEET': 'ツイートする',
      'SAVE': '保存',
      'Error': 'エラー',
      'Skater': 'スケートできる!',
      'Not skater': 'スケートできません...',
    },
  },
  data() {
    return {
      headValue: 940,
      torsoValue: 880,
      pantsValue: 900,
      weaponValue: 580,
      rateValue: 0,
      scrollY: 0,
    }
  },
  mounted() {
    const that = this
    window.addEventListener('scroll', (e) => {
      that.scrollY = window.scrollY
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false
        })
      }
      ticking = true
    })
    this.$nextTick(() => {
      this.loadHistories()
    })
  },
  beforeRouteEnter(route, redirect, next) {
    next(vm => {
      const head = _.get(route, 'query.head', 0)
      if (_.has(route, 'query.head')) {
        vm.headPortable = parseInt(head, 10)
      }
      const torso = _.get(route, 'query.torso', 0)
      if (_.has(route, 'query.torso')) {
        vm.torsoPortable = parseInt(torso, 10)
      }
      const pants = _.get(route, 'query.pants', 0)
      if (_.has(route, 'query.pants')) {
        vm.pantsPortable = parseInt(pants, 10)
      }
      const weapon = _.get(route, 'query.weapon', 0)
      if (_.has(route, 'query.weapon')) {
        vm.weaponPortable = parseInt(weapon, 10)
      }
      const additionalRate = _.get(route, 'query.rate', 0)
      if (_.has(route, 'query.rate')) {
        vm.additionalRate = parseInt(additionalRate, 10)
      }
    })
  },
  watch: {
    '$route': (to, from) => {
      if (to.name === 'portable') {
        this.$root.title = 'Afterpulse Portability Calculator'
      }
    },
    headValue(value) {
      this.headPortable = value
    },
    torsoValue(value) {
      this.torsoPortable = value
    },
    pantsValue(value) {
      this.pantsPortable = value
    },
    weaponValue(value) {
      this.weaponPortable = value
    },
    rateValue(value) {
      this.additionalRate = value
    },
  },
  computed: {
    affixClass() {
      if (40 < this.scrollY) {
        return 'affix'
      }
      return ''
    },
    affix() {
      if (40 < this.scrollY) {
        return {
          transform: ['translateY(', this.scrollY, 'px)'].join(''),
        }
      }
      return {}
    },
    sliderOption1() {
      return {
        width: '100%',
        height: 8,
        dotSize: 20,
        min: 600,
        max: 1000,
        disabled: false,
        show: true,
        tooltip: 'always',
        tooltipDir: 'top',
        formatter: '{value}',
        piecewise: false,
        style: {
          'marginBottom': '30px',
        },
        bgStyle: {
          'backgroundColor': '#fff',
          'boxShadow': 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)',
        },
        sliderStyle: [
          {
            'backgroundColor': '#f05b72',
          },
          {
            'backgroundColor': '#3498db',
          },
        ],
        tooltipStyle: [
          {
            'backgroundColor': '#f05b72',
            'borderColor': '#f05b72',
          },
          {
            'backgroundColor': '#3498db',
            'borderColor': '#3498db',
          }
        ],
        processStyle: {
          'backgroundImage': '-webkit-linear-gradient(left, #f05b72, #3498db)',
        },
      }
    },
    sliderOption2() {
      return {
        width: '100%',
        height: 8,
        dotSize: 20,
        min: 300,
        max: 700,
        disabled: false,
        show: true,
        tooltip: 'always',
        tooltipDir: 'top',
        formatter: '{value}',
        piecewise: false,
        style: {
          'marginBottom': '30px',
        },
        bgStyle: {
          'backgroundColor': '#fff',
          'boxShadow': 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)',
        },
        sliderStyle: [
          {
            'backgroundColor': '#f05b72',
          },
          {
            'backgroundColor': '#3498db',
          },
        ],
        tooltipStyle: [
          {
            'backgroundColor': '#f05b72',
            'borderColor': '#f05b72',
          },
          {
            'backgroundColor': '#3498db',
            'borderColor': '#3498db',
          }
        ],
        processStyle: {
          'backgroundImage': '-webkit-linear-gradient(left, #f05b72, #3498db)',
        },
      }
    },
    sliderOption3() {
      return {
        width: '100%',
        height: 8,
        dotSize: 20,
        min: 0,
        max: 30,
        disabled: false,
        show: true,
        tooltip: 'always',
        tooltipDir: 'top',
        formatter: '{value}',
        piecewise: false,
        style: {
          'marginBottom': '30px',
        },
        bgStyle: {
          'backgroundColor': '#fff',
          'boxShadow': 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)',
        },
        sliderStyle: [
          {
            'backgroundColor': '#f05b72',
          },
          {
            'backgroundColor': '#3498db',
          },
        ],
        tooltipStyle: [
          {
            'backgroundColor': '#f05b72',
            'borderColor': '#f05b72',
          },
          {
            'backgroundColor': '#3498db',
            'borderColor': '#3498db',
          }
        ],
        processStyle: {
          'backgroundImage': '-webkit-linear-gradient(left, #f05b72, #3498db)',
        },
      }
    },
    headPortable: {
      get() {
        return this.$store.state.portability.headPortable
      },
      set(value) {
        this.$store.dispatch('setPortability', {
          key: 'headPortable',
          value: value,
        })
      },
    },
    torsoPortable: {
      get() {
        return this.$store.state.portability.torsoPortable
      },
      set(value) {
        this.$store.dispatch('setPortability', {
          key: 'torsoPortable',
          value: value
        })
      },
    },
    pantsPortable: {
      get() {
        return this.$store.state.portability.pantsPortable
      },
      set(value) {
        this.$store.dispatch('setPortability', {
          key: 'pantsPortable',
          value: value
        })
      },
    },
    weaponPortable: {
      get() {
        return this.$store.state.portability.weaponPortable
      },
      set(value) {
        this.$store.dispatch('setPortability', {
          key: 'weaponPortable',
          value: value
        })
      },
    },
    additionalRate: {
      get() {
        return this.$store.state.portability.additionalRate
      },
      set(value) {
        this.$store.dispatch('setPortability', {
          key: 'additionalRate',
          value: value
        })
      },
    },
    histories() {
      return this.$store.state.portabilityHistories
    },
    sum() {
      return this.headPortable + this.torsoPortable + this.pantsPortable + this.weaponPortable
    },
    isValid() {
      if (this.additionalRate < 0) {
        return false
      }
      if (this.headPortable < 0 || 1000 < this.headPortable) {
        return false
      }
      if (this.torsoPortable < 0 || 1000 < this.torsoPortable) {
        return false
      }
      if (this.pantsPortable < 0 || 1000 < this.pantsPortable) {
        return false
      }
      if (this.weaponPortable < 0 || 1000 < this.weaponPortable) {
        return false
      }
      return true
    },
    portable() {
      if (!this.isValid) {
        return this.t('Error')
      }
      let result = this.sum
      // 固定値???
      let addition = 0
      if (this.additionalRate === 2) {
        addition = 24
      } else if (this.additionalRate === 5) {
        addition = 60
      } else if (this.additionalRate === 7) {
        addition = 86
      } else if (this.additionalRate === 10) {
        addition = 119
      } else if (this.additionalRate === 12) {
        addition = 86 + 61
      } else if (this.additionalRate === 17) {
        addition = 86 + 119
      } else if (this.additionalRate === 30) {
        addition = 357
      } else {
        addition = 1190 * (this.additionalRate / 100)
      }
      result += addition

      return Math.floor(result)
    },
    skating() {
      return 3311 <= this.portable
    },
    tier() {
      if (this.portable < 3311) {
        return 0
      } else if (this.portable < 3361) {
        return 1
      } else if (this.portable < 3411) {
        return 2
      } else if (this.portable < 3461) {
        return 3
      } else if (this.portable < 3511) {
        return 4
      } else if (this.portable < 3561) {
        return 5
      }
      return 6
    },
    shareURL() {
      const compiled = _.template([
        window.location.protocol + '//' + window.location.host + '/#!/',
        '?head={{ head }}',
        '&torso={{ torso }}',
        '&pants={{ pants }}',
        '&weapon={{ weapon }}',
        '&rate={{ rate }}',
      ].join(''))

      let text = ''
      if (this.skating) {
        text += 'スケートできる！！'
      } else {
        text += 'スケートできません...'
      }

      return [
        'https://twitter.com/intent/tweet',
        '?url=' + encodeURIComponent(compiled({
          head: this.headPortable,
          torso: this.torsoPortable,
          pants: this.pantsPortable,
          weapon: this.weaponPortable,
          rate: this.additionalRate,
        })),
        '&hashtags=アフパルポータブル計算機',
        '&text=' + text,
      ].join('')
    },
  },
  methods: {
    loadHistories() {
      this.$store.dispatch('loadPortabilityHistories')
    },
    clear() {
      this.$store.dispatch('clearPortability')
    },
    save() {
      if (!this.isValid) {
        return
      }
      this.$store.dispatch('savePortability', {
        uuid: getUniqueStr(),
        headPortable: this.headPortable,
        torsoPortable: this.torsoPortable,
        pantsPortable: this.pantsPortable,
        weaponPortable: this.weaponPortable,
        additionalRate: this.additionalRate,
        sum: this.sum,
        portable: this.portable,
        skating: this.skating,
      })
    },
    remove(uuid) {
      this.$store.dispatch('removePortability', uuid)
    },
  },
  components: {
    VueSlider,
  },
}
</script>

<style scoped>
.affix {
	position: absolute;
	top: 0;
	color: #ffffff;
	background-color: rgba(0, 0, 0, 0.8);
	width: 100vw;
	padding: 1rem 0 1rem;
	transition: transform 100ms linear;
	z-index: 9999;
}
</style>
