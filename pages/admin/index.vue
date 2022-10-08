<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="users"
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

          <!-- ユーザー作成モーダル -->
          <v-dialog
            v-model="newDialog"
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
                {{ $t('admin.user_create') }}
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">
                  {{ $t('admin.user_create') }}
                </span>
              </v-card-title>

              <validation-observer v-slot="{ invalid }">
                <v-container>
                  <v-row dense>
                    <v-col cols="12">
                      <user-form-name :name.sync="user.name" />
                    </v-col>

                    <v-col cols="12">
                      <user-form-email :email.sync="user.email" />
                    </v-col>

                    <v-col cols="12">
                      <user-form-password :password.sync="user.password" />
                    </v-col>

                    <v-col cols="12">
                      <user-form-password-confirmation :password-confirmation.sync="user.password_confirmation" />
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
                        @click="save"
                      >
                        {{ $t('btn.submit') }}
                      </v-btn>
                    </v-card-actions>
                  </v-row>
                </v-container>
              </validation-observer>
            </v-card>
          </v-dialog>

          <!-- ユーザー編集モーダル -->
          <v-dialog
            v-model="editDialog"
            max-width="500px"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">
                  {{ $t('admin.user_edit') }}
                </span>
              </v-card-title>

              <validation-observer v-slot="{ invalid }">
                <v-container>
                  <v-row dense>
                    <v-col cols="12">
                      <user-form-name :name.sync="user.name" />
                    </v-col>

                    <v-col cols="12">
                      <user-form-email :email.sync="user.email" />
                    </v-col>

                    <v-col cols="12">
                      <user-form-self-introduction :self-introduction.sync="user.self_introduction" />
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <user-form-date-of-birth :date-of-birth.sync="user.date_of_birth" />
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <user-form-game-id :game-id.sync="user.game_id" />
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <user-form-sex :sex.sync="user.sex" />
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <user-form-platform :platform.sync="user.platform" />
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
                        @click="update(user)"
                      >
                        {{ $t('btn.update') }}
                      </v-btn>
                    </v-card-actions>
                  </v-row>
                </v-container>
              </validation-observer>
            </v-card>
          </v-dialog>

          <!-- ユーザー削除モーダル -->
          <v-dialog
            v-model="deleteDialog"
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5">
                ユーザーを削除しますか？
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
                  @click="userDelete(user)"
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
  name: 'AdminIndexPage',
  layout: 'admin',
  async asyncData ({ $axios }) {
    const users = await $axios.$get(
      '/api/v1/admin/users'
    )

    return { users }
  },
  data ({ $route }) {
    return {
      routeName: $route.name,
      activePicker: null,
      menu: false,
      newDialog: false,
      editDialog: false,
      deleteDialog: false,
      editedIndex: -1,
      user: {
        name: '',
        email: '',
        self_introduction: '',
        game_id: '',
        sex: '',
        date_of_birth: '',
        password: '',
        password_confirmation: ''
      },
      number: 10,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'ユーザー名', value: 'name' },
        { text: 'メールアドレス', value: 'email' },
        { text: '自己紹介', value: 'self_introduction' },
        { text: '性別', value: 'sex' },
        { text: '生年月日', value: 'date_of_birth' },
        { text: 'ゲームID', value: 'game_id' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  methods: {
    async save () {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$post(
        '/api/v1/admin/users',
        this.user
      )
        .then(res => this.saveSuccessful(res))
        .catch(e => this.saveFailure(e))
    },
    saveSuccessful (res) {
      console.log(res)
      const msg = `ユーザーID${res.id}を作成しました`
      const color = 'success'
      this.setToaster(msg, color)
      this.$store.dispatch('getBtnLoading', false)
      this.closeDialog()
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
    saveFailure ({ response }) {
      this.$store.dispatch('getBtnLoading', false)
      if (response && response.status === 400) {
        const msg = 'ユーザーを作成できませんでした。既に使用されているメールアドレスです。'
        return this.$store.dispatch('getToast', { msg })
      }
    },
    async update (user) {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$patch(
        `/api/v1/admin/users/${user.id}`,
        this.user
      )
        .then(res => this.updateSuccessful(res))
        .catch(e => this.updateFailure(e))
    },
    updateSuccessful (res) {
      console.log(res)
      const msg = `ユーザーID${res.id}を更新しました`
      const color = 'success'
      this.setToaster(msg, color)
      this.$store.dispatch('getBtnLoading', false)
      this.closeDialog()
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
    updateFailure ({ response }) {
      this.$store.dispatch('getBtnLoading', false)
      if (response && response.status === 400) {
        const msg = 'ユーザーの更新に失敗しました'
        return this.$store.dispatch('getToast', { msg })
      }
    },
    async userDelete (user) {
      this.$store.dispatch('getBtnLoading', false)

      await this.$axios.$delete(
        `/api/v1/admin/users/${user.id}`
      )
        .then(res => this.deleteSuccessful(res))
    },
    deleteSuccessful (res) {
      console.log(res)
      const msg = `ユーザーID${res.id}を削除しました`
      const color = 'success'
      this.setToaster(msg, color)
      this.$store.dispatch('getBtnLoading', false)
      this.closeDialog()
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
    setUser (user) {
      this.editedIndex = this.users.indexOf(user)
      this.user = Object.assign({}, user)
    },
    openEditDialog (user) {
      this.setUser(user)
      this.editDialog = true
    },
    openDeleteDialog (user) {
      this.setUser(user)
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
