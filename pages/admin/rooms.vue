<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="rooms"
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

          <!-- スクワッド編集モーダル -->
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
                      <room-form-title :title.sync="room.title" />
                    </v-col>

                    <v-col cols="12">
                      <room-form-platform :platform.sync="room.platform" />
                    </v-col>

                    <v-col cols="12">
                      <room-form-game-mode :game-mode.sync="room.game_mode" />
                    </v-col>

                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                      lg="4"
                    >
                      <room-form-rank-tier :rank-tier.sync="room.rank_tier" />
                    </v-col>

                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                      lg="4"
                    >
                      <room-form-application-deadline :application-deadline.sync="room.application_deadline" />
                    </v-col>

                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                      lg="4"
                    >
                      <room-form-recruitment-number :recruitment-number.sync="room.recruitment_number" />
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
                        @click="update(room)"
                      >
                        {{ $t('btn.update') }}
                      </v-btn>
                    </v-card-actions>
                  </v-row>
                </v-container>
              </validation-observer>
            </v-card>
          </v-dialog>

          <!-- スクワッド削除モーダル -->
          <v-dialog
            v-model="deleteDialog"
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5">
                スクワッドを削除しますか？
              </v-card-title>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="error"
                  text
                  @click="closeDelete"
                >
                  {{ $t('btn.cancel') }}
                </v-btn>

                <v-btn
                  color="blue darken-1"
                  text
                  :loading="btnLoading"
                  @click="roomDelete(room)"
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
  name: 'AdminRoomsPage',
  layout: 'admin',
  async asyncData ({ $axios }) {
    const rooms = await $axios.$get(
      '/api/v1/admin/rooms'
    )

    return { rooms }
  },
  data ({ $route }) {
    return {
      routeName: $route.name,
      editDialog: false,
      deleteDialog: false,
      editedIndex: -1,
      room: {
        name: '',
        platform: '',
        game_mode: '',
        rank_tier: '',
        application_deadline: '',
        recruitment_number: ''
      },
      number: 10,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'タイトル', value: 'title' },
        { text: 'プラットフォーム', value: 'platform' },
        { text: 'ゲームモード', value: 'game_mode' },
        { text: 'ランク帯', value: 'rank_tier' },
        { text: '締め切り', value: 'application_deadline' },
        { text: '募集人数', value: 'recruitment_number' },
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
    async update (room) {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$patch(
        `/api/v1/admin/rooms/${room.id}`,
        this.room
      )
        .then(res => this.updateSuccessful(res))
        .catch(e => this.updateFailure(e))
    },
    updateSuccessful (res) {
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
      const msg = `スクワッドID${res.id}を更新しました`
      const color = 'success'
      this.setToaster(msg, color)
      this.$store.dispatch('getBtnLoading', false)
      this.closeDialog()
    },
    updateFailure ({ response }) {
      this.$store.dispatch('getBtnLoading', false)
      if (response && response.status === 400) {
        const msg = 'スクワッドの更新に失敗しました'
        return this.$store.dispatch('getToast', { msg })
      }
    },
    async roomDelete (room) {
      this.$store.dispatch('getBtnLoading', false)

      await this.$axios.$delete(
        `/api/v1/admin/rooms/${room.id}`
      )
        .then(res => this.deleteSuccessful(res))
    },
    deleteSuccessful (res) {
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
      const msg = `スクワッドID${res.id}を削除しました`
      const color = 'success'
      this.setToaster(msg, color)
      this.$store.dispatch('getBtnLoading', false)
      this.closeDialog()
    },
    setRoom (room) {
      this.editedIndex = this.rooms.indexOf(room)
      this.room = Object.assign({}, room)
    },
    openEditDialog (room) {
      this.setRoom(room)
      this.editDialog = true
    },
    openDeleteDialog (room) {
      this.setRoom(room)
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
