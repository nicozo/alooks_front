<template>
  <div v-show="playerIsOwn()">
    <v-card-actions>
      <v-row dense>
        <v-col cols="12">
          <v-btn
            color="success"
            block
            nuxt
            :to="{ name: 'players-id-update', params: { id: id } }"
          >
            {{ $t('btn.player_edit') }}
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
                {{ $t('btn.player_destroy') }}
              </v-btn>
            </template>

            <v-card>
              <v-container>
                <v-card-title>
                  <span class="text-h5">
                    {{ $t('message.confirm_delete') }}
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
    userId: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      default: null,
      require: true
    }
  },
  data () {
    return {
      dialog: false,
      redirectPath: this.$store.state.loggedIn.clansPath
    }
  },
  computed: {
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  methods: {
    playerIsOwn () {
      return this.$auth.user.id === this.userId
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
