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
      item-text="label"
      item-value="data"
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
        { label: 'カジュアル', data: 'casual' },
        { label: 'ランク', data: 'ranked' },
        { label: 'アリーナ', data: 'arena' },
        { label: 'イベント', data: 'event' }
      ]
    }
  }
}
</script>
