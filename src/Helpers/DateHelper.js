import { DateTime } from "luxon"

const DateHelper = {

    getCurrentTime: () => {
        return  DateTime.now()
    },

    getWeekOfYear: (date) => {
        return  DateTime.fromJSDate(date).weekNumber
    },

    checkIfSameWeek: (date) => {
        const now = DateHelper.getCurrentTime().weekNumber
        const toCompare = DateHelper.getWeekOfYear(date)
        return now === toCompare
    },
    isPastWeekStart: (date) => {
        const timeToCheckAgainstCurrent = DateTime.fromISO(date)
        const currentTime = DateHelper.getCurrentTime()
        if (currentTime > timeToCheckAgainstCurrent){
            return true
        } else {
            return false
        }
    }

}

export default DateHelper;