<template>
  <v-app>
    <tab
      @toIppan="showIppan"
      @toKiban="showKiban"
    />
    <div v-show="isIppan">
      <DrillBtn
        @clickedStartBtn="clickedStartBtn"
      >
      </DrillBtn>
    </div>
    <div v-show="isKiban">
      <v-container>
        <v-row>
          <v-col v-for="(idLineNumber,index) in idLineNumbers" :key="index">
            <DrillCard
              :machine-name="tasks[idLineNumber].machine_name"
              :is-machine-stopping=false
              @clickedStopBtn="clickedDrillCardStopBtn(index)"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import simulator from "./scripts/simulator";
import Tab from "./components/Tab.vue";
import DrillCard from "./components/DrillCard";
import DrillBtn from "./components/DrillBtn";

export default {
  name: 'App',
  components: {
    Tab, DrillCard,DrillBtn
  },
  data: () => ({
    tasks: [],
    usingTaskIds: [1, 2],
    idLineNumbers: [],
    isMachineStoppingLists:[],
    isKiban: false,
    isIppan: true
  }),
  methods:{
    async clickedStartBtn(){
      this.tasks = await simulator.getTable()
      console.log(this.tasks)
      this.idLineNumbers = []
      for(let i = 0; i < this.usingTaskIds.length; i++){
        let num = this.tasks.findIndex(task =>
          this.usingTaskIds[i] === Number(task.id)
        )
        this.idLineNumbers.push(num)
      }
      for(let i = 0; i < this.usingTaskIds.length; i++){
        const id = this.usingTaskIds[i]
        console.log("id: ", id,"line num: ", this.idLineNumbers[i])
        simulator.intervalPost( this.idLineNumbers[i], this.tasks)
      }
    },
    showIppan(){
      this.isIppan = true
      this.isKiban = false
    },
    showKiban(){
      this.isIppan = false
      this.isKiban = true
    },
    clickedDrillCardStopBtn(index){
      console.log(index)
    }
  }
};
</script>
