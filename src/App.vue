<template>
  <div id="app">
    <button @click="pickerShow">Afficher le calendrier</button>
    <div style="position: static; top: 0; left: 0; right: 0; bottom: 0; overflow: scroll;" v-if="isPickerVisible">
      <range-picker :year="2018" v-model="ranges" @cancel="pickerHide" @submit="pickerHide"/>
    </div>
  </div>
</template>

<script>
import RangePicker from './components/RangePicker'

export default {
  name: 'app',
  data () {
    return {
      ranges: [[1515020400000, 1516014216000], [1533396733000, 1534260733000]],
      isPickerVisible: false
    }
  },
  methods: {
    pickerShow () { this.isPickerVisible = true },
    pickerHide () { this.isPickerVisible = false }
  },
  components: {
    RangePicker
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
