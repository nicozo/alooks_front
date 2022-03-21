<template>
  <v-row>
    <v-col>
      <validation-provider
        v-slot="{ errors }"
        name="パスワード"
        rules="required|min:3"
        vid="password"
      >
        <v-text-field
          :value="password"
          @input="$emit('update:password', $event)"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="パスワード"
          placeholder="3文字以上"
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
