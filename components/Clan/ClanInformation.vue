<template>
  <v-card
    id="clan-information"
    flat
  >
    <v-card-title>
      クラン情報
    </v-card-title>

    <v-divider />

    <v-card-text>
      在籍人数：
      <v-chip
        color="indigo darken-4"
        dark
        outlined
      >
        {{ information.enrollment }}
      </v-chip>
    </v-card-text>

    <v-card-text>
      年齢層：
      <v-chip
        color="indigo darken-4"
        dark
        outlined
      >
        {{ information.enrollment_age }}
      </v-chip>
    </v-card-text>

    <v-card-text>
      活動時間：
      <v-chip
        color="indigo darken-4"
        dark
        outlined
      >
        {{ information.activity_time }}
      </v-chip>
    </v-card-text>

    <v-card-text>
      スナイプや大会等
      <v-chip
        color="indigo darken-4"
        dark
        outlined
      >
        {{ information.snipe }}
      </v-chip>
    </v-card-text>

    <v-card-text>
      クラン内の連絡手段：
      <v-chip
        color="indigo darken-4"
        dark
        outlined
      >
        {{ information.contact_means }}
      </v-chip>
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
        type: Boolean,
        require: true
      }
    }
  }
}
</script>
