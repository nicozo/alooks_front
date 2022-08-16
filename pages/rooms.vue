<template>
  <div>
    <NuxtChild />
  </div>
</template>

<script>
export default {
  name: 'RoomsDefaultPage',
  layout: 'loggedIn',
  middleware: [
    'my-applications'
  ]
}
</script>
