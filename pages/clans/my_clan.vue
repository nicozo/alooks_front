<template>
  <v-container>
    <v-row dense>
      <v-col>
        <clan-back-previous-button />
      </v-col>
    </v-row>

    <template v-if="my_clan">
      <v-row>
        <v-col cols="12">
          <clan-details :clan="my_clan" />
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <v-row
        justify="center"
        align="center"
      >
        <v-col>
          <v-card
            flat
            class="text-center"
          >
            <v-container>
              <v-card-text>
                作成した募集中のクランはありません。
              </v-card-text>

              <v-card-actions>
                <v-btn
                  block
                  color="success"
                  nuxt
                  :to="{ name: 'clans-create' }"
                >
                  {{ $t('btn.clan_create') }}
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
export default {
  name: 'MyClanPage',
  middleware: [
    'authentication',
    'my-clan'
  ],
  data () {
    return {
      my_clan: this.$store.getters['clans/myClan']
    }
  }
}
</script>
