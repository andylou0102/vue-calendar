<template>
    <header class="header">
        <nav>
            <div v-if="weekOrDay === 'day'">
                <span class="material-icons back"
                    @click="backDate">keyboard_arrow_left</span>
                <p>{{ `${year}/${month}/${select}` }}</p>
                <span class="material-icons next"
                    @click="nextDate">keyboard_arrow_right</span>
            </div>
            <h2 v-else>預約行事曆</h2>
            <select v-model="weekOrDay">
                <option value="week">月檢視</option>
                <option value="day">日檢視</option>
            </select>
        </nav>
    </header>


    <main class="main">
        <section class="weekList" v-if="weekOrDay === 'day'">
            <router-link :to="{ name: 'MonthCalendar' }">
                <span class="material-icons calendar">calendar_today</span>
            </router-link>
            <div class="slider canClick">
                <div v-for="oneDay in aMonth[0][1]" 
                    :key="oneDay.id"
                    @click="() => changeSelect(oneDay.id)"
                    :class="{choose: select === oneDay.id}">
                    {{ oneDay.day + '\n' + oneDay.id }}</div>
            </div>
        </section>
        
        <section class="weekList" v-else>
            <router-link :to="{ name: 'MonthCalendar' }">
                <span class="material-icons calendar">calendar_today</span>
            </router-link>
            <div class="slider">
                <div v-for="oneDay in aMonth[0][1]" 
                    :key="oneDay.id">{{ oneDay.day + '\n' + oneDay.id }}</div>
                </div>
        </section>

        
        <div class="sceContainer" v-if="weekOrDay === 'day'" >
            <DayScedule  :select="select" />
        </div>
        
        <div class="sceContainer" v-else >
            <MonthScedule />
        </div>
    </main>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MonthScedule from '../components/MonthScedule.vue'
import DayScedule from '../components/DayScedule.vue'
import handleCalendar from '../functions/handleCalendar'
export default {
    components: { MonthScedule, DayScedule },
    setup() {
        const weekOrDay = ref('week')
        const select = ref(1)
        let count = ref(1)

        let f = false
        const store = useStore()
        const route = useRoute()

        const { year, month, arr, currentDay } = handleCalendar(f)

        for(let e of arr) {
            if(e === ' ') {
                arr.shift
            }
        }

        function changeSelect(day) {
            select.value = day
        }

        function backDate() {
            if(count.value === 1) return
            count.value -= 1
            select.value = count.value
        }

        function nextDate() {

            if(count.value === arr.length) return
            count.value += 1
            select.value = count.value
        }

        if(route.params.select) {
            weekOrDay.value = 'day'
            select.value = route.params.select
        }

        return { weekOrDay, select, changeSelect, currentDay,
                 year, month, backDate, nextDate,
                aMonth: computed(() => store.state.aMonth) }
    },
}
</script>

<style scoped>
    .header {
        padding: 10px 10px 0 10px;
        height: 7%;
    }
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
    }
    nav div p {
        display: inline-block;
        margin: 0 1rem;
    }
    nav .material-icons{
        border-radius: 50%;
        color: white;
        cursor: pointer;
        background: gray;
        padding: 2px;
        font-size: 1.1rem;
    }
    select {
        background: #DEDAF4;
        border-radius: 25px;
        color: #7F74B4;
        width: auto;
        height: 50px;
        padding: 0 15px;
    }
    select:focus {
        outline: none;
    }
    select:hover {
        background: #ccc5f5;
    }
    span.material-icons.calendar {
        color: #7F74B4;
        background: #DEDAF4;
        border-radius: 50%;
        padding: 5px;
        font-size: 28px;
        margin-top: 20px;
        float: left;
    }

    .main {
        overflow: hidden;
        width: inherit;
        height: inherit;
        background-color: rgb(235, 235, 235);
        height: 93%;
    }
    section.weekList {
        padding: 0 5px 10px;
        background-color: white;
        white-space: pre;
        overflow: hidden;
        box-shadow: 0 5px 5px 2px rgba(88, 88, 88, 0.2);
    }
    section .slider {
        display: flex;
        position: relative;
        top: 29px;
        overflow: auto;
        margin-left: 4rem;
    }
    section .slider div {
        display: inline-block;
        flex: 1 0 10%;
        margin: 0 10px;
        min-width: 75px;

    }
    section .slider.canClick {
        cursor: pointer;
    }
    .sceContainer {
        overflow: auto;
        width: calc(100% + 20px);
        height: 570px;
    }


    .choose {
        padding: 5px;
        color: white;
        border-radius: 10px;
        background-color: #7F74B4;
    }


</style>