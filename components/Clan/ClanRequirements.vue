<template>
  <v-card
    id="clan-requirements"
    flat
  >
    <v-card-title>
      募集要項
    </v-card-title>

    <v-divider />

    <v-card-text>
      プラットフォーム：
      <v-chip
        color="indigo darken-4"
        dark
        outlined
      >
        {{ $t(`clan.platform.${requirements.platform}`) }}
      </v-chip>
    </v-card-text>

    <v-card-text>
      年齢：
      <v-chip
        color="indigo darken-4"
        dark
        outlined
      >
        {{ $t(`clan.age.${requirements.age}`) }}
      </v-chip>
    </v-card-text>

    <v-card-text>
      ログイン回数：
      <v-chip
        color="indigo darken-4"
        dark
        outlined
      >
        {{ $t(`clan.required_login.${requirements.required_login}`) }}
      </v-chip>
    </v-card-text>

    <v-card-text>
      最高ランク：
      <v-chip
        color="indigo darken-4"
        dark
        outlined
      >
        {{ $t(`clan.required_ranked.${requirements.required_ranked}`) }}
      </v-chip>
    </v-card-text>

    <v-card-text>
      VCの有無：
      <v-chip
        color="indigo darken-4"
        dark
        outlined
      >
        {{ $t(`clan.required_vc.${requirements.required_vc}`) }}
      </v-chip>
    </v-card-text>

    <v-card-text>
      求める人物像：
      <v-chip
        color="indigo darken-4"
        dark
        outlined
      >
        {{ requirements.personality }}
      </v-chip>
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
