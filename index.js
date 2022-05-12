function createEmployeeRecord(recArr) {
    return {
        firstName: recArr[0],
        familyName: recArr[1],
        title: recArr[2],
        payPerHour: recArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (recordsArr) => {
    return recordsArr.map(rec => createEmployeeRecord(rec))
}

const createTimeInEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const inEvent = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    this.timeInEvents.push(inEvent)
    return this
}

const createTimeOutEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const outEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    this.timeOutEvents.push(outEvent)
    return this
}

const hoursWorkedOnDate = function(targetDate) {
    const inEvent = this.timeInEvents.find(inEvent => inEvent.date === targetDate)
    const outEvent = this.timeOutEvents.find(outEvent => outEvent.date === targetDate)
    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function(targetDate) {
    return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}

const findEmployeeByFirstName = function(srcArr, firstName) {
    return srcArr.find(rec => rec.firstName === firstName)
}

const calculatePayroll = function(recsArr) {
    return recsArr.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    }, 0)
}