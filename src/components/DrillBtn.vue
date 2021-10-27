<template>
  <v-container>
    <v-row v-if="!running">
      <v-col>
        <v-btn @click="onClickStart">
          開始
        </v-btn>
      </v-col>
      <v-col>
        <v-btn @click="onClickReset">
          リセット
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="running">
      <v-col>
        <v-btn @click="onClickStop">
          停止
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DrillBtn",
  props: {
    running: {
      type: Boolean,
      require: true
    }
  },
  data(){
    return {
      btnNum: 0
    }
  },
  methods: {
    onClickStart() {
      this.$emit("click-start")
    },
    onClickStop() {
      this.$emit('click-stop')
    },
    onClickReset() {
      this.$emit('click-reset')
    }
  }
}
</script>

<style scoped>

</style>
