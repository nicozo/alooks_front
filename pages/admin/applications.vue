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
            {{ $t(`pages.${routeName}`) }}
          </v-toolbar-title>

          <v-divider
            class="mx-4"
            inset
            vertical
          />

          <!-- 参加リクエスト編集モーダル -->
          <v-dialog
            v-model="editDialog"
            max-width="500px"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">
                  {{ $t('admin.application_edit') }}
                </span>
              </v-card-title>

              <validation-observer v-slot="{ invalid }">
                <v-container>
                  <v-row dense>
                    <v-col cols="12">
                      <validation-provider
                        v-slot="{ errors }"
                        name="リクエストメッセージ"
                        rules="required|max:25"
                      >
                        <v-text-field
                          v-model="application.body"
                          label="リクエストメッセージ"
                          counter="25"
                          :error-messages="errors"
                          required
                          placeholder="よろしくお願いします！"
                        />
                      </validation-provider>
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
                        @click="update(application)"
                      >
                        {{ $t('btn.update') }}
                      </v-btn>
                    </v-card-actions>
                  </v-row>
                </v-container>
              </validation-observer>
            </v-card>
          </v-dialog>

          <!-- 参加リクエスト削除モーダル -->
          <v-dialog
            v-model="deleteDialog"
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5">
                参加リクエストID{{ application.id }}を削除しますか？
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
                  @click="applicationDelete(application)"
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
  name: 'AdminIApplicationsPage',
  layout: 'admin',
  async asyncData ({ $axios }) {
    const applications = await $axios.$get(
      '/api/v1/admin/applies'
    )

    return { applications }
  },
  data ({ $route }) {
    return {
      routeName: $route.name,
      editDialog: false,
      deleteDialog: false,
      editedIndex: -1,
      application: {
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
  computed: {
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  methods: {
    async update (application) {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$patch(
        `/api/v1/admin/applies/${application.id}`,
        this.application
      )
        .then(res => this.updateSuccessful(res))
        .catch(e => this.updateFailure(e))
    },
    updateSuccessful (res) {
      console.log(res)
      const msg = `参加リクエストID${res.id}を更新しました`
      const color = 'success'
      this.setToaster(msg, color)
      this.$store.dispatch('getBtnLoading', false)
      this.closeDialog()
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
    updateFailure ({ response }) {
      this.$store.dispatch('getBtnLoading', false)
      if (response && response.status === 400) {
        const msg = '参加リクエストの更新に失敗しました'
        return this.$store.dispatch('getToast', { msg })
      }
    },
    async applicationDelete (application) {
      this.$store.dispatch('getBtnLoading', false)

      await this.$axios.$delete(
        `/api/v1/admin/applies/${application.id}`
      )
        .then(res => this.deleteSuccessful(res))
    },
    deleteSuccessful (res) {
      console.log(res)
      const msg = `参加リクエストID${res.id}を削除しました`
      const color = 'success'
      this.setToaster(msg, color)
      this.$store.dispatch('getBtnLoading', false)
      this.closeDialog()
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
    setApplication (application) {
      this.editedIndex = this.applications.indexOf(application)
      this.application = Object.assign({}, application)
    },
    openEditDialog (application) {
      this.setApplication(application)
      this.editDialog = true
    },
    openDeleteDialog (application) {
      this.setApplication(application)
      this.deleteDialog = true
    },
    closeDialog () {
      this.newDialog = false
      this.editDialog = false
      this.deleteDialog = false
    },
    saveDate (date) {
      this.$refs.menu.save(date)
    },
    setToaster (msg, color) {
      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
