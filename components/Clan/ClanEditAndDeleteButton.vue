<template>
  <div v-show="clanIsOwn()">
    <v-card-actions>
      <v-row dense>
        <v-col cols="12">
          <v-btn
            color="success"
            block
            nuxt
            :to="{ name: 'clans-id-update', params: { id: id } }"
          >
            {{ $t('btn.clan_edit') }}
          </v-btn>
        </v-col>

        <v-col cols="12">
          <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
          >
          <template #activator="{ on, attrs }">
            <v-btn
              color="error"
              block
              v-bind="attrs"
              v-on="on"
            >
              {{ $t('btn.clan_destroy') }}
            </v-btn>
          </template>

          <v-card>
            <v-container>
              <v-card-title>
                <span class="text-h5">
                  削除しますか？
                </span>
              </v-card-title>

              <v-card-actions>
                <v-spacer />

                <v-btn
                  color="red darken-1"
                  text
                  @click="closeDialog"
                >
                  {{ $t('btn.cancel') }}
                </v-btn>

                <v-btn
                  color="blue darken-1"
                  text
                  :loading="btnLoading"
                  @click="handleDelete"
                >
                  {{ $t('btn.delete') }}
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: 'ClanEditAndDeleteButton',
  props: {
    user_id: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      dialog: false,
      redirectPath: this.$store.state.loggedIn.clansPath
    }
  },
  methods: {
    clanIsOwn () {
      return this.$auth.user.id === this.user_id
    },
    handleDelete () {
      this.$emit('child-delete-method', this.id)
      this.closeDialog()
    },
    closeDialog () {
      this.dialog = false
    }
  }
}
</script>
