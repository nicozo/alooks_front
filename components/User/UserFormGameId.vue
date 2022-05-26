<template>
  <v-row>
    <v-col>
      <validation-provider
        v-slot="{ errors }"
        name="ゲームID"
        rules="required"
      >
        <v-text-field
          :value="gameId"
          label="ゲームID"
          placeholder="abcdefg11"
          :error-messages="errors"
          outlined
          clearable
          required
          @input="$emit('update:gameId', $event)"
        />
      </validation-provider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'UserFormGameId',
  props: {
    gameId: {
      type: String,
      default: ''
    }
  }
}
</script>
