<template>
  <v-card
    :id="`player-${player.id}`"
    rounded-xl
    hover
    raised
  >
    <v-card
      flat
      nuxt
      :to="{ name: 'players-id', params: { id: player.id } }"
    >
      <v-container>
        <v-list-item>
          <template v-if="player.host.avatar_url">
            <v-list-item-avatar>
              <v-img :src="player.host.avatar_url" alt="プロフィール画像です" />
            </v-list-item-avatar>
          </template>

          <template v-else>
            <v-list-item-avatar>
              <v-img :src="defaultAvatarSrc" alt="プロフィール画像です" />
            </v-list-item-avatar>
          </template>

          <v-card-text>
            {{ player.body }}
          </v-card-text>
        </v-list-item>
      </v-container>
    </v-card>

    <player-edit-and-delete-button
      :id="player.id"
      :user-id="player.user_id"
      @child-delete-method="childDeleteMethod"
    />
  </v-card>
</template>

<script>
export default {
  name: 'PlayerItem',
  props: {
    player: {
      type: Object,
      default: () => {},
      required: true,
      id: {
        type: Number,
        required: true
      },
      body: {
        type: String,
        required: true
      },
      user_id: {
        type: Number,
        required: true
      }
    }
  },
  data () {
    return {
      defaultAvatarSrc: this.$store.getters.defaultAvatarSrc
    }
  },
  methods: {
    childDeleteMethod (playerId) {
      this.$emit('child-delete-method', playerId)
    }
  }
}
</script>
