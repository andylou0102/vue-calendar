import Vue from 'vue';
import { createStore } from 'vuex';
import initialData from './functions/initialData'



const store = createStore({
    state: {
      aMonth: initialData()
    },
    mutations: {
        setData(state, payload) {
            for(let j = 0; j < 24; j++) {
                for(let i = 0; i < state.aMonth[0][1].length; i++) {
                    if(j + 1 === payload.start && state.aMonth[j][j+1][i].id === payload.date ) {
                        state.aMonth[j][j+1][i].data += payload.active
                        for(let k = payload.start; k <= payload.end; k++) {
                            state.aMonth[k-1][k][i].style = true
                        }
                    }
                }
            }
            console.log(state.aMonth)
        }
    }

})
export default store;