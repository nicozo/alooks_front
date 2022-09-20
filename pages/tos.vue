<template>
  <v-container fluid>
    <app-back-home-button />

    <v-row
      id="tos"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        class="my-8 text-center"
      >
        <h1>
          {{ pageTitle }}
        </h1>
      </v-col>

      <v-card
        flat
        width="80%"
        max-width="800"
      >
        <!-- Todo 利用規約分を追加 -->
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TosPage'
}
</script>
