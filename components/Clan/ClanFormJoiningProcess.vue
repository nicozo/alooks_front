<template>
  <validation-provider
    v-slot="{ errors }"
    name="入団までの流れ"
    rules="required|max:100"
  >
    <v-textarea
      id="joining_process"
      :value="joining_process"
      label="入団までの流れ"
      counter="100"
      :error-messages="errors"
      outlined
      clearable
      required
      @input="$emit('update:joining_process', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormJoiningProcess',
  props: {
    joining_process: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
