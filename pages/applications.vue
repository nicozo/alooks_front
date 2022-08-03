<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col>
      applications.vue
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ApplicationsPage',
  layout: 'loggedIn'
  // async asyncData ({ $axios }) {
  //   const applications = await $axios.$get(
  //     'api/v1/'
  //   )
  //   // console.log('参加リクエスト一覧:', applications)
  //   return { applications }
  // },
  // data () {
  //   return {
  //     loading: false,
  //     minWidth: 200,
  //     data: '',
  //     allLegendStats: '',
  //     hightestKillLegendStats: '',
  //     playerTotalStats: [],
  //     rankStatsData: []
  //   }
  // },
  // computed: {
  //   isAlreadyAccepted () {
  //     return function (invitationId) {
  //       return this.accept_applications.some(e => e.invitation_id === invitationId)
  //     }
  //   },
  //   isRankStatsDataExist () {
  //     return this.rankStatsData.length !== 0
  //   },
  //   filteredPlayerTotalStats () {
  //     return this.playerTotalStats.filter((val) => {
  //       // console.log(`${val.key}:${val.value.name}-${val.value.value}`)
  //       return val.key === 'specialEvent_kills' ||
  //               val.key === 'specialEvent_damage' ||
  //               val.key === 'specialEvent_wins' ||
  //               val.key === 'headshots'
  //     })
  //   },
  //   isBreakPointImgWidth () {
  //     return this.$vuetify.breakpoint.xs ? 150 : 200
  //   }
  // },
  // created () {
  //   this.countNewRequest()
  // },
  // methods: {
  //   isRead (invitation) {
  //     if (invitation.is_new === true) {
  //       this.reduceNumber()
  //       invitation.is_new = false
  //     }
  //   },
  //   reduceNumber (data) {
  //     this.number--
  //   },
  //   countNewRequest () {
  //     this.number = 0
  //     for (let index = 0; index < this.invitations.length; index++) {
  //       const obj = this.invitations[index]
  //       if (obj.is_new === true) { this.number++ }
  //     }
  //   },
  //   onExpansionPanelClick (invitation) {
  //     if (event.currentTarget.classList.contains('v-expansion-panel-header--active')) {
  //       console.log('Panel is closing/now closed.')
  //     } else {
  //       console.log('Panel is opening/now open.')
  //       this.isRead(invitation)
  //       // if (this.data.Error) {
  //       //   this.data = ''
  //       // }
  //       if (this.data === '' || invitation.user.game_id !== this.data.global.name) {
  //         this.getGameData(invitation)
  //       }
  //     }
  //   },
  //   async getGameData () {
  //     await this.$axios.$get(
  //       'search',
  //       {
  //         params: {
  //           game_id: this.authUser.game_id,
  //           platform: this.authUser.platform
  //         }
  //       }
  //     )
  //       .then(res => this.requestSuccessful(res))
  //       .catch(e => this.requestFailure(e))
  //   },
  //   requestSuccessful (res) {
  //     console.log('リクエスト成功')
  //     console.log(res)
  //     if (!res.Error) {
  //       this.data = res
  //       this.setAllLegendStats()
  //       this.setPlayerTotalStats()
  //       this.setRankStatsData()
  //     } else {
  //       this.message = res.Error
  //     }
  //     this.isLoading()
  //     this.isDisabled()
  //   },
  //   requestFailure (e) {
  //     console.log('リクエスト失敗')
  //     console.log(e)
  //     this.isLoading()
  //     this.isDisabled()
  //   },
  //   setAllLegendStats () {
  //     this.allLegendStats = this.data.legends.all
  //     this.getLegendStats()
  //   },
  //   getAllLegendKillData () {
  //     const data = this.allLegendStats
  //     const allLegendKillData = []
  //     Object.keys(data).forEach((key) => {
  //       if (data[key].data !== undefined) {
  //         Object.values(data[key].data).forEach((value) => {
  //           if (value.key === 'specialEvent_kills') {
  //             const obj = {
  //               name: '',
  //               value: ''
  //             }
  //             obj.name = key
  //             obj.value = value.value
  //             allLegendKillData.push(obj)
  //           }
  //         })
  //       }
  //     })
  //     // console.log('allLegendKillData:', allLegendKillData)
  //     return allLegendKillData
  //   },
  //   getHighestKillLegendData () {
  //     const data = this.getAllLegendKillData()
  //     let hightestKillLegendData = ''
  //     data.forEach((el) => {
  //       if (!hightestKillLegendData || hightestKillLegendData.value < el.value) {
  //         hightestKillLegendData = el
  //       }
  //     })
  //     // console.log('hightestKillLegendData:', hightestKillLegendData)
  //     return hightestKillLegendData
  //   },
  //   getLegendStats () {
  //     const legend = this.getHighestKillLegendData()
  //     if (legend.name in this.allLegendStats) {
  //       this.hightestKillLegendStats = this.allLegendStats[legend.name]
  //     }
  //     console.log('hightestKillLegendStats:', this.hightestKillLegendStats)
  //   },
  //   setRankStatsData () {
  //     this.rankStatsData.push(this.data.global.arena)
  //     this.rankStatsData.push(this.data.global.rank)
  //     console.log('rankStatsData:', this.rankStatsData)
  //   },
  //   resetRankStatsData () {
  //     this.rankStatsData = []
  //   },
  //   setPlayerTotalStats () {
  //     for (const key in this.data.total) {
  //       const obj = {
  //         key: '',
  //         value: ''
  //       }
  //       obj.key = key
  //       obj.value = this.data.total[key]
  //       this.playerTotalStats.push(obj)
  //     }
  //     // this.playerTotalStats = this.data.total
  //     console.log('total:', this.playerTotalStats)
  //   },
  //   isLoading () {
  //     this.loading = false
  //   },
  //   isArenaRankStats (data) {
  //     return data.rankedSeason.indexOf('arena')
  //   },
  //   isDisabled () {
  //     this.disabled = !this.disabled
  //   },
  //   accept () {
  //     alert('リクエスト承諾！')
  //   }
  // }
}
</script>
