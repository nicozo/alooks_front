<template>
  <v-card
    id="user-profile"
    flat
  >
    <v-list-item>
      <div v-if="authUser.avatar_url">
        <v-list-item-avatar :size="breakPointAvatarSize">
          <v-img :src="authUser.avatar_url" />
        </v-list-item-avatar>
      </div>
      <div v-else>
        <v-list-item-avatar :size="breakPointAvatarSize">
          <v-img :src="defaultAvatarSrc" />
        </v-list-item-avatar>
      </div>

      <v-list-item-content>
        <v-list-item-title class="text-h4 text-left mb-3">
          {{ authUser.name }}
        </v-list-item-title>

        <v-list-item-title class="text-left introduction mb-3">
          {{ authUser.self_introduction }}
        </v-list-item-title>

        <div v-show="userAge">
          <v-list-item-title class="text-left">
            {{ userAge }}歳 {{ $t(`gender.${authUser.sex}`) }}
          </v-list-item-title>
        </div>
        <div v-show="!userAge">
          <v-list-item-title class="text-left">
            年齢{{ $t('Unregistered') }} {{ $t(`gender.${authUser.sex}`) }}
          </v-list-item-title>
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: 'ProfileUserDetails',
  props: {
    authUser: {
      type: Object,
      default: () => {},
      require: true,
      name: {
        type: String,
        default: ''
      },
      self_introduction: {
        type: String,
        default: ''
      },
      date_of_birth: {
        type: String,
        default: ''
      },
      sex: {
        type: String,
        default: ''
      },
      avatar_url: {
        type: String,
        default: ''
      }
    },
    userAge: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      defaultAvatarSrc: require('@/static/DefaultAvatar.png')
    }
  },
  computed: {
    breakPointAvatarSize () {
      return this.$vuetify.breakpoint.xs ? 120 : 170
    }
  }
}
</script>

<style scoped>
  .introduction {
    white-space: normal;
  }
</style>
