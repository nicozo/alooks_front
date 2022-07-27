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
        { label: '15分間', minutes: 15 },
        { label: '30分間', minutes: 30 },
        { label: '45分間', minutes: 45 }
      ]
    }
  }
}
</script>
