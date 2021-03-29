<template>
  <table class="scedule">
      <tr v-for="j in 24" :key="j">
          <td style="width: 50px; background-color: white;">{{ `${j}:00` }}</td>
          <td v-for="i in aMonth[0][1].length" 
              :key="i"
              :class="{ timePeriod: aMonth[j-1][j][i-1].style}" >
                {{ aMonth[j-1][j][i-1].data }}
          </td>   
      </tr>
  </table>
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
    components: { Form },
    setup() {
        const formVisible = ref(false)
        let active = ref('')
        let uDate = ref('')
        let startT = ref('')
        let endT = ref('')
        
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
        return { showForm, closeForm, formVisible, 
                recTodo, recDate, recStart, recEnd, reserveSuccess, 
                aMonth: computed(() => store.state.aMonth) }
    }
}
</script>

<style>
  .scedule {
      table-layout:fixed;
      padding: 5px;
      border-spacing: 10px;
      background-color: white;
  }
  .scedule tr {
      margin: 10px;
      text-align: left;
  }
  .scedule td {
      width: 80px;
      height: 70px;
      word-break: break-all;
      background-color: rgb(235, 235, 235);
  }
  .scedule td:hover {
      background-color: rgb(219, 219, 219);
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
      background-color: rgb(219, 219, 219);
  }
</style>