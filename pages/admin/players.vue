<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="players"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t(`pages.${routeName}`) }}
          </v-toolbar-title>

          <v-divider
            class="mx-4"
            inset
            vertical
          />

          <v-spacer />

          <!-- フレンド募集編集モーダル -->
          <v-dialog
            v-model="editDialog"
            max-width="500px"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">
                  {{ $t('admin.room_edit') }}
                </span>
              </v-card-title>

              <validation-observer v-slot="{ invalid }">
                <v-container>
                  <v-row dense>
                    <v-col cols="12">
                      <player-form-body :body.sync="player.body" />
                    </v-col>

                    <v-card-actions>
                      <v-spacer />

                      <v-btn
                        color="error"
                        text
                        @click="closeDialog"
                      >
                        {{ $t('btn.cancel') }}
                      </v-btn>

                      <v-btn
                        color="blue darken-1"
                        text
                        :disabled="invalid"
                        :loading="btnLoading"
                        @click="update(player)"
                      >
                        {{ $t('btn.update') }}
                      </v-btn>
                    </v-card-actions>
                  </v-row>
                </v-container>
              </validation-observer>
            </v-card>
          </v-dialog>

          <!-- クラン削除モーダル -->
          <v-dialog
            v-model="deleteDialog"
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5">
                フレンド募集掲示板ID{{ player.id }}を削除しますか？
              </v-card-title>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="error"
                  text
                  @click="closeDialog"
                >
                  {{ $t('btn.cancel') }}
                </v-btn>

                <v-btn
                  color="blue darken-1"
                  text
                  :loading="btnLoading"
                  @click="playerDelete(player)"
                >
                  {{ $t('btn.delete') }}
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="openEditDialog(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="openDeleteDialog(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'AdminPlayersPage',
  layout: 'admin',
  async asyncData ({ $axios }) {
    const players = await $axios.$get(
      '/api/v1/admin/players'
    )

    return { players }
  },
  data ({ $route }) {
    return {
      routeName: $route.name,
      editDialog: false,
      deleteDialog: false,
      editedIndex: -1,
      player: {
        body: ''
      },
      number: 10,
      headers: [
        { text: 'ID', value: 'id' },
        { text: '募集文', value: 'body' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  methods: {
    async update (player) {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$patch(
        `/api/v1/admin/players/${player.id}`,
        this.player
      )
        .then(res => this.updateSuccessful(res))
        .catch(e => this.updateFailure(e))
    },
    updateSuccessful (res) {
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
      const msg = `フレンド募集掲示板ID${res.id}を更新しました`
      const color = 'success'
      this.setToaster(msg, color)
      this.$store.dispatch('getBtnLoading', false)
      this.closeDialog()
    },
    updateFailure ({ response }) {
      this.$store.dispatch('getBtnLoading', false)
      if (response && response.status === 400) {
        const msg = 'フレンド募集掲示板の更新に失敗しました'
        return this.$store.dispatch('getToast', { msg })
      }
    },
    async playerDelete (player) {
      this.$store.dispatch('getBtnLoading', false)

      await this.$axios.$delete(
        `/api/v1/admin/players/${player.id}`
      )
        .then(res => this.deleteSuccessful(res))
    },
    deleteSuccessful (res) {
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
      const msg = `フレンド募集掲示板ID${res.id}を削除しました`
      const color = 'success'
      this.setToaster(msg, color)
      this.$store.dispatch('getBtnLoading', false)
      this.closeDialog()
    },
    setPlayer (player) {
      this.editedIndex = this.players.indexOf(player)
      this.player = Object.assign({}, player)
    },
    openEditDialog (player) {
      this.setPlayer(player)
      this.editDialog = true
    },
    openDeleteDialog (player) {
      this.setPlayer(player)
      this.deleteDialog = true
    },
    closeDialog () {
      this.newDialog = false
      this.editDialog = false
      this.deleteDialog = false
    },
    setToaster (msg, color) {
      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
