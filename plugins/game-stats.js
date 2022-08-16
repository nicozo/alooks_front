class GameStats {
  constructor (ctx) {
    this.store = ctx.store
    this.$axios = ctx.$axios
  }

  get data () {
    return this.store.getters['game-stats/data']
  }

  get allLegendStats () {
    return this.store.getters['game-stats/allLegendStats']
  }

  get highestKillLegendStats () {
    return this.store.getters['game-stats/highestKillLegendStats']
  }

  get rankedStats () {
    return this.store.getters['game-stats/rankedStats']
  }

  get playerTotalStats () {
    return this.store.getters['game-stats/playerTotalStats']
  }

  get errorMessage () {
    return this.store.getters['game-stats/errorMessage']
  }

  get loading () {
    return this.store.getters['game-stats/loading']
  }

  get disabled () {
    return this.store.getters['game-stats/disabled']
  }

  async getStats (gameId, platform) {
    this.resetStats()
    this.isLoading()
    this.isDisabled()
    console.log('loading stats')

    await this.$axios.$get(
      'search',
      {
        params: {
          game_id: gameId,
          platform
        }
      }
    )
      .then(res => this.requestSuccessful(res))
      .catch(e => this.requestFailure(e))
  }

  requestSuccessful (res) {
    if (!this.responseHasErrorMessage(res)) {
      this.setData(res)
      this.setHighestKillLegendStats()
    } else {
      this.store.dispatch('game-stats/getErrorMessage', res.Error)
    }
    this.isLoading()
    this.isDisabled()
  }

  requestFailure (e) {
    console.log(e)
    this.isLoading()
    this.isDisabled()
  }

  responseHasErrorMessage (res) {
    return 'Error' in res
  }

  setData (res) {
    this.store.dispatch('game-stats/getData', res)
    this.store.dispatch('game-stats/getAllLegendStats', this.data.legends.all)
    this.store.dispatch('game-stats/getRankedStats', this.setRankedStats())
    this.store.dispatch('game-stats/getPlayerTotalStats', this.setPlayerTotalStats())
  }

  setHighestKillLegendStats () {
    const targetLegend = this.getHighestKillLegend()
    const legendStats = this.allLegendStats[targetLegend.name]

    this.store.dispatch('game-stats/getHighestKillLegendStats', legendStats)
    // console.log('highestKillLegendStats', this.highestKillLegendStats)
  }

  setRankedStats () {
    const rankedStats = []
    rankedStats.push(this.data.global.arena)
    rankedStats.push(this.data.global.rank)

    return rankedStats
  }

  setPlayerTotalStats () {
    const totalData = this.data.total
    const playerTotalStats = []

    for (const key in totalData) {
      const obj = {
        key: '',
        value: ''
      }

      obj.key = key
      obj.value = totalData[key]
      playerTotalStats.push(obj)
    }

    // console.log('total:', playerTotalStats)
    return playerTotalStats
  }

  getAllLegendKillStats () {
    const data = this.allLegendStats
    const allLegendKillData = []

    Object.keys(data).forEach((key) => {
      if (data[key].data !== undefined) {
        Object.values(data[key].data).forEach((value) => {
          if (value.key === 'specialEvent_kills' || value.key === 'kills') {
            const obj = {
              name: '',
              value: ''
            }
            obj.name = key
            obj.value = value.value
            allLegendKillData.push(obj)
          }
        })
      }
    })
    // console.log('allLegendKillData:', allLegendKillData)
    return allLegendKillData
  }

  getHighestKillLegend () {
    const data = this.getAllLegendKillStats()
    let hightestKillLegendData = ''

    data.forEach((el) => {
      if (!hightestKillLegendData || hightestKillLegendData.value < el.value) {
        hightestKillLegendData = el
      }
    })
    // console.log('hightestKillLegendData:', hightestKillLegendData)
    return hightestKillLegendData
  }

  resetStats () {
    this.store.dispatch('game-stats/getRankedStats', [])
    this.store.dispatch('game-stats/getPlayerTotalStats', [])
  }

  isLoading () {
    this.store.dispatch('game-stats/getLoading', !this.loading)
  }

  isDisabled () {
    this.store.dispatch('game-stats/getDisabled', !this.disabled)
  }

  isRankedStatsExist () {
    return this.rankedStats.length !== 0
  }
}

// 共通化
export default ({ store, $axios }, inject) => {
  inject('game', new GameStats({ store, $axios }))
}
