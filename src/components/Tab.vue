<template>
  <div>
    <v-tabs>
      <v-tab
          @change="onClickedIppanTab"
      >
        一般
      </v-tab>
      <v-tab
          @change="onClickedKibanTab"
      >
        機番
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: "Tab",
  methods:{
    onClickedIppanTab(){
      this.$emit("toIppan")
    },
    onClickedKibanTab(){
      this.$emit("toKiban")
    },
  },
}
</script>

<style scoped>

</style>