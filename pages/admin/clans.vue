<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="clans"
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

          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5">
                クランを削除しますか？
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
  name: 'AdminIClansPage',
  layout: 'admin',
  async asyncData ({ $axios }) {
    const clans = await $axios.$get(
      '/api/v1/admin/clans'
    )

    return { clans }
  },
  data ({ $route }) {
    return {
      routeName: $route.name,
      activePicker: null,
      menu: false,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        concept: '',
        joining_process: '',
        prohibited_matters: '',
        enrollment: 'male',
        activity_time: '',
        enrollment_age: '',
        snipe: '',
        contact_means: '',
        platform: '',
        age: '',
        required_login: '',
        required_ranked: '',
        required_vc: '',
        personality: ''
      },
      defaultItem: {
        name: '',
        concept: '',
        joining_process: '',
        prohibited_matters: '',
        enrollment: 'male',
        activity_time: '',
        enrollment_age: '',
        snipe: '',
        contact_means: '',
        platform: '',
        age: '',
        required_login: '',
        required_ranked: '',
        required_vc: '',
        personality: ''
      },
      number: 10,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'クラン名', value: 'name' },
        { text: 'コンセプト', value: 'concept' },
        { text: '入団まで', value: 'joining_process' },
        { text: '禁止事項', value: 'prohibited_matters' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'クラン作成' : 'クラン編集'
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
