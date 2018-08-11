export default class Month {
  constructor (year, month) {
    this.year = year
    this.month = month
    this.start = new Date(this.year, this.month)
  }

  getName() {
    return this.start.toLocaleDateString('fr-fr', {month: 'long'})
  }

  getDays() {
    let days = []

    // add last days of previous month if current month does not begin on monday
    let dayOfWeek = this.start.getDay() - 1
    if (dayOfWeek === -1) { // Sunday
      dayOfWeek = 6 // we start week on monday (1) => sunday (6)
    }
    if (dayOfWeek > 0) {
      for (let d = dayOfWeek; d > 0; d--) {
        let date = this.clone(this.start)
        date.setDate(d * -1 + 1)
        days.push(date)
      }
    }

    let end = this.clone(this.start)
    end.setMonth(end.getMonth() + 1) // start of next month
    end.setDate(0) // remove one day -> last day of previous month

    for(let d = 0; d < end.getDate(); ++d) {
      let date = this.clone(this.start)
      date.setDate(d + 1)
      days.push(date)
    }

    // add first days of next month if current month does not finish on sunday
    dayOfWeek = end.getDay() - 1
    if (dayOfWeek === -1) { // Sunday
      dayOfWeek = 6 // we start week on monday (1) => sunday (6)
    }
    if (dayOfWeek < 6) {
      for (let d = 0; d < ( 6 - dayOfWeek); d++) {
        let date = this.clone(end)
        date.setDate(end.getDate() + d + 1)
        days.push(date)
      }
    }

    return days
  }

  clone (date) {
    return new Date(date.getTime())
  }

  contains (date) {
    return date.getMonth() === this.month
  }

  static createMonthsForYear (year) {
    let months = []

    for (let m = 0; m < 12; m++) {
      months.push(new Month(year, m))
    }

    return months
  }
}
