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
  },
  deleteClan (state, deleteClan) {
    state.clans = state.clans.filter(clan => clan.id !== deleteClan.id)
  }
}

export const actions = {
  getClans ({ commit }, res) {
    commit('setClans', res)
  },
  getClan ({ commit }, res) {
    commit('setClan', res)
  },
  deleteClan ({ commit }, res) {
    commit('deleteClan', res)
  }
}
