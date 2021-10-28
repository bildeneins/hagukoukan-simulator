<template>
  <v-dialog
      :value="show"
      persistent
      max-width="600"
  >
    <v-card>
      <v-card-title>
        設備カウントをリセットし、現在時刻を元に作業時間を設定します。
      </v-card-title>
      <v-card-text style="padding-bottom: unset; padding-top: 20px">
        <div>
          1直 開始時間: {{settings.terms[0].start}} 終了時間: {{settings.terms[0].finish}}
        </div>
        <div>
          2直 開始時間: {{settings.terms[1].start}} 終了時間: {{settings.terms[1].finish}}
        </div>
        <div>
          休憩1 開始時間: {{settings.restTimes[0].start}} 終了時間: {{settings.restTimes[0].finish}}
        </div>
        <div>
          休憩2 開始時間: {{settings.restTimes[1].start}} 終了時間: {{settings.restTimes[1].finish}}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
            color="primary"
            @click="clickedModalOKBtn"
        >
          OK
        </v-btn>
        <v-btn
            color="secondary"
            @click="clickedModalCancelBtn"
        >
          キャンセル
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ResetModal",
  props: {
    show: {
      type: Boolean,
      require: true
    },
    settings: {
      type: Object,
      require: true
    }
  },
  methods: {
    clickedModalCancelBtn() {
      this.$emit('cancel')
    },
    clickedModalOKBtn() {
      this.$emit('ok')
    }
  }
}
</script>

<style scoped>

