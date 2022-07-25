<template>
  <v-radio-group
    id="search-game-mode"
    hide-details
    class="mt-2"
    dense
    row
    @change="$emit('update:gameMode', $event)"
  >
    <v-radio
      v-for="gameMode in gameModes"
      :key="gameMode"
      :label="gameMode"
      :value="gameMode"
    />
  </v-radio-group>
</template>

<script>
export default {
  name: 'RoomFormSearchGameMode',
  props: {
    gameMode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      gameModes: [
        'カジュアル',
        'ランク',
        'アリーナ',
        'イベント'
      ]
    }
  }
}
</script>
