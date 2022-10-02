<template>
  <validation-provider
    v-slot="{ errors }"
    name="パスワード"
    rules="required|min:3"
    vid="password"
  >
    <v-text-field
      id="password"
      :value="password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      label="パスワード"
      placeholder="3文字以上"
      :error-messages="errors"
      outlined
      clearable
      required
      @input="$emit('update:password', $event)"
      @click:append="showPassword = !showPassword"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'UserFormPassword',
  props: {
    password: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showPassword: false
    }
  }
}
</script>
