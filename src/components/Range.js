export default class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  getStart() {
    return this.start;
  }

  setStart(date) {
    if (date.getTime() > this.end.getTime()) {
      throw new Error('start > end')
    }

    this.start = date
  }

  getEnd() {
    return this.end;
  }

  setEnd(date) {
    if (date.getTime() < this.start.getTime()) {
      throw new Error('end < start')
    }

    this.end = date
  }

  isStart (date) {
    return date.toDateString() === this.start.toDateString()
  }

  isEnd (date) {
    return date.toDateString() === this.end.toDateString()
  }

  contains (range) {
    if (range instanceof Date) {
      return range.getTime() >= this.start.getTime() && range.getTime() <= this.end.getTime()
    } else if (range instanceof Range) {
      return range.getStart().getTime() > this.start.getTime() && range.getEnd().getTime() < this.end.getTime()
    } else {
      throw new Error('Type inconnu')
    }
  }

  intersect (range) {
    return this.contains(range.getStart())
      || this.contains(range.getEnd())
      || (range.getStart().getTime() < this.start.getTime() && range.getEnd().getTime() > this.end.getTime())
  }

  merge (range) {
    if (range.getStart().getTime() < this.start.getTime()) {
      this.setStart(range.getStart())
    }

    if (range.getEnd().getTime() > this.end.getTime()) {
      this.setEnd(range.getEnd())
    }
  }
}
