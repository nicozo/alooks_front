<template>
  <v-row>
    <v-col>
      <validation-provider
        v-slot="{ errors }"
        name="パスワード（確認）"
        rules="required|confirmed:password"
      >
        <v-text-field
          :value="password_confirmation"
          @input="$emit('update:password_confirmation', $event)"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="パスワード（確認）"
          placeholder="パスワードを再入力"
          :error-messages="errors"
          outlined
          clearable
          required
          @click:append="showPassword = !showPassword"
        >
        </v-text-field>
      </validation-provider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'UserFormPasswordConfirmation',
  props: {
    password_confirmation: {
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
