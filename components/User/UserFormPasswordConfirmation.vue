<template>
  <v-row>
    <v-col>
      <validation-provider
        v-slot="{ errors }"
        name="パスワード（確認）"
        rules="required|confirmed:password"
      >
        <v-text-field
          :value="passwordConfirmation"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="パスワード（確認）"
          placeholder="パスワードを再入力"
          :error-messages="errors"
          outlined
          clearable
          required
          @input="$emit('update:passwordConfirmation', $event)"
          @click:append="showPassword = !showPassword"
        />
      </validation-provider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'UserFormPasswordConfirmation',
  props: {
    passwordConfirmation: {
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
