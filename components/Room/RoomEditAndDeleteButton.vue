<template>
  <v-row dense>
    <v-col cols="12">
      <v-btn
        color="success"
        block
        nuxt
        :disabled="invalid"
        :to="{ name: 'rooms-id-update', params: { id: id } }"
      >
        {{ $t('btn.room_edit') }}
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
          :disabled="invalid"
        >
          {{ $t('btn.room_destroy') }}
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
</template>

<script>
export default {
  name: 'RoomEditAndDeleteButton',
  props: {
    id: {
      type: Number,
      required: true
    },
    invalid: {
      type: Boolean,
      default: false,
      require: true
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  methods: {
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
