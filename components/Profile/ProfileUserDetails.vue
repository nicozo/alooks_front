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
          <v-img :src="default_avatar_src" />
        </v-list-item-avatar>
      </div>

      <v-list-item-content>
        <v-list-item-title class="text-h4 text-left">
          {{ authUser.name }}
        </v-list-item-title>

        <v-list-item-title class="text-left br mb-3">
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

        <v-list-item-title class="text-left">
          <div v-show="authUser.kd">
            {{ $t('user.kd') }}:{{ authUser.kd }}
          </div>
          <div v-show="!authUser.kd">
            {{ $t('user.kd') }}:{{ $t('Unregistered') }}
          </div>
        </v-list-item-title>

        <v-list-item-title class="text-left">
          <div v-show="authUser.highest_damage">
            {{ $t('user.highest_damage') }}:{{ authUser.highest_damage }}
          </div>
          <div v-show="!authUser.highest_damage">
            {{ $t('user.highest_damage') }}:{{ $t('Unregistered') }}
          </div>
        </v-list-item-title>

        <v-list-item-title class="text-left">
          <div v-show="authUser.favorite_weapons">
            {{ $t('user.favorite_weapons') }}:{{ authUser.favorite_weapons }}
          </div>
          <div v-show="!authUser.favorite_weapons">
            {{ $t('user.favorite_weapons') }}:{{ $t('Unregistered') }}
          </div>
        </v-list-item-title>
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
      default_avatar_src: this.$store.getters.defaultAvatarSrc
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
  .br{
    white-space: pre-line;
  }
</style>
