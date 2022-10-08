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
            {{ $t('admin.rooms') }}
          </v-toolbar-title>

          <v-divider
            class="mx-4"
            inset
            vertical
          />

          <v-spacer />

          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ $t('admin.room_create') }}
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">
                  {{ formTitle }}
                </span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <room-form-title :title.sync="editedItem.title" />
                    </v-col>

                    <v-col
                      cols="12"
                      lg="6"
                    >
                      <room-form-platform :platform.sync="editedItem.platform" />
                    </v-col>

                    <v-col
                      cols="12"
                      lg="6"
                    >
                      <room-form-game-mode :game-mode.sync="editedItem.game_mode" />
                    </v-col>

                    <v-col
                      cols="12"
                      lg="6"
                    >
                      <room-form-rank-tier :rank-tier.sync="editedItem.rank_tier" />
                    </v-col>

                    <v-col
                      cols="12"
                      lg="6"
                    >
                      <room-form-application-deadline :application.sync="editedItem.application_deadline" />
                    </v-col>

                    <v-col
                      cols="12"
                      lg="6"
                    >
                      <room-form-recruitment-number :application.sync="editedItem.recruitment_number" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="error"
                  text
                  @click="close"
                >
                  {{ $t('btn.cancel') }}
                </v-btn>

                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  {{ $t('btn.submit') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5">
                ユーザーを削除しますか？
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closeDelete"
                >
                  {{ $t('btn.cancel') }}
                </v-btn>

                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm"
                >
                  {{ $t('btn.delete') }}
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template #no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'AdminIRoomsPage',
  layout: 'admin',
  async asyncData ({ $axios }) {
    const rooms = await $axios.$get(
      '/api/v1/admin/rooms'
    )

    return { rooms }
  },
  data () {
    return {
      activePicker: null,
      menu: false,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        title: '',
        platform: '',
        game_mode: '',
        rank_tier: '',
        application_deadline: 'male',
        recruitment_number: ''
      },
      defaultItem: {
        name: '',
        platform: '',
        game_mode: '',
        rank_tier: '',
        application_deadline: 'male',
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
    formTitle () {
      return this.editedIndex === -1 ? 'ユーザー作成' : 'ユーザー編集'
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.rooms.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.rooms.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.rooms.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.rooms[this.editedIndex], this.editedItem)
      } else {
        this.rooms.push(this.editedItem)
      }
      this.close()
    },
    saveDate (date) {
      this.$refs.menu.save(date)
    }
  }
}
</script>
