<template>
  <v-card
    :id="`clan-${clan.id}`"
    rounded-xl
    hover
    raised
  >
    <v-card
      flat
      nuxt
      :to="`clans/${clan.id}`"
    >
      <v-container>
        <v-card-title>
          {{ clan.name }}
        </v-card-title>

        <v-divider />

        <v-card-subtitle>
          クラン活動の目標
        </v-card-subtitle>

        <v-card-text>
          {{ clan.concept }}
        </v-card-text>
      </v-container>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: 'ClanItem',
  props: {
    clan: {
      type: Object,
      default: () => {},
      required: true,
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      concept: {
        type: String,
        required: true
      },
      interview: {
        type: String,
        required: true
      },
      prohibited_matters: {
        type: String,
        required: true
      },
      enrollment: {
        type: String,
        required: true
      },
      activity_time: {
        type: String,
        required: true
      },
      enrollment_age: {
        type: String,
        required: true
      },
      snipe: {
        type: String,
        required: true
      },
      contact_means: {
        type: String,
        required: true
      },
      platform: {
        type: String,
        required: true
      },
      age: {
        type: String,
        required: true
      },
      required_login: {
        type: String,
        required: true
      },
      required_ranked: {
        type: String,
        required: true
      },
      required_vc: {
        type: Boolean,
        required: true
      },
      personality: {
        type: String,
        required: true
      },
      host: {
        type: Object,
        default: () => {},
        required: true
      }
    }
  }
}
</script>
