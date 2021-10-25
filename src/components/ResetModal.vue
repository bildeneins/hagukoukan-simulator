<template>
  <v-dialog
      value="true"
      persistent
      max-width="600"
  >
    <v-card>
      <v-card-title />
      <v-card-text style="padding-bottom: unset; padding-top: 20px">
        <v-container fill-height>
          <v-row>
            <v-col
              align="center"
            >
              <h1
                  style="color:black"
              >
                設備をリセットしますか？
              </h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" />
            <v-col cols="3">
            <v-btn
                color="secondary"
                block
                tile
                x-large
                @click="clickedModalCancelBtn"
            >
              キャンセル
            </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                  color="primary"
                  block
                  tile
                  x-large
                  @click="clickedModalOKBtn"
              >
                OK
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ResetModal",
  methods: {
    clickedModalCancelBtn() {
      this.$emit('clickedModalCancelBtn')
    },
    clickedModalOKBtn() {
      this.$emit('clickedModalOKBtn')
    }
  }
}
</script>

<style scoped>

</style>