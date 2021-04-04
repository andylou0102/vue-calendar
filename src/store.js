import Vue from 'vue';
import { createStore } from 'vuex';
import initialData from './functions/initialData'



const store = createStore({
    state: {
      storeData: initialData(false)
    },
    mutations: {
        setData(state, payload) {
            for(let j = 0; j < 24; j++) {
                for(let i = 0; i < state.storeData[0][1].length; i++) {
                    if(j + 1 === payload.start && state.storeData[j][j+1][i].id === payload.date ) {
                        state.storeData[j][j+1][i].data += payload.active
                        for(let k = payload.start; k <= payload.end; k++) {
                            state.storeData[k-1][k][i].style = true
                        }
                    }
                }
            }
        }
    }

})
export default store;