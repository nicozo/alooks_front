<template>
  <v-card
    flat
    id="user-profile"
  >
    <v-list-item>
      <div v-if="authUser.avatar_url">
        <v-list-item-avatar size="100">
          <v-img :src="authUser.avatar_url" />
        </v-list-item-avatar>
      </div>
      <div v-else>
        <v-list-item-avatar size="100">
          <v-img :src="defaultAvatarSrc" />
        </v-list-item-avatar>
      </div>

      <v-list-item-content>
        <v-list-item-title class="text-h4 text-left">
          {{ authUser.name }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-left">
          {{ authUser.self_introduction }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="text-left">
          {{ userAge }}歳
        </v-list-item-subtitle>
        <v-list-item-subtitle class="text-left">
          {{ authUser.sex }}
        </v-list-item-subtitle>
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
  }
}
</script>
