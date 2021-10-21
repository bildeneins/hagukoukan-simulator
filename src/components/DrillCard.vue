<template>
  <v-card>
    <v-card-title>
      {{machineName + '号機'}}
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col v-if="isMachineStopping === false">
            {{"稼働中"}}
          </v-col>
          <v-col v-if="isMachineStopping === true">
            {{"停止中"}}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn :disabled="isMachineStopping === true" @click="onClickStopBtn">
              {{"停止"}}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DrillCard" ,
  props:{
    machineName: {default: '0', type: String, require: true},
    isMachineStopping: {default: false, type: Boolean, require: true}
  },
  methods:{
    onClickStopBtn() {
      this.$emit("clickedStopBtn")
    }
  }

}
</script>

<style scoped>

</style>