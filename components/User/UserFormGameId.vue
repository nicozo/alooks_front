<template>
  <validation-provider
    v-slot="{ errors }"
    name="ゲームID"
    rules="required"
  >
    <v-text-field
      id="game_id"
      :value="gameId"
      label="ゲームID"
      placeholder="abcdefg11"
      :error-messages="errors"
      hint="Apex Legends内で使用しているIDを入力しよう"
      persistent-hint
      outlined
      clearable
      required
      @input="$emit('update:gameId', $event)"
    />
  </validation-provider>
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
