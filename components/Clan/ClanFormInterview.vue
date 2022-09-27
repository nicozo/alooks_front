<template>
  <validation-provider
    v-slot="{ errors }"
    name="面接について"
    rules="required|max:100"
  >
    <v-textarea
      id="interview"
      :value="interview"
      label="面接について"
      counter="100"
      :error-messages="errors"
      outlined
      clearable
      required
      @input="$emit('update:interview', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormInterview',
  props: {
    interview: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
