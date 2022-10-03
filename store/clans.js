export const state = () => ({
  clans: [],
  clan: {},
  myClan: {}
  // Todo 検索機能をVuexで管理する考えだったが良策が思い浮かばないため一旦コメントアウト
  // filteredClans: []
})

export const getters = {
  clans: state => state.clans,
  clan: state => state.clan,
  myClan: state => state.myClan
  // Todo 検索機能をVuexで管理する考えだったが良策が思い浮かばないため一旦コメントアウト
  // filteredClans: state => state.filteredClans
}

export const mutations = {
  setClans (state, clans) {
    state.clans = clans
  },
  setClan (state, clan) {
    state.clan = clan
  },
  setMyClan (state, myClan) {
    state.myClan = myClan
  },
  addClan (state, clan) {
    state.clans = state.clans.unshift(clan)
  },
  editClan (state, updatedClan) {
    const index = state.clans.find(clan => clan.id === updatedClan.id)
    if (index !== -1) {
      state.clans.splice(index, 1, updatedClan)
    }
  },
  deleteClan (state, deleteClan) {
    state.clans = state.clans.filter(clan => clan.id !== deleteClan.id)
  }
  // Todo 検索機能をVuexで管理する考えだったが良策が思い浮かばないため一旦コメントアウト
  // setFilteredClans (state, filterQuery) {
  //   console.log('filter!!')
  //   const clans = []

  //   for (const i in state.clans) {
  //     const clan = state.clans[i]

  //     if (clan.platform.includes(filterQuery.platform) &&
  //         clan.age.includes(filterQuery.age) &&
  //         clan.required_login.includes(filterQuery.required_login) &&
  //         clan.required_ranked.includes(filterQuery.required_ranked)
  //         // clan.required_vc.includes(filterQuery.required_vc)
  //     ) {
  //       clans.push(clan)
  //     }
  //   }

  //   console.log(clans)
  //   state.clans = clans
  // }
}

export const actions = {
  getClans ({ commit }, res) {
    commit('setClans', res)
  },
  getClan ({ commit }, res) {
    commit('setClan', res)
  },
  getMyClan ({ commit }, res) {
    commit('setMyClan', res)
  },
  addClan ({ commit }, res) {
    commit('addClan', res)
  },
  updateClan ({ commit }, res) {
    commit('editClan', res)
  },
  deleteClan ({ commit }, res) {
    commit('deleteClan', res)
  }
  // Todo 検索機能をVuexで管理する考えだったが良策が思い浮かばないため一旦コメントアウト
  // getFilteredClans ({ commit }, filterQuery) {
  //   commit('setFilteredClans', filterQuery)
  // }
}
