<template>
  <v-row>
    <v-col>
      <validation-provider
        v-slot="{ errors }"
        name="メールアドレス"
        rules="required|email"
      >
        <v-text-field
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
    </v-col>
  </v-row>
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
