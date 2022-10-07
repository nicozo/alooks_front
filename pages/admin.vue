<template>
  <v-main>
    <app-toaster />

    <NuxtChild />
  </v-main>
</template>

<script>
export default {
  layout: 'admin',
  name: 'AdminDefaultPage'
}
</script>
