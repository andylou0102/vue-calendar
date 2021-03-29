<template>
    <header>
        <section class="changeToWeek">
            <router-link :to="{ name: 'Calendar' }">
                <span class="material-icons">calendar_today</span>
            </router-link>
            <h2>選擇日期</h2>
        </section>

        <h4>{{year + ' / ' + month}}</h4>
        <table>
            <thead>
                <tr>
                    <th>M</th><th>T</th><th>W</th><th>T</th>
                    <th>F</th><th>S</th><th>S</th>
                </tr>
            </thead>
        </table>
  </header>
  <main class="mainContainer">
    <div>
    <table>
        <tbody>
            <tr v-for="row in Math.ceil(arr.length / 7)" :key="row">
                <td 
                    v-for="col in 7" 
                    :key="col"
                    :class="{ isToday: (col-1) + 7*(row-1) + 1 === currentDay , 
                        circle: selected === (col-1) + 7*(row-1) }"
                    @click="selected = (col-1) + 7*(row-1)">
                    {{ arr[(col-1) + 7*(row-1)] }}</td>
            </tr>
        </tbody>
    </table>
    <h4>{{nyear + ' / ' + nmonth}}</h4>
    <table class="nextMonth">
        <tbody>
            <tr v-for="row in Math.ceil(narr.length / 7)" :key="row">
                <td 
                    v-for="col in 7" 
                    :key="col"
                    :class="{  circle: selected === (col-1) + 7*(row-1) + dayCount }"
                    @click="selected = (col-1) + 7*(row-1) + dayCount">
                    {{ narr[(col-1) + 7*(row-1)] }}</td>
            </tr>
        </tbody>
    </table>
    <router-link :to="{ name: 'CalendarSelect', params: { select: selected+1 } }">
        <button
            class="choise" 
            :class="{ dis: selected > dayCount}">選擇</button>
    </router-link>
    
    </div>

  </main>

</template>

<script>
import { ref } from 'vue'
import handleCalendar from '../functions/handleCalendar'
export default {
    setup() {
        let selected = ref(null)
        let dayCount = ref(null)
        let f = false
        let t = true


        const { year, month, arr, currentDay } = handleCalendar(f)

        dayCount.value = arr

        for(let e of dayCount.value) {
            if(e === ' ') {
                dayCount.value.shift
            }
        }

        const { year:nyear, month:nmonth, arr:narr, currentDay:ncurrentDay } = handleCalendar(t)

        return { year, month, arr, currentDay, selected,
                nyear, nmonth, narr, ncurrentDay, dayCount  }
    },
}
</script>

<style scoped>
    h4 {
        margin: 0 0 20px;
    }
    h2 {
        width: 150px;
        display: inline-block;
        margin-left: 10px;
    }
    header {
        box-shadow: 0 3px 5px 2px rgba(88, 88, 88, 0.2);
        height: 25%;
    }
    section.changeToWeek {
        text-align: left;
        margin-left: 30px;
    }
    span.material-icons {
        color: #7F74B4;
        background: #DEDAF4;
        border-radius: 50%;
        padding: 5px;
        font-size: 28px;
        margin-top: 20px;
    }

    .mainContainer {
        overflow: hidden;
        height: 75%;
        width: 100%;
        background-color: rgb(235, 235, 235);
    }
    .mainContainer div {
        overflow: auto;
        height: 100%;
        width: calc(100% + 20px);
    }
    td {
        padding: 10px;
        cursor: pointer;
    }
    .nextMonth h4{
        width: 100px;
    }
    .isToday {
        color: green;
    }
    .circle {
        padding: 5px;
        color: white;
        border-radius: 10px;
        background-color: #7F74B4;
    }
    .choise {
        border: none;
        font-size: 1.3rem;
        background-color: #7F74B4;
        color: white;
        margin: 20px 0;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
    }
    .dis {
        display: none;
    }
</style>