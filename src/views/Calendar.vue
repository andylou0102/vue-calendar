<template>
    <header class="header">
        <nav>
            <div v-if="weekOrDay === 'day'">
                <span class="material-icons back"
                    @click="backDate">keyboard_arrow_left</span>
                <p>{{ `${y}/${m}/${select}` }}</p>
                <span class="material-icons next"
                    @click="nextDate">keyboard_arrow_right</span>
            </div>
            <h2 v-else>預約行事曆</h2>
            <select v-model="weekOrDay">
                <option value="week">週檢視</option>
                <option value="day">日檢視</option>
            </select>
        </nav>
    </header>


    <main class="main" ref="test">
        <section class="weekList" v-if="weekOrDay === 'day'">
            <router-link :to="{ name: 'MonthCalendar' }">
                <span class="material-icons calendar">calendar_today</span>
            </router-link>
            <div class="slider canClick">
                <div v-for="(oneDay, i) in storeData[0][1]"
                    :ref="el => {if(el) divs[i] = el}" 
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
                <div v-for="oneDay in storeData[0][1].slice(select-1, select+6)" 
                    :key="oneDay.id">{{ oneDay.day + '\n' + oneDay.id }}</div>
                </div>
        </section>

        
        <div class="sceContainer" v-if="weekOrDay === 'day'" >
            <DayScedule  :select="select" />
        </div>
        
        <div class="sceContainer" v-else >
            <MonthScedule :select="select" />
        </div>
    </main>
</template>

<script>
import { computed, ref, onMounted, onUpdated } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MonthScedule from '../components/MonthScedule.vue'
import DayScedule from '../components/DayScedule.vue'
import handleCalendar from '../functions/handleCalendar'
export default {
    components: { MonthScedule, DayScedule },
    setup() {
        const weekOrDay = ref('week')
        let select = ref(1)
        let count = ref(1)
        let y = ref(null)
        let m = ref(null)
        let reserveToggle = ref(true)
        

        const test = ref(null)

        let counter = 0
        let toggle = true
        
        const divs = ref([])

        const store = useStore()
        const route = useRoute()

        const { year, month, arr, currentDay } = handleCalendar(false)

        y.value = year
        m.value = month

        for(let i = 0; i < arr.length; i++ ) {
            if(arr[i] === " ") {
                arr.shift()
            }
        }
        arr.shift()

        function changeSelect(day) {
            select.value = day
            count.value = day
        }

        function backDate() {
            if(count.value === 1) return
            toggle = false
            count.value -= 1
            select.value = count.value
        }

        function nextDate() {
            if(count.value === arr.length) return
            toggle = true
            count.value += 1
            select.value = count.value
        }

        let para = Number(route.params.select)

        if(para) {
            weekOrDay.value = 'day'
            if(para > arr.length) {
                reserveToggle.value = false
                para -= arr.length
                const { year:nyear, month:nmonth, arr:narr, currentDay:ncurrentDay } = handleCalendar(true)
                y.value = nyear
                m.value = nmonth
            }
            select.value = para
            count.value = para
            
        }
        onMounted(() => {
            for(let i = 0; i < arr.length; i++) {
                divs[i] = i
            }
        })
        onUpdated(() => {
            if(toggle) {
                if(select.value % 7 === 0) {
                    counter++
                    for(let i in divs.value) {
                        divs.value[i].style.transform = 'translateX(' + (-200 * counter) + 'px)'
                    }
                }
            } else if(!toggle) {
                if(select.value % 7 === 0) {
                    counter--
                    for(let i in divs.value) {
                        divs.value[i].style.transform = 'translateX(' + (-200 * counter) + 'px)'
                    }
                    
                }
            }
        })


        return { weekOrDay, select, changeSelect, currentDay,
                 y, m, backDate, nextDate, divs, test,
                storeData: computed(() => store.state.storeData) }
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
        height: 93%;
    }
    section.weekList {
        padding: 0 5px 10px;
        margin-bottom: 10px;
        background-color: white;
        white-space: pre;
        overflow: hidden;
    }
    section .slider {
        display: flex;
        position: relative;
        top: 29px;
        overflow: auto;
        margin-left: 3rem;
    }
    section .slider div {
        display: inline-block;
        flex: 1 1 0%;
        margin: 0 10px;
    }
    section .slider.canClick {
        cursor: pointer;
    }
    .sceContainer {
        overflow: auto;
        width: calc(100% + 20px);
        height: 540px;
    }


    .choose {
        padding: 5px 10px;
        color: white;
        border-radius: 10px;
        background-color: #7F74B4;
    }

</style>