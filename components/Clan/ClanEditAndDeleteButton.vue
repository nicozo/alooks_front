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
            {{ $t('btn.clan-edit') }}
          </v-btn>
        </v-col>

        <v-col cols="12">
          <v-btn
            color="error"
            block
            @click="deleteClan"
          >
            {{ $t('btn.clan-destroy') }}
          </v-btn>
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
      redirectPath: this.$store.state.loggedIn.clansPath
    }
  },
  methods: {
    clanIsOwn () {
      return this.$auth.user.id === this.user_id
    },
    async deleteClan () {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$delete(
        `api/v1/clans/${this.id}`
      )
        .then(res => this.deleteSuccessful(res))
    },
    deleteSuccessful (res) {
      this.$store.dispatch('getBtnLoading', false)
      this.setToaster()
      this.$store.dispatch('clans/deleteClan', res)
      this.$router.push(this.redirectPath)
    },
    setToaster () {
      const msg = 'クランを削除しました'
      const color = 'success'

      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
