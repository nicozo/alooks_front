export const state = () => ({
  clans: [],
  clan: {}
})

export const getters = {
  clans: state => state.clans,
  clan: state => state.clan
}

export const mutations = {
  setClans (state, clans) {
    state.clans = clans
  },
  setClan (state, clan) {
    state.clan = clan
  }
}

export const actions = {
  getClans ({ commit }, res) {
    commit('setClans', res)
  },
  getClan ({ commit }, res) {
    commit('setClan', res)
  }
}
