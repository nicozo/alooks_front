export const state = () => ({
  clans: []
})

export const getters = {
  clans: state => state.clans
}

export const mutations = {
  setClans (state, clans) {
    state.clans = clans
  }
}

export const actions = {
  getClans ({ commit }, res) {
    commit('setClans', res)
  }
}
