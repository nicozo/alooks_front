<template>
  <v-bottom-navigation>
    <v-btn
      href="https://apexlegendsstatus.com/"
      target="blank"
    >
      {{ $t('home.bottom_navigation.tracker_site') }}
    </v-btn>

    <v-btn
      href="https://twitter.com/ApexLooks"
      target="blank"
    >
      {{ $t('home.bottom_navigation.administration') }}
    </v-btn>

    <v-btn
      href="https://twitter.com/ApexLooks"
    >
      {{ $t('home.bottom_navigation.tos') }}
    </v-btn>

    <v-btn
      href="https://twitter.com/ApexLooks"
    >
      {{ $t('home.bottom_navigation.privacy_policy') }}
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'HomeBottomNavigation'
}
</script>
