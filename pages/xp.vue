<template>
  <section class="container">
    <div>
      <h2 v-translate>XP CALCULATOR</h2>

      <div class="row">
        <vue-slider v-bind="sliderOption" v-model="levelValues"></vue-slider>
      </div>

      <div class="row">
        <select class="browser-default" id="mix-rank" name="rate" type="number" v-model="mixRank" required>
          <option value="1">★</option>
          <option value="2">★★</option>
          <option value="3">★★★</option>
        </select>
        <label class="" for="mix-rank" v-translate>MAX WEAPON GRADE</label>
      </div>
      <div class="row center-align">
        <label class="label" v-translate>COST</label>
        <label class="statistics">{{moneyResult | commify}}</label>
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

const DRAW_COST = 4000
const XP_PER_WEAPON_1 = 697.5
const XP_PER_WEAPON_2 = 1593.32
const XP_PER_WEAPON_3 = 3489.34
const FUSION_COST_PER_WEAPON_1 = 500
const FUSION_COST_PER_WEAPON_2 = 800
const FUSION_COST_PER_WEAPON_3 = 1300
const PROBABILITY_DRAW_RANK_1 = 82.25
const PROBABILITY_DRAW_RANK_2 = 12.5
const PROBABILITY_DRAW_RANK_3 = 5.25

const REQUIRED_XP = [
  0,
  379,
  834,
  1385,
  2057,
  2884,
  3910,
  5192,
  6808,
  8861,
  11489,
  14625,
  18388,
  22929,
  28439,
  35162,
  43028,
  52270,
  63176,
  76100,
  91480,
  109259,
  129883,
  153889,
  181928,
  214790,
  252472,
  295807,
  345787,
  403597,
  470657,
  547105,
  634474,
  734575,
  849548,
  981931,
  1132186,
  1303326,
  1498169,
  1719315,
]

const p1 = (PROBABILITY_DRAW_RANK_1 / 100)
const p2 = (PROBABILITY_DRAW_RANK_2 / 100)
const p3 = (PROBABILITY_DRAW_RANK_3 / 100)

const expXp1 = p1 * XP_PER_WEAPON_1
const expXp2 = p2 * XP_PER_WEAPON_2
const expXp3 = p3 * XP_PER_WEAPON_3

export default {
  locales: {
    'ja': {
      'XP CALCULATOR': 'アフパルXP計算機',
      'CURRENT WEAPON LEVEL': '現在の武器レベル',
      'MAX WEAPON GRADE': 'までの素材を使用',
      'CASH > LEVEL': '所持金 ⇒  到達レベル',
      'CASH': '所持金',
      'LEVEL': 'レベル',
      'LEVEL > COST': '目標レベル ⇒  費用',
      'TARGET LEVEL': '目標レベル',
      'COST': '費用',
    },
  },
  data() {
    return {
      levelValues: [1, 40],
    }
  },
  beforeRouteEnter(route, redirect, next) {
    next()
  },
  watch: {
    '$route': (to, from) => {
      if (to.name === 'xp') {
        this.$root.title = 'Afterpulse XP Calculator'
      }
    },
    levelValues(value) {
      this.currentLevel = value[0]
      this.targetLevel = value[1]
    },
  },
  computed: {
    sliderOption() {
      return {
        width: '100%',
        height: 8,
        dotSize: 20,
        min: 1,
        max: 40,
        disabled: false,
        show: true,
        tooltip: 'always',
        tooltipDir: [
          'top',
          'top'
        ],
        formatter: 'Lv{value}',
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
    money: {
      get() {
        return this.$store.state.xp.money
      },
      set(value) {
        this.$store.dispatch('setXPParams', {
          key: 'money',
          value: value,
        })
      },
    },
    currentLevel: {
      get() {
        return this.$store.state.xp.currentLevel
      },
      set(value) {
        this.$store.dispatch('setXPParams', {
          key: 'currentLevel',
          value: value,
        })
      },
    },
    targetLevel: {
      get() {
        return this.$store.state.xp.targetLevel
      },
      set(value) {
        this.$store.dispatch('setXPParams', {
          key: 'targetLevel',
          value: value,
        })
      },
    },
    mixRank: {
      get() {
        return this.$store.state.xp.mixRank
      },
      set(value) {
        this.$store.dispatch('setXPParams', {
          key: 'mixRank',
          value: value,
        })
      },
    },
    expectedXp() {
      let result = 0
      if (this.mixRank === 1) {
        result = expXp1 / (DRAW_COST + FUSION_COST_PER_WEAPON_1)
      }
      if (this.mixRank === 2) {
        result = (expXp1 + expXp2) / (DRAW_COST + p1 * FUSION_COST_PER_WEAPON_1 + p2 * FUSION_COST_PER_WEAPON_2)
      }
      if (this.mixRank === 3) {
        result = (expXp1 + expXp2 + expXp3) / (DRAW_COST + p1 * FUSION_COST_PER_WEAPON_1 + p2 * FUSION_COST_PER_WEAPON_2 + p3 * FUSION_COST_PER_WEAPON_3)
      }
      return (result * this.money) + 1
    },
    expectedMoney() {
      let result = 0
      if (this.mixRank === 1) {
        result = (DRAW_COST + FUSION_COST_PER_WEAPON_1) / (p1 * XP_PER_WEAPON_1)
      }
      if (this.mixRank === 2) {
        result = (
          DRAW_COST +
          (p1 * FUSION_COST_PER_WEAPON_1) +
          (p2 * FUSION_COST_PER_WEAPON_2)) /
          (p1 * XP_PER_WEAPON_1 + p2 * XP_PER_WEAPON_2)
      }
      if (this.mixRank === 3) {
        result = (
          DRAW_COST +
          (p1 * FUSION_COST_PER_WEAPON_1) +
          (p2 * FUSION_COST_PER_WEAPON_2) +
          (p3 * FUSION_COST_PER_WEAPON_3)) /
          (p1 * XP_PER_WEAPON_1 + p2 * XP_PER_WEAPON_2 + p3 * XP_PER_WEAPON_3)
      }
      return result
    },
    levelResult() {
      const that = this
      let currentValue = REQUIRED_XP[this.currentLevel - 1]
      let foundIndex = _.findIndex(REQUIRED_XP, (value, index) => {
        return that.expectedXp <= value - currentValue
      })
      if (_.sum(REQUIRED_XP) < that.expectedXp) {
        return 40
      }
      if (foundIndex && foundIndex > 0) {
        return foundIndex
      }
      if (that.expectedXp <= _.last(REQUIRED_XP)) {
        return this.currentLevel
      }
      return 40
    },
    moneyResult() {
      const targetValue = REQUIRED_XP[this.targetLevel - 1]
      const currentValue = REQUIRED_XP[this.currentLevel - 1]
      if (this.targetLevel < this.currentLevel) {
        return 0
      }
      if (this.targetLevel > 40) {
        return 0
      }
      return Math.floor((targetValue - currentValue) * this.expectedMoney)
    },
  },
  components: {
    VueSlider,
  },
}

</script>

<style scoped>
.row {
  display: flex;
  justify-content: center;
  min-width: 260px;
  box-sizing: border-box;
}
.label {
  display: block;
  min-width: 80px;
  margin-top: auto;
  margin-bottom: auto;
  font-weight: bold;
}
.statistics {
  max-width: 160px;
  display: block;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}
</style>
