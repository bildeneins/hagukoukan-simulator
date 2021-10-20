<template>
  <v-container>
    <v-row v-if="btnNum === 0">
      <v-col>
        <v-btn @click="clickStart">
          {{'開始'}}
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="btnNum === 1">
      <v-col>
        <v-btn @click="clickStop">
          {{'停止'}}
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="btnNum === 2">
      <v-col>
        <v-btn>
          {{'再開'}}
        </v-btn>
      </v-col>
      <v-col>
        <v-btn>
          {{'リセット'}}
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
      btnNum: 0
    }
  },
  methods: {
    clickStart(){
      this.btnNum = 1
      this.$emit("clickedStartBtn")
    },
    clickStop(){
      this.btnNum = 2
    }
  }
}
</script>

<style scoped>

</style>