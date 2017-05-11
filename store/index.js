import _ from 'lodash'

const state = {
  links: [],
  events: [],
  equipments: [],
  portability: {
    headPortable: 952,
    torsoPortable: 880,
    pantsPortable: 928,
    weaponPortable: 660,
    additionalRate: 0,
  },
  portabilityHistories: [],
  xp: {
    currentLevel: 1,
    mixRank: 3,
    targetLevel: 30,
    money: 1000000,
  },
  scrollY: 0,
  weapons: [],
  weaponMappings: [],
}

const types = {
  XP_SET_MONEY: 'XP_SET_MONEY',
  XP_SET_VALUES: 'XP_SET_VALUES',
  PORTABILITY_SET_VALUES: 'PORTABILITY_SET_VALUES',
  PORTABILITY_SAVE: 'PORTABILITY_SAVE',
  LINK_RESET: 'LINK_RESET',
  LINK_RETRIEVED: 'LINK_RETRIEVED',
  EVENT_RETRIEVED: 'EVENT_RETRIEVED',
  SET_SCROLL: 'SET_SCROLL',
  WEAPONS_RETRIEVED: 'WEAPONS_RETRIEVED',
  WEAPONMAPPINGS_RETRIEVED: 'WEAPONMAPPINGS_RETRIEVED',
  JOIN_WEAPON: 'JOIN_WEAPON',
}

const actions = {
  setMoney(context, value) {
    const moneyAsNumber = parseInt((value + '').replace(/,/g, ''), 10)
    context.commit(types.XP_SET_MONEY, moneyAsNumber)
  },
  setXPParams(context, payload) {
    const parsed = payload.value ? parseInt(payload.value, 10) : 0
    context.commit(types.XP_SET_VALUES, {
      key: payload.key,
      value: parsed,
    })
  },
  setPortability(context, payload) {
    const parsed = payload.value ? parseInt(payload.value, 10) : 0
    context.commit(types.PORTABILITY_SET_VALUES, {
      key: payload.key,
      value: parsed,
    })
  },
  loadPortabilityHistories(context) {
    const stored = window.localStorage.getItem('histories')
    context.commit(types.PORTABILITY_SAVE, stored ? JSON.parse(stored) : [])
  },
  savePortability(context, value) {
    let histories = _.cloneDeep(context.state.portabilityHistories)
    histories.push(value)
    histories = _.uniqBy(histories, record => {
      var key = record.headPortable + ''
      key += record.torsoPortable
      key += record.pantsPortable
      key += record.weaponPortable
      key += record.additionalRate
      return key
    })
    window.localStorage.setItem('histories', JSON.stringify(histories))
    if (_.isFunction(global.ga)) {
      global.ga('send', {
        hitType: 'event',
        eventCategory: 'Portable',
        eventAction: 'Save',
        eventLabel: JSON.stringify(value),
        eventValue: 1,
      })
    }
    context.commit(types.PORTABILITY_SAVE, histories)
  },
  removePortability(context, uuid) {
    let histories = _.cloneDeep(context.state.portabilityHistories)
    histories = _.reject(histories, {
      uuid: uuid,
    })
    window.localStorage.setItem('histories', JSON.stringify(histories))
    context.commit(types.PORTABILITY_SAVE, histories)
  },
  clearPortability(context) {
    window.localStorage.setItem('histories', JSON.stringify([]))
    context.commit(types.PORTABILITY_SAVE, [])
  },
}

var mutations = {
  XP_SET_MONEY(state, value) {
    state.xp.money = 0
    if (value < 0) {
      value = 0
    }
    if (value > 999999999) {
      value = 999999999
    }
    state.xp.money = value
  },
  PORTABILITY_SET_VALUES(state, params) {
    state.portability[params.key] = 0 // 一旦リセットする
    var value = params.value
    if (/Portable$/.test(params.key)) {
      if (params.value < 0) {
        value = 0
      }
      if (params.value > 1000) {
        value = 1000
      }
    }
    state.portability[params.key] = value
  },
  PORTABILITY_SAVE(state, histories) {
    state.portabilityHistories.splice(0, state.portabilityHistories.length)
    state.portabilityHistories = state.portabilityHistories.concat(histories)
  },
  XP_SET_VALUES(state, params) {
    state.xp[params.key] = 0 // 一旦リセットする
    var value = params.value
    if (params.key === 'currentLevel' || params.key === 'targetLevel') {
      if (params.value < 0) {
        value = 0
      }
      if (params.value > 40) {
        value = 40
      }
    }
    state.xp[params.key] = value
  },
  LINK_RESET(state) {
    state.links.splice(0, state.links.length)
  },
  LINK_RETRIEVED(state, params) {
    state.links = params.data
  },
  EVENT_RETRIEVED(state, params) {
    state.events = params.data
  },
  SET_SCROLL(state, value) {
    state.scrollY = value
  },
  WEAPONS_RETRIEVED(state, value) {
    state.weapons = value
  },
  WEAPONMAPPINGS_RETRIEVED(state, value) {
    state.weaponMappings = value
  },
  JOIN_WEAPON(state) {
    state.weapons = _.chain(state.weapons)
      .map((weapon) => {
        let keywords = [weapon.name, weapon.class_name, weapon.fonetic, weapon.description, weapon.slot === 'primary' ? 'メイン' : 'サブ']
        const series = _.chain(state.weaponMappings)
          .filter((mapping) => {
            return weapon.ID === mapping.weapon_id && mapping.series_id !== 1
          })
          .value()
        keywords = keywords.concat(_.map(series, 'series_name'))
        weapon.series = series
        weapon.summary = keywords.join(' ')
        return weapon
      })
      .value()
  },
}

var getters = {
}

export default {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations,
}
