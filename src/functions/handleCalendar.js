
function countDaysInMonth(year, month) {
    return /3|5|8|10/.test(month) ? 30 : month === 1 ? ((!(year % 4) && year % 100) || !(year % 400) ? 29 : 28) : 31
}

function zellerCongruence(year, month, day) {
    if (month === 1 || month === 2) {
        month += 12
        year -= 1
        }
    const c = Math.floor(year / 100) // 年份前兩位數
    const y = year % 100 // 年份後兩位數
    const m = month
    const d = day
    let w = 0
    w = y + Math.floor(y / 4) + Math.floor(c / 4) - 2 * c + Math.floor((26 * (m + 1)) / 10) + d - 1
    if (w < 0) w = (w & (7 + 7)) % 7
    else w = w % 7
    return w
}

function displayData(next) {
    const arr = []
    let year, month
    if(next) {
        month = new Date().getMonth() + 2
        if(month === 12) {
            month = 1
            year = new Date().getFullYear() + 1
        } else {
            year = new Date().getFullYear()
        }
    } else {
        year = new Date().getFullYear()
        month = new Date().getMonth() + 1
    }
    const currentDay = new Date().getDate()
    const currentDayCount = countDaysInMonth(year, month - 1)
    const firstDay = zellerCongruence(year, month, 1)
    if(firstDay === 0) firstDay = 7
    for(let i = 1; i < firstDay; i++) {
        arr.push(' ')
    }
    for(let i = 1; i <= currentDayCount; i++) {
        arr.push(i)
    }

    return { year, month, arr, currentDay }
}

export default displayData