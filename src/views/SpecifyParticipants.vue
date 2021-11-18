<template>
      <div class="grid-wrap">
        <div class="text-h4 title red--text">
          O seu Papai Noel Secreto tem {{currentParticipant}} participantes!
        </div>
        <div class="text-h5 mt-10 mb-3 title">
          Escreva o nome de cada um
        </div>
        <div class="new-participant">
          <v-text-field
            label="Nome do Participante"
            v-model="newParticipantName"
            class="pa-3"
            outlined
            hide-details
            clearable
            @keyup.enter="addParticipant"
          ></v-text-field>
          <v-btn
              x-large
              color="success"
              dark
              @click="addParticipant"
            >
              <v-icon
                large
              >
                mdi-plus
              </v-icon>
            </v-btn>
        </div>
        <div align="center">
            <v-btn
              x-large
              color="success"
              dark
              @click="sort"
            >
              Sortear
            </v-btn>
            <v-btn
              x-large
              color="success"
              dark
              class="ml-5"
              @click="goBack"
            >
              Voltar
            </v-btn>
        </div>
        <v-list
      class="pt-0"
     >
       <div
        v-for="person in participantsList"
        :key="person.id"
        >
         <v-list-item>
          <template v-slot:default>
            <v-list-item-content>
              <v-list-item-title
              >
              {{person.name}}
              </v-list-item-title>
            </v-list-item-content>

             <v-list-item-action>
              <v-btn
                @click.stop="deleteParticipant(person.id)"
                icon
              >
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
       </div>
    </v-list>
      </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: 'Home',
    data() {
      return {
        newParticipantName: '',
        participantsList: []
      }
    },
    computed: {
      ...mapState({
        currentParticipant: state => state.currentParticipant
      })
    },
    methods: {
      goBack() {
        this.$router.push('/');
      },
      addParticipant(){
        let newParticipant = {
          id: Date.now(),
          name: this.newParticipantName
        }
        if(this.participantsList.length < this.currentParticipant && this.newParticipantName !== '')  {
          this.participantsList.push(newParticipant)
          this.newParticipantName = ''
        }else{
          console.log('Já foram todos os participantes')
        }
      },
      deleteParticipant(id) {
        this.participantsList = this.participantsList.filter(person => person.id != id)
      },
      sort(){
        let newParticipant = {
          name: this.newParticipantName
        }
        this.participantsList.push(newParticipant)
        this.newParticipantName = ''
        console.log(this.participantsList)
      },
    }
  }
</script>

<style >
  .title {
    text-align: center
  }
  .grid-wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-content: center;
    margin: 0% 10%;
  }
  .new-participant {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

