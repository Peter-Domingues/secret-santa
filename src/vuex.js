import Vue from "vue";
import Vuex from'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        currentParticipant : 0
    },
    mutations: {
        changeParticipant ( state, payload ) {
            state.currentParticipant = payload
        }
    },
    actions: {
        changeAction(context, currentParticipant) {
            context.commit("changeParticipant", currentParticipant);
        }
    }
})

export { store };