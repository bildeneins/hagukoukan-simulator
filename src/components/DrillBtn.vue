<template>
  <v-container>
    <v-row v-if="isStartBtnView">
      <v-col>
        <v-btn @click="clickStart">
          {{'開始'}}
        </v-btn>
      </v-col>
      <v-col>
        <v-btn  @click="clickReset">
          {{'リセット'}}
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="!(isStartBtnView)">
      <v-col>
        <v-btn
          @click="clickStop"
        >
          {{'停止'}}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DrillBtn",
  data(){
    return {
      isStartBtnView: true
    }
  },
  methods: {
    clickStart(){
      this.isStartBtnView  = false
      this.$emit("clickedStartBtn")
    },
    clickReset(){
      this.$emit("clickedResetBtn")
    },
    clickStop(){
      this.isStartBtnView = true
      this.$emit("clickedStopBtn")
    },

  }
}
</script>

<style scoped>

</style>