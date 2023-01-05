export const state = () => ({
  players: [],
  player: {}
})

export const getters = {
  players: state => state.players,
  player: state => state.player
}

export const mutations = {
  setPlayers (state, players) {
    state.players = players
  },
  setPlayer (state, player) {
    state.player = player
  },
  addPlayer (state, player) {
    state.players = state.players.unshift(player)
  },
  editPlayer (state, updatedPlayer) {
    const index = state.players.find(player => player.id === updatedPlayer.id)
    if (index !== -1) {
      state.players.splice(index, 1, updatedPlayer)
    }
  },
  deletePlayer (state, deletePlayer) {
    state.players = state.players.filter(player => player.id !== deletePlayer.id)
  }
}

export const actions = {
  getPlayers ({ commit }, res) {
    commit('setPlayers', res)
  },
  getPlayer ({ commit }, res) {
    commit('setPlayer', res)
  },
  addPlayer ({ commit }, res) {
    commit('addPlayer', res)
  },
  updatePlayer ({ commit }, res) {
    commit('editPlayer', res)
  },
  deletePlayer ({ commit }, res) {
    commit('deletePlayer', res)
  }
}
