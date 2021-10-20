<template>
  <v-app>
    <div>
      <v-btn
          @click="clickedStartBtn"
      >
        開始
      </v-btn>
    </div>
    <v-main>
    </v-main>
  </v-app>
</template>

<script>
import simulator from "@/scripts/simulator"

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    task: [],
    usingTaskIds: [0, 1]
  }),
  methods:{
    async clickedStartBtn(){
      this.task = await simulator.getTable()
      console.log(this.task)
      for(let i = 0; i < this.usingTaskIds.length; i++){
        const id = this.usingTaskIds[i]
        console.log(id)
        simulator.intervalPost( id, this.task)
      }
    }
  }

};
</script>
