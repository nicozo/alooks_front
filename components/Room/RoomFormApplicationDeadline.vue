<template>
  <validation-provider
    v-slot="{ errors }"
    name="募集期間"
    rules="required"
  >
    <v-select
      :items="applicationDeadlines"
      :value="applicationDeadline"
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
  name: 'RoomFormGameMode',
  props: {
    applicationDeadline: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      applicationDeadlines: [
        '15分間',
        '30分間',
        '45分間'
      ]
    }
  }
}
</script>
