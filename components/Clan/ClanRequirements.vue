<template>
  <v-card
    id="clan-requirements"
    flat
  >
    <v-card-title>
      募集要項
    </v-card-title>

    <v-divider />

    <v-card-subtitle class="font-weight-bold">
      -プラットフォーム-
    </v-card-subtitle>
    <v-card-text>
      <v-icon
        v-show="requirements.platform === 'PlayStation'"
        large
        color="indigo"
      >
        mdi-sony-playstation
      </v-icon>
      <v-icon
        v-show="requirements.platform === 'Xbox'"
        large
        color="green"
      >
        mdi-microsoft-xbox
      </v-icon>
      <v-icon
        v-show="requirements.platform === 'PC'"
        large
        color="orange"
      >
        mdi-origin
      </v-icon>
      <v-icon
        v-show="requirements.platform === 'PC'"
        large
        color="light-blue darken-4"
      >
        mdi-steam
      </v-icon>
      {{ $t(`clan.platform.${requirements.platform}`) }}
    </v-card-text>

    <v-card-subtitle class="font-weight-bold">
      -年齢-
    </v-card-subtitle>
    <v-card-text>
      {{ $t(`clan.age.${requirements.age}`) }}
    </v-card-text>

    <v-card-subtitle class="font-weight-bold">
      -ログイン数-
    </v-card-subtitle>
    <v-card-text>
      {{ $t(`clan.required_login.${requirements.required_login}`) }}
    </v-card-text>

    <v-card-subtitle class="font-weight-bold">
      -最低ランク-
    </v-card-subtitle>
    <v-card-text>
      {{ $t(`clan.required_ranked.${requirements.required_ranked}`) }}
    </v-card-text>

    <v-card-subtitle class="font-weight-bold">
      -VCの有無-
    </v-card-subtitle>
    <v-card-text>
      {{ $t(`clan.required_vc.${requirements.required_vc}`) }}
    </v-card-text>

    <v-card-subtitle class="font-weight-bold">
      -求める人物像-
    </v-card-subtitle>
    <v-card-text>
      {{ requirements.personality }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ClanRequirements',
  props: {
    requirements: {
      type: Object,
      default: () => {},
      require: true,
      platform: {
        type: String,
        require: true
      },
      age: {
        type: String,
        require: true
      },
      required_login: {
        type: String,
        require: true
      },
      required_ranked: {
        type: String,
        require: true
      },
      required_vc: {
        type: Boolean,
        require: true
      },
      personality: {
        type: String,
        require: true
      }
    }
  }
}
</script>
