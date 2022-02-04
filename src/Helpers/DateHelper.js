import { DateTime } from "luxon"

const DateHelper = {

    getCurrentTime: () => {
        return  DateTime.now()
    },

    getWeekOfYear: (date) => {
        return  DateTime.fromJSDate(date).weekNumber
    },

    checkIfSameWeek: (date) => {
        console.log(date);
        const now = DateHelper.getCurrentTime().weekNumber
        const toCompare = DateHelper.getWeekOfYear(date)
        console.log(toCompare, now);
        return now === toCompare
    }

}

export default DateHelper;