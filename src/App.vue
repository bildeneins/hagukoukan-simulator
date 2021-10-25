<template>
  <v-app>
    <tab
      @toIppan="showIppan"
      @toKiban="showKiban"
    />
    <v-divider/>
    <div v-show="isIppan">
      <drill-btn
          @clickedStartBtn="clickedStartBtn"
          @clickedResetBtn="clickedResetBtn"
          @clickedStopBtn="clickedStopBtn"
      >
      </drill-btn>
    </div>
    <div v-show="isKiban">
      <v-container>
        <v-row>
          <v-col v-for="(idLineNumber,index) in idLineNumbers" :key="index">
            <drill-card
              :machine-name="tasks[idLineNumber].machine_name"
              :is-machine-stopping = "isMachineStatusLists[idLineNumber].stopping"
              :is-machine-emergency = "isMachineStatusLists[idLineNumber].emergency"
              @clickedStopBtn="clickedDrillCardStopBtn(index)"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <reset-modal
      v-if="showResetModal"
      @clickedModalCancelBtn="clickedResetModalCancelBtn"
      @clickedModalOKBtn="clickedResetModalOKBtn"
    />
    {{isMachineStatusLists}}
  </v-app>
</template>

<script>
import simulator from "./scripts/simulator";
import Tab from "./components/Tab.vue";
import DrillCard from "./components/DrillCard";
import DrillBtn from "./components/DrillBtn";
import ResetModal from "./components/ResetModal";
export default {
  name: 'App',
  components: {
    Tab, DrillCard,DrillBtn,ResetModal
  },
  data(){
    return{
      tasks: [],
      usingTaskIds: [1, 2],
      idLineNumbers: [],
      isMachineStoppingLists:[],
      isKiban: false,
      isIppan: true,
      showResetModal: false,
      isMachineStatusLists: [],
    }
  },
  methods:{
    async startSimulator() {
      // this.tasks = await simulator.getTable()
      // console.log(this.tasks)
      // this.idLineNumbers = []
      // for(let i = 0; i < this.usingTaskIds.length; i++){
      //   let num = this.tasks.findIndex(task =>
      //       this.usingTaskIds[i] === Number(task.id)
      //   )
      //   this.idLineNumbers.push(num)
      // }
      // for(let i = 0; i < this.usingTaskIds.length; i++){
      //   const id = this.usingTaskIds[i]
      //   console.log("id: ", id,"line num: ", this.idLineNumbers[i])
      //   this.isMachineStatus = simulator.intervalPost( this.idLineNumbers[i], this.tasks)
      // }
      // console.log("do start simulator")

      this.tasks = await simulator.getTable()
      this.idLineNumbers = []
      for(let i = 0; i < this.usingTaskIds.length; i++){
        let num = this.tasks.findIndex(task =>
            this.usingTaskIds[i] === Number(task.id)
        )
        this.idLineNumbers.push(num)
      }
      for(let i = 0; i < this.tasks.length; i++){
        this.isMachineStatusLists.push(
          {
            "id": Number(this.tasks[i].id),
            "stopping": false,
            "emergency": false
          })
      }

      for(let i = 0; i < this.usingTaskIds.length; i++){
          const idLineNum = this.idLineNumbers[i]
          const id = this.usingTaskIds[i]
          const interval_time = Number(this.tasks[idLineNum].cycle_time)
          const machine_name = String(this.tasks[idLineNum].machine_name)
          const drill_counter_stop = Number(this.tasks[idLineNum].drill_counter_stop)
          setInterval( async ()=>{
            const response = await simulator.intervalPost( id, drill_counter_stop, machine_name)
            this.isMachineStatusLists[idLineNum].stopping = response.stopping
            this.isMachineStatusLists[idLineNum].emergency = response.emergency
          }, interval_time)
        }
    },
    async resetSimulator() {
      console.log("do reset simulator")
    },
    async stopSimulator() {
      console.log("do stop simulator")
    },
    async clickedStartBtn() {
      await this.startSimulator()
      console.log("clicked start btn")
    },
    clickedResetBtn() {
      console.log("clicked reset btn")
      this.showResetModal = true
    },
    async clickedStopBtn() {
      await this.stopSimulator()
      console.log("clicked stop btn")
    },
    showIppan(){
      this.isIppan = true
      this.isKiban = false
    },
    showKiban(){
      this.isIppan = false
      this.isKiban = true
    },
    async clickedResetModalOKBtn(){
      await   this.resetSimulator()
      this.showResetModal = false
    },
    clickedResetModalCancelBtn(){
      this.showResetModal =  false
    },
    clickedDrillCardStopBtn(index){
      console.log(index)
    }
  }
};
</script>
