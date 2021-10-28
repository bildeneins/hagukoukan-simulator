<template>
  <v-app>
    <tab
      @toIppan="changeView('general')"
      @toKiban="changeView('machines')"
    />
    <div v-if="isIppan">
      <DrillBtn
          :running="running"
          @click-start="clickedStartBtn"
          @click-stop="clickedStopButton"
          @click-reset="clickedResetButton"
      >
      </DrillBtn>
    </div>
    <div v-else-if="isKiban">
      <v-container>
        <v-row>
          <v-col
              v-for="(machine,index) in machines"
              :key="index"
          >
            <DrillCard
              :machine-name="machine.name"
              :is-machine-stopping="machine.stopping"
              :is-machine-emergency="machine.emergency"
              @clickedStopBtn="clickedDrillCardStopBtn(machine.id)"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <ResetModal
        v-if="showResetModal"
        :show="showResetModal"
        :settings="settings"
        @ok="resetCounts"
        @cancel="showResetModal = false"
    />
  </v-app>
</template>

<script>
import simulator from "./scripts/simulator";
import termsGen from './scripts/termsGenerator'
import Tab from "./components/Tab.vue";
import DrillCard from "./components/DrillCard";
import DrillBtn from "./components/DrillBtn";
import ResetModal from "./components/ResetModal";
import api from './api'
// import countsGenerator from "./scripts/countsGenerator";
const counts = require('../sim-counts')

export default {
  name: 'App',
  components: {
    Tab, DrillCard,DrillBtn, ResetModal
  },
  data: () => ({
    running: false,
    tasks: [],
    usingTaskIds: [7, 8, 9, 10, 11, 12, 13, 14, 15],
    idLineNumbers: [],
    machines: [
      { id: 0, name: '1号機', stopping: false, emergency: false},
      { id: 1, name: '2号機', stopping: false, emergency: false},
      { id: 2, name: '3号機', stopping: false, emergency: false},
    ],
    intervalIds: [],
    isMachineStoppingLists:[],
    view: 'general', // 'general' | 'machines',
    intervalId: null,
    showResetModal: false,
    settings: null
  }),
  computed: {
    isIppan() {
      return this.view === 'general'
    },
    isKiban() {
      return this.view === 'machines'
    }
  },
  mounted() {
    this.intervalId = setInterval(async () => {
      const stopping1 = (await api.getIsMachineStopping('1号機')).stopping
      const stopping2 = (await api.getIsMachineStopping('2号機')).stopping
      const stopping3 = (await api.getIsMachineStopping('3号機')).stopping
      const emergency1 = (await api.getIsMachineStopping('1号機')).emergency
      const emergency2 = (await api.getIsMachineStopping('2号機')).emergency
      const emergency3 = (await api.getIsMachineStopping('3号機')).emergency
      this.machines = [
        { id: 0, name: '1号機', stopping: stopping1, emergency: emergency1},
        { id: 1, name: '2号機', stopping: stopping2, emergency: emergency2},
        { id: 2, name: '3号機', stopping: stopping3, emergency: emergency3},
      ]
    }, 5000)
  },
  destroyed() {
    if (this.intervalId != null) {
      clearInterval(this.intervalId)
    }
  },
  methods:{
    async clickedStartBtn() {
      this.running = true
      const tasks = await simulator.getTable()
      const usingTasks = this.usingTaskIds.map(taskId => {
        const task = tasks.find(t => t.id === taskId)
        if (task) {
          return task
        }
      })
      usingTasks.forEach(task => {
        simulator.intervalPost(task)
          .then(intervalId => {
            this.intervalIds.push(intervalId)
          })
      })
    },
    clickedStopButton() {
      this.running = false
      this.intervalIds.forEach(i => simulator.stopIntervalPost(i))
    },
    clickedResetButton() {
      this.settings = termsGen.getTermSettings()
      this.showResetModal = true
    },
    async resetCounts() {
      this.settings = termsGen.getTermSettings()
      await api.applySettings(this.settings)
      // const tasks = await simulator.getTable()
      // const usingTasks = this.usingTaskIds.map(taskId => {
      //   const task = tasks.find(t => t.id === taskId)
      //   if (task) {
      //     return task
      //   }
      // })
      // const taskCounts = await countsGenerator.getCounts(usingTasks)
      await api.setCounts(counts)
      this.showResetModal = false
    },
    clickedDrillCardStopBtn(machineId) {
      const machine = this.machines.find(i => i.id === machineId)
      console.log('stop: ', machine)
      api.toggleMachineStopping(machine.name, true)
    },
    changeView(newView) { // newView: 'general' | 'machines'
      this.view = newView
    }
  }
};
</script>
