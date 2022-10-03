<template>
  <v-card id="clan-details">
    <v-container>
      <v-card-title class="font-weight-bold text-h5">
        {{ clan.name }}
      </v-card-title>

      <!-- コンセプト -->
      <v-card
        id="clan-concept"
        flat
      >
        <v-card-title>
          {{ $t('clan.concept') }}
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
        id="clan-joining_process"
        flat
      >
        <v-card-title>
          {{ $t('clan.joining_process') }}
        </v-card-title>

        <v-divider />

        <v-card-text class="br pt-0">
          {{ clan.joining_process }}
        </v-card-text>
      </v-card>

      <!-- 禁止事項 -->
      <v-card
        id="clan-prohibited_matters"
        flat
      >
        <v-card-title>
          {{ $t('clan.prohibited_matters') }}
        </v-card-title>

        <v-divider />

        <v-card-text class="br pt-0">
          {{ clan.prohibited_matters }}
        </v-card-text>
      </v-card>

      <clan-edit-and-delete-button
        :id="clan.id"
        :user_id="clan.user_id"
      />
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

<style scoped>
  .br{
    white-space: pre-line;
  }
</style>
