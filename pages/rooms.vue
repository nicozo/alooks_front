<template>
  <div>
    <v-container
      fluid
      fill-height
    >
      <v-row
        justify="center"
        align-content="center"
      >
        <v-col
          v-for="(room, i) in rooms"
          :key="i"
          cols="4"
        >
          <v-card
            :id="room.id"
            class="mx-auto"
            max-width="600"
            hover
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="text-h5 mb-1"
                >
                  {{ room.title }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar
                size="60"
                color="grey"
                round
              >
              </v-list-item-avatar>
            </v-list-item>

            <v-card-text>
              プラットフォーム：{{ room.target_platform }}
            </v-card-text>
            <v-card-text>
              ゲームモード：{{ room.target_game_mode }}
            </v-card-text>
            <v-card-text>
              ランク帯：{{ room.target_rank_rate }}
            </v-card-text>
            <v-card-text>
              締め切り：{{ room.application_deadline }}
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="success"
                elevation="4"
              >
                参加する
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <app-footer />
  </div>
</template>

<script>
export default {
  name: 'RoomsPage',
  layout: 'room',
  data () {
    return {
      rooms: [
        {
          id: 1,
          title: '楽しくダイアランク',
          target_platform: 'PS4',
          target_game_mode: 'ランク',
          current_squad_member: 2,
          target_rank_rate: 'ダイアモンド',
          is_draft: false,
          application_deadline: '24:30',
          user_id: 1
        },
        {
          id: 2,
          title: 'キルムーブ！',
          target_platform: 'PS5',
          target_game_mode: 'カジュアル',
          current_squad_member: 1,
          target_rank_rate: 'なし',
          is_draft: false,
          application_deadline: '24:30',
          user_id: 1
        },
        {
          id: 3,
          title: 'プレデターランク！',
          target_platform: 'Steam',
          target_game_mode: 'ランク',
          current_squad_member: 1,
          target_rank_rate: 'プレデター',
          is_draft: false,
          application_deadline: '24:30',
          user_id: 1
        },
        {
          id: 4,
          title: '楽しくダイアランク',
          target_platform: 'PS4',
          target_game_mode: 'ランク',
          current_squad_member: 2,
          target_rank_rate: 'ダイアモンド',
          is_draft: false,
          application_deadline: '24:30',
          user_id: 1
        }
      ]
    }
  }
}
</script>
