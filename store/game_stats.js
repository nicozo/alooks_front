export const state = () => ({
  data: '',
  allLegendStats: '',
  highestKillLegendStats: '',
  rankedStats: '',
  playerTotalStats: '',
  errorMessage: '',
  loading: false,
  disabled: false
})

export const getters = {
  data: state => state.data,
  allLegendStats: state => state.allLegendStats,
  highestKillLegendStats: state => state.highestKillLegendStats,
  rankedStats: state => state.rankedStats,
  playerTotalStats: state => state.playerTotalStats,
  errorMessage: state => state.errorMessage,
  loading: state => state.loading,
  disabled: state => state.disabled
}

export const mutations = {
  setData (state, data) {
    state.data = data
  },
  setAllLegendStats (state, allLegendData) {
    state.allLegendStats = allLegendData
  },
  setHighestKillLegendStats (state, legendData) {
    state.highestKillLegendStats = legendData
  },
  setRankedStats (state, rankedData) {
    state.rankedStats = rankedData
  },
  setPlayerTotalStats (state, totalData) {
    state.playerTotalStats = totalData
  },
  setMessage (state, message) {
    state.errorMessage = message
  },
  setLoading (state, boolean) {
    state.loading = boolean
  },
  setDisabled (state, boolean) {
    state.disabled = boolean
  }
}

export const actions = {
  getData ({ commit }, data) {
    commit('setData', data)
  },
  getAllLegendStats ({ commit }, allLegendData) {
    commit('setAllLegendStats', allLegendData)
  },
  getHighestKillLegendStats ({ commit }, legendData) {
    commit('setHighestKillLegendStats', legendData)
  },
  getRankedStats ({ commit }, rankedData) {
    commit('setRankedStats', rankedData)
  },
  getPlayerTotalStats ({ commit }, totalData) {
    commit('setPlayerTotalStats', totalData)
  },
  getMessage ({ commit }, message) {
    commit('setPlayerTotalStats', message)
  },
  getLoading ({ commit }, boolean) {
    commit('setLoading', boolean)
  },
  getDisabled ({ commit }, boolean) {
    commit('setDisabled', boolean)
  }
}
