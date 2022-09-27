<template>
  <validation-provider
    v-slot="{ errors }"
    name="禁止事項"
    rules="required|max:100"
  >
    <v-textarea
      id="prohibited_matters"
      :value="prohibitedMatters"
      label="禁止事項"
      counter="100"
      hint="禁止事項を記載しよう"
      :error-messages="errors"
      outlined
      clearable
      required
      @input="$emit('update:prohibitedMatters', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormProhibitedMatters',
  props: {
    prohibitedMatters: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
