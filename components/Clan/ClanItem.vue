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

    <clan-edit-and-delete-button
      :id="clan.id"
      :user-id="clan.user_id"
      @child-delete-method="childDeleteMethod"
    />
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
      joining_process: {
        type: String,
        required: true
      },
      prohibited_matters: {
        type: String,
        required: true
      },
      user_id: {
        type: Number,
        required: true
      }
    }
  },
  methods: {
    childDeleteMethod (clanId) {
      this.$emit('child-delete-method', clanId)
    }
  }
}
</script>
