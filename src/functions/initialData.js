import handleCalendar from './handleCalendar'

let f = false
const { year, month, arr, currentDay } = handleCalendar(f)

const data = []

function initialData() {
    for(let i = 1; i <= 24; i++) {
        data.push({ [i]: [] })
    }
    for(let j = 0; j < 24; j++) {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] === ' ') continue
            let d = i + 1
            switch(d % 7) {
                case 1:
                    data[j][j+1].push({ day: '一' })
                    break;
                case 2:
                    data[j][j+1].push({ day: '二' })
                    break;
                case 3:
                    data[j][j+1].push({ day: '三' })
                    break;
                case 4:
                    data[j][j+1].push({ day: '四' })
                    break;
                case 5:
                    data[j][j+1].push({ day: '五' })
                    break;
                case 6:
                    data[j][j+1].push({ day: '六' })
                    break;
                case 0:
                    data[j][j+1].push({ day: '日' })
                    break;
            }
        }
    }

    for(let j = 0; j < 24; j++) {
        for(let i = 0; i < data[0][1].length; i++) {
            data[j][j+1][i].id = i+1
            data[j][j+1][i].data = ''
            data[j][j+1][i].style = false
        }
    }
    return data
}

export default initialData