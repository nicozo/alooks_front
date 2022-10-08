<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="applications"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t('admin.applications') }}
          </v-toolbar-title>

          <v-divider
            class="mx-4"
            inset
            vertical
          />

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

      <template #[`item.actions`]="{ item }">
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
  name: 'AdminIApplicationsPage',
  layout: 'admin',
  async asyncData ({ $axios }) {
    const applications = await $axios.$get(
      '/api/v1/admin/applies'
    )

    return { applications }
  },
  data () {
    return {
      activePicker: null,
      menu: false,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        body: ''
      },
      defaultItem: {
        body: ''
      },
      number: 10,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'メッセージ', value: 'body' },
        { text: 'スクワッドID', value: 'room_id' },
        { text: 'ホストID', value: 'host_id' },
        { text: '応募者ID', value: 'user_id' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
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
    }
  }
}
</script>
