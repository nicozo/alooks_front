<template>
  <v-card
    id="clan-information"
    flat
  >
    <v-card-title>
      クラン情報
    </v-card-title>

    <v-divider />

    <v-card-subtitle class="font-weight-bold">
      -在籍人数-
    </v-card-subtitle>
    <v-card-text>
      {{ information.enrollment }}
    </v-card-text>

    <v-card-subtitle class="font-weight-bold">
      -年齢層-
    </v-card-subtitle>
    <v-card-text>
      {{ information.enrollment_age }}
    </v-card-text>

    <v-card-subtitle class="font-weight-bold">
      -活動時間-
    </v-card-subtitle>
    <v-card-text>
      {{ information.activity_time }}
    </v-card-text>

    <v-card-subtitle class="font-weight-bold">
      -スナイプや大会等-
    </v-card-subtitle>
    <v-card-text>
      {{ information.snipe }}
    </v-card-text>

    <v-card-subtitle class="font-weight-bold">
      -クラン内の連絡手段-
    </v-card-subtitle>
    <v-card-text>
      {{ information.contact_means }}
      <br>

      <v-icon
        v-show="isIncludes(['discord', 'DISCORD', 'Discord', 'ディスコード'], information.contact_means)"
        large
        color="indigo"
      >
        mdi-discord
      </v-icon>

      <v-icon
        v-show="isIncludes(['twitter', 'TWITTER', 'Twitter', 'ツイッター'], information.contact_means)"
        large
        color="blue"
      >
        mdi-twitter
      </v-icon>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ClanInformation',
  props: {
    information: {
      type: Object,
      default: () => {},
      require: true,
      enrollment: {
        type: String,
        require: true
      },
      enrollment_age: {
        type: String,
        require: true
      },
      activity_time: {
        type: String,
        require: true
      },
      snipe: {
        type: String,
        require: true
      },
      contact_means: {
        type: String,
        require: true
      }
    }
  },
  methods: {
    isIncludes (arr, target) {
      return arr.some(el => target.includes(el))
    }
  }
}
</script>
