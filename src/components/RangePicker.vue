<template>
  <div>
    <div class="range-picker">
      <div class="range-picker-month" :key="index" v-for="(month, index) in months">
        <div class="range-picker-month-title">
          {{ month.getName() }}
        </div>
        <div class="range-picker-days">
          <div>Lun</div>
          <div>Mar</div>
          <div>Mer</div>
          <div>Jeu</div>
          <div>Ven</div>
          <div>Sam</div>
          <div>Dim</div>
        </div>
        <div class="range-picker-numbers">
          <div class="range-picker-day"
               :key="index"
               v-for="(day, index) in month.getDays()" :class="classForDay(day, month, newRange)"
               @mousedown="startDrag(day)"
               @mouseover="overDay(day)"
               @dblclick="removeRange(day)"
          >
            {{ day.getDate() }}
          </div>
        </div>
      </div>
    </div>
    <div class="range-picker-actions">
      <button class="range-picker-cancel" @click="cancel">Annuler</button>
      <button class="range-picker-cancel" @click="submit">Valider</button>
    </div>
  </div>
</template>

<script>
  import Month from './Month'
  import Ranges from './Ranges'
  import Range from "./Range";

  export default {
    name: "RangePicker",
    props: {
      year: Number,
      value: Array
    },
    data () {
      return {
        months: [],
        ranges: [],
        newRange: null,
        cursor: 1,
        startDate: null
      }
    },
    mounted () {
      this.months = Month.createMonthsForYear(this.year)
      this.ranges = Ranges.fromTimestamps(this.value)
      document.addEventListener('mouseup', this.onRelease)
    },
    destroyed () {
      document.removeEventListener('mouseup', this.onRelease)
    },
    methods: {
      classForDay (day, month, newRange) {
        let classes = []
        let range = this.ranges.contains(day)

        if (range !== null) {
          classes.push('range-picker-range')

          if (range.isStart(day)) { classes.push('range-picker-range-start') }
          if (range.isEnd(day)) { classes.push('range-picker-range-end') }
        }

        if (newRange !== null && newRange.contains(day)) {
          classes = ['range-picker-newrange']

          if (newRange.isStart(day)) { classes.push('range-picker-range-start') }
          if (newRange.isEnd(day)) { classes.push('range-picker-range-end') }
        }

        if (!month.contains(day)) {
          classes.push('range-picker-out')
        }

        return classes
      },
      startDrag (day) {
        let range = this.ranges.contains(day)

        if (range) {
          if (range.isStart(day)) {
            this.newRange = range
            this.ranges.removeRange(range)
            this.startDate = range.getEnd()
            this.cursor = 0
          } else if (range.isEnd(day)) {
            this.newRange = range
            this.ranges.removeRange(range)
            this.startDate = range.getStart()
            this.cursor = 1
          }
        } else {
          this.startDate = day
          this.newRange = new Range(day, day)
        }
      },
      overDay (day) {
        if (this.newRange !== null) {
          try {
            if (this.cursor === 1) {
              this.newRange.setEnd(day)
            } else {
              this.newRange.setStart(day)
            }
          } catch (e) {
            this.cursor = Math.abs(this.cursor - 1)
            this.newRange = new Range(this.startDate, this.startDate)
            this.overDay(day)
          }
        }
      },
      onRelease () {
        if (this.newRange) {
          this.ranges.addRange(this.newRange)
          this.newRange = null
        }
      },
      removeRange (day) {
        let range = this.ranges.contains(day)

        if (range) {
          this.ranges.removeRange(range)
        }
      },
      cancel () {
        this.$emit('cancel')
      },
      submit() {
        this.$emit('input', this.ranges.toTimestamps())
        this.$emit('submit')
      }
    }
  }
</script>

<style src="./range-picker.scss" lang="scss"></style>
