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

          <!-- クラン編集モーダル -->
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
                      <clan-form-name :name.sync="clan.name" />
                    </v-col>

                    <v-col cols="12">
                      <clan-form-concept :concept.sync="clan.concept" />
                    </v-col>

                    <v-col cols="12">
                      <clan-form-joining-process :joining-process.sync="clan.joining_process" />
                    </v-col>

                    <v-col cols="12">
                      <clan-form-prohibited-matters :prohibited-matters.sync="clan.prohibited_matters" />
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
                        @click="update(clan)"
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
                クランID{{ clan.id }}を削除しますか？
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
                  @click="clanDelete(clan)"
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
  name: 'AdminClansPage',
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
      editDialog: false,
      deleteDialog: false,
      editedIndex: -1,
      clan: {
        name: '',
        concept: '',
        joining_process: '',
        prohibited_matters: ''
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
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  methods: {
    async update (clan) {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$patch(
        `/api/v1/admin/clans/${clan.id}`,
        this.clan
      )
        .then(res => this.updateSuccessful(res))
        .catch(e => this.updateFailure(e))
    },
    updateSuccessful (res) {
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
      const msg = `クランID${res.id}を更新しました`
      const color = 'success'
      this.setToaster(msg, color)
      this.$store.dispatch('getBtnLoading', false)
      this.closeDialog()
    },
    updateFailure ({ response }) {
      this.$store.dispatch('getBtnLoading', false)
      if (response && response.status === 400) {
        const msg = 'クランの更新に失敗しました'
        return this.$store.dispatch('getToast', { msg })
      }
    },
    async clanDelete (clan) {
      this.$store.dispatch('getBtnLoading', false)

      await this.$axios.$delete(
        `/api/v1/admin/clans/${clan.id}`
      )
        .then(res => this.deleteSuccessful(res))
    },
    deleteSuccessful (res) {
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
      const msg = `クランID${res.id}を削除しました`
      const color = 'success'
      this.setToaster(msg, color)
      this.$store.dispatch('getBtnLoading', false)
      this.closeDialog()
    },
    setClan (clan) {
      this.editedIndex = this.clans.indexOf(clan)
      this.clan = Object.assign({}, clan)
    },
    openEditDialog (clan) {
      this.setClan(clan)
      this.editDialog = true
    },
    openDeleteDialog (clan) {
      this.setClan(clan)
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
