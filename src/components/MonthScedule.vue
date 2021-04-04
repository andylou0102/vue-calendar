<template>
  <div v-for="i in 24" :key="i" class="scedule">
      <div class="timeArea">{{ `${i}:00` }}</div>
      <div class="actArea" 
        v-for="j in 7" 
        :key="j"
        :class="{ timePeriod: storeData[i-1][i][date+j-2].style}" >
            {{ storeData[i-1][i][date+j-2].data }}
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
    props:[ 'select' ],
    components: { Form },
    setup(props) {
        const formVisible = ref(false)
        let active = ref('')
        let uDate = ref('')
        let startT = ref('')
        let endT = ref('')
        
        const store = useStore()
        const date = computed(() => {
            return props.select
        })

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
        return { showForm, closeForm, formVisible, date,
                recTodo, recDate, recStart, recEnd, reserveSuccess, 
                storeData: computed(() => store.state.storeData) }
    }
}
</script>

<style>
  .scedule {
      background-color: rgb(240, 240, 240);
      display: flex;
  }
  .scedule div {
      flex: 1 1 0%;
      width: 38px;
      height: 80px;
      word-break: break-all;
      border: 1px solid #ddd;
  }
  .scedule .actArea:hover {
      background-color: rgb(196, 196, 196);
  }
  .scedule .timeArea {
      border: none;
      border-bottom: 2px solid #ddd;
      line-height: 120px;
  }
  .reserve {
      border: none;
      font-size: 1.3rem;
      position: absolute;
      bottom: 50px;
      left: 130px;
      background-color: #7F74B4;
      color: white;
      padding: 10px 20px;
      border-radius: 20px;
      cursor: pointer;
  }
  .scedule .timePeriod {
      background-color: rgb(194, 194, 194);
  }
</style>