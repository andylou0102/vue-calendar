<template>
    <div v-for="i in 24" :key="i" class="scedule">
        <div class="timeArea">{{ `${i}:00` }}</div>
        <div class="actArea"
            :class="{ timePeriod: storeData[i-1][i][day-1].style}" >
                {{ storeData[i-1][i][day-1].data }}
        </div>
    </div>
    <button class="reserve"
            @click="showForm">
            + 新增預約</button>
    <Form v-show="formVisible" 
        @close="closeForm"
        @todo="recTodo"
        @date="recDate"
        @start="recStart"
        @end="recEnd" 
        @confirm="reserveSuccess"/>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Form from './Form.vue'
export default {
    props:['select'],
    components: { Form },
    setup(props) {

        const formVisible = ref(false)
        let active = ref('')
        let uDate = ref('')
        let startT = ref('')
        let endT = ref('')

        const day = computed(() => {
            return props.select
        })

        const store = useStore()

        function showForm() {
            formVisible.value = true
        }
        function closeForm() {
            formVisible.value = false
        }

        function recTodo(e) {
            active.value = e.target.value
        }
        function recDate(e) {
            uDate.value = e.target.value
        }
        function recStart(e) {
            startT.value = e.target.value
        }
        function recEnd(e) {
            endT.value = e.target.value
        }
        function reserveSuccess() {
            let date = uDate.value.split('-')[2].split('')
            if(date[0] === 0) {
                date = date[1]
            } else {
                date = date.join('')
            }
            date = Number(date)

            let s = startT.value.split(':')[0].split('')
            let e = endT.value.split(':')[0].split('')
            if(s[0] === 0) {
                s = s[1]
            } else {
                s = s.join('')
            }
            if(e[0] === 0) {
                e = e[1]
            } else {
                e = e.join('')
            }
            s = Number(s)
            e = Number(e)
            formVisible.value = false

            return store.commit({
                type: "setData",
                start: s,
                end: e,
                date: date,
                active: active.value
            })   
        }
        console.log(store.state.aMonth)
        return { showForm, closeForm, formVisible, day,
                recTodo, recDate, recStart, recEnd, reserveSuccess, 
                storeData: computed(() => store.state.storeData) }
    }

}
</script>

<style scoped>
    .scedule .timeArea{
        flex: 1;
    }
    .scedule .actArea{
        flex: 7;
    }
</style>