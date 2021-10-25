<template>
  <v-card>
    <v-card-title>
      {{machineName + '号機'}}
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col v-show="isMachineStopping === false && isMachineEmergency === false">
            {{"稼働中"}}
          </v-col>
<!--          <v-col v-show="isMachineStopping === false && isMachineEmergency === true">-->
<!--            {{"稼働中"}}-->
<!--          </v-col>-->
          <v-col v-show="isMachineStopping === true && isMachineEmergency === false">
            {{"停止中 - 作業中"}}
          </v-col>
          <v-col v-show="isMachineStopping === true && isMachineEmergency === true">
            {{"停止中 - 設備異常"}}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
                :disabled="isMachineStopping === true"
                @click="onClickStopBtn"
                color="danger"
            >
              <span
                  style="color: white"
              >
                停止させる
              </span>
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
    isMachineStopping: {default: false, type: Boolean, require: true},
    isMachineEmergency: {default: false, type: Boolean, require:  true}
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