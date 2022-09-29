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
      :key="gameMode.label"
      :label="gameMode.label"
      :value="gameMode.data"
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
        { label: 'カジュアル', data: 'casual' },
        { label: 'ランク', data: 'ranked' },
        { label: 'アリーナ', data: 'arena' },
        { label: 'イベント', data: 'event' }
      ]
    }
  }
}
</script>
