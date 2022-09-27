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
            クランを編集
          </v-btn>
        </v-col>

        <v-col cols="12">
          <v-btn
            color="error"
            block
          >
            クランを削除
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
  methods: {
    clanIsOwn () {
      return this.$auth.user.id === this.user_id
    }
  }
}
</script>
