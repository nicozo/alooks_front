<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      v-for="(room, i) in recentRooms"
      :key="i"
      cols="12"
      sm="6"
      md="6"
      lg="4"
      xl="4"
    >
      <v-card>
        <v-container>
          <div class="text-right">
            <v-chip
              color="red"
              dark
            >
              あと{{ room.recruitment_number }}人募集
            </v-chip>
          </div>

          <v-card-title>
            {{ room.title }}
          </v-card-title>

          <v-divider />

          <v-layout justify-center>
            <template v-if="room.host.avatar_url">
              <v-avatar size="100" class="my-4">
                <img :src="room.host.avatar_url" alt="プロフィール画像です">
              </v-avatar>
            </template>
            <template v-else>
              <v-avatar size="100" class="my-4">
                <img :src="defaultAvatarSrc" alt="プロフィール画像です">
              </v-avatar>
            </template>
          </v-layout>

          <v-card-text>
            {{ $t('room.platform.title') }}：
            <v-chip
              color="indigo darken-3"
              dark
              outlined
            >
              {{ $t(`room.platform.${room.platform}`) }}
            </v-chip>
          </v-card-text>

          <v-card-text>
            {{ $t('room.game_mode.title') }}：
            <v-chip
              color="deep-orange darken-3"
              dark
              outlined
            >
              {{ $t(`room.game_mode.${room.game_mode}`) }}
            </v-chip>
          </v-card-text>

          <v-card-text>
            {{ $t('room.rank_tier.title') }}：
            <v-chip
              color="teal darken-3"
              dark
              outlined
            >
              {{ $t(`room.rank_tier.${room.rank_tier}`) }}
            </v-chip>
          </v-card-text>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HomeRooms',
  data () {
    return {
      recentRooms: []
    }
  },
  computed: {
    defaultAvatarSrc () {
      return this.$store.getters.defaultAvatarSrc
    }
  },
  created () {
    this.getRecentRooms()
  },
  methods: {
    async getRecentRooms () {
      console.log('loading recent rooms')

      await this.$axios.$get(
        'api/v1/rooms/recent'
      )
        .then(res => this.requestSuccessful(res))
        .catch(e => console.log(e))
    },
    requestSuccessful (res) {
      this.recentRooms = res
      console.log('recent rooms', this.recentRooms)
    }
  }
}
</script>
