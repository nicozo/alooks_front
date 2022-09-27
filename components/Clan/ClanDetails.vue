<template>
  <v-card id="clan-details">
    <v-container>
      <v-card-title class="font-weight-bold">
        {{ clan.name }}
      </v-card-title>

      <!-- コンセプト -->
      <v-card
        id="clan-concept"
        flat
      >
        <v-card-title>
          コンセプト
        </v-card-title>

        <v-divider />

        <v-card-text>
          {{ clan.concept }}
        </v-card-text>
      </v-card>

      <v-row dense>
        <!-- 募集要項 -->
        <v-col
          cols="12"
          sm="6"
          md="6"
          lg="6"
        >
          <clan-requirements :requirements="clan.requirements" />
        </v-col>

        <!-- クラン情報 -->
        <v-col
          cols="12"
          sm="6"
          md="6"
          lg="6"
        >
          <clan-information :information="clan.information" />
        </v-col>
      </v-row>

      <!-- 面接情報 -->
      <v-card
        id="clan-interview"
        flat
      >
        <v-card-title>
          面接について
        </v-card-title>

        <v-divider />

        <v-card-text>
          {{ clan.interview }}
        </v-card-text>
      </v-card>

      <!-- 禁止事項 -->
      <v-card
        id="clan-prohibited_matters"
        flat
      >
        <v-card-title>
          禁止事項
        </v-card-title>

        <v-divider />

        <v-card-text>
          {{ clan.prohibited_matters }}
        </v-card-text>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'ClanDetails',
  props: {
    clan: {
      type: Object,
      require: true,
      default: () => {}
    }
  }
}
</script>
