<template>
  <v-main>
    <app-toaster />

    <NuxtChild />
  </v-main>
</template>

<script>
export default {
  name: 'AdminDefaultPage',
  layout: 'admin',
  middleware: ['authentication']
}
</script>
