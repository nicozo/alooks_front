<template>
  <validation-provider
    v-slot="{ errors }"
    name="メールアドレス"
    rules="required|email"
  >
    <v-text-field
      id="email"
      :value="email"
      label="メールアドレス"
      placeholder="your@example.com"
      :error-messages="errors"
      outlined
      clearable
      required
      @input="$emit('update:email', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'UserFormEmail',
  props: {
    email: {
      type: String,
      default: ''
    }
  }
}
</script>
