<template>
  <v-row>
    <v-col>
      <validation-provider
        v-slot="{ errors }"
        name="ユーザー名"
        rules="required|max:30"
      >
        <v-text-field
          :value="name"
          label="ユーザー名"
          placeholder="あなたのユーザー名"
          counter="30"
          :error-messages="errors"
          outlined
          clearable
          required
          @input="$emit('update:name', $event)"
        />
      </validation-provider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'UserFormName',
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>
