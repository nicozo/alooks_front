<template>
  <validation-provider
    v-slot="{ errors }"
    name="ゲームモード"
    rules="required"
  >
    <v-select
      id="game_mode"
      :items="gameModes"
      :value="gameMode"
      label="ゲームモード"
      :error-messages="errors"
      outlined
      required
      @input="$emit('update:gameMode', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'RoomFormGameMode',
  props: {
    gameMode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      gameModes: [
        'ランク',
        'カジュアル',
        'アリーナ',
        'コントロール'
      ]
    }
  }
}
</script>
