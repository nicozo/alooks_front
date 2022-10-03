<template>
  <validation-provider
    v-slot="{ errors }"
    name="募集期間"
    rules="required"
  >
    <v-select
      id="application_deadline"
      :items="applicationDeadlines"
      item-text="label"
      item-value="minutes"
      label="募集期間"
      :error-messages="errors"
      outlined
      required
      @input="$emit('update:applicationDeadline', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'RoomFormApplicationDeadline',
  props: {
    applicationDeadline: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      applicationDeadlines: [
        { label: '1時間', minutes: 60 },
        { label: '2時間', minutes: 120 },
        { label: '3時間', minutes: 180 },
        { label: '4時間', minutes: 240 },
        { label: '5時間', minutes: 300 },
        { label: '6時間', minutes: 360 }
      ]
    }
  }
}
</script>
