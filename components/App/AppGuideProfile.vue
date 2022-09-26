<template>
  <v-dialog
    v-model="profileDialog"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-container>
        <v-card-title class="justify-center">
          <span class="text-h5">
            まずはプロフィールを完成させよう！
          </span>
        </v-card-title>

        <v-card-actions class="justify-center">
          <v-btn
            color="success"
            nuxt
            :to="{ name: 'profile' }"
          >
            プロフィールへ
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AppGuideProfile',
  props: {
    profileDialog: {
      type: Boolean,
      required: true
    }
  }
}
</script>
