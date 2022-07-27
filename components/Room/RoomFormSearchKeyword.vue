<template>
  <v-row dense>
    <v-col>
      <v-text-field
        id="search-keyword"
        :value="keyword"
        hide-details
        rounded
        outlined
        dense
        placeholder="スクワッドを検索"
        prepend-inner-icon="mdi-magnify"
        type="search"
        @input="$emit('update:keyword', $event)"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'RoomFormSearchKeyword',
  props: {
    keyword: {
      type: String,
      default: ''
    }
  }
}
</script>
