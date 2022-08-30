<template>
  <v-row
    justify="center"
    align-content="center"
  >
    <v-col>
      <v-card
        flat
        class="text-center"
      >
        <v-container>
          <p>
            {{ $t('message.loading_stats') }}
          </p>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AppLoading'
}
</script>
