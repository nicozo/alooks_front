<template>
  <v-card
    :id="`clan-${clan.id}`"
    rounded-xl
    hover
    raised
    nuxt
    :to="{ name: 'clans-id', params: { id: clan.id } }"
  >
    <v-container>
      <v-card-title class="font-weight-bold">
        {{ clan.name }}
      </v-card-title>

      <v-divider />

      <v-card-text>
        {{ clan.concept }}
      </v-card-text>
    </v-container>
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
      }
    }
  }
}
</script>
