import Vue from "vue";
import Vuex from'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        numOfParticipants : 0,
        finalListOfSecretSanta: []
    },
    mutations: {
        changeParticipant ( state, payload ) {
            state.numOfParticipants = payload
        },
        changeFinalList ( state, payload ) {
            state.finalListOfSecretSanta = payload
        }
    },
    
    actions: {
        changeAction(context, numOfParticipants) {
            context.commit("changeParticipant", numOfParticipants);
        },
        finalListAction(context, finalListOfSecretSanta) {
            context.commit("changeFinalList", finalListOfSecretSanta);
        }
    }
})

export { store };