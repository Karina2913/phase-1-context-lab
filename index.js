function createEmployeeRecord (employeeArray) {
    const employeeRecord = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
    return employeeRecord;
}

function createEmployeeRecords (nestedArray) {
    const employeeRecords = [];

    for (let i = 0; i < nestedArray.length; i++) {
        const employeeRecord = createEmployeeRecord(nestedArray[i]);
        employeeRecords.push(employeeRecord);
    }
    return employeeRecords;
}

function createTimeInEvent (dateStamp) {
    const newEvent = {
        type: "TimeIn",
        hour: parseInt(dateStamp.substring(11, 15)),
        date: dateStamp.substring(0, 10)
    };

    this.timeInEvents.push(newEvent);
    return this;
}

function createTimeOutEvent (dateStamp) {
    const newEvent = {
        type: "TimeOut",
        hour: parseInt(dateStamp.substring(11, 15)),
        date: dateStamp.substring(0, 10)
    };

    this.timeOutEvents.push(newEvent);
    return this;
}
/*
function hoursWorkedOnDate (date) {
    const timeOutNum = this.timeOutEvents.find(event => event.date === date);
    const timeInNum = this.timeInEvents.find(event => event.date === date);

    const hoursWorked = (timeOutNum.hour - timeInNum.hour)/100;
    return hoursWorked;
}

function wagesEarnedOnDate (date) {
    const payRate = this.payPerHour;
    const hoursWorked = this.hoursWorkedOnDate;

    const wageEarned = parseInt(hoursWorked * payRate);
    return wageEarned;
}
*/

function hoursWorkedOnDate (date) {
    const timeOutNum = this.timeOutEvents.find(event => event.date === date);
    const timeInNum = this.timeInEvents.find(event => event.date === date);

    const hoursWorked = (timeOutNum.hour - timeInNum.hour)/100;
    return hoursWorked;
}

function wagesEarnedOnDate (date) {
    const payRate = this.payPerHour;
    let hoursWorked = hoursWorkedOnDate.call(this, date);

    const wageEarned = payRate * hoursWorked;
    return wageEarned;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(rec => rec.firstName === firstName);
}

function calculatePayroll(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce((memo, record) => (memo + allWagesFor.call(record)), 0);
}