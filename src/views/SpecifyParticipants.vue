<template>
      <div class="grid-wrap">
        <div class="text-h5 my-10 title">
          Escreva o nome de cada Participante
        </div>
        <div 
          v-for="participants in currentParticipant"
          :key='participants'
        >
          <v-text-field
            label="Nome do Participante"
          ></v-text-field>
        </div>
        <div align="center">
            <v-btn
              x-large
              color="success"
              dark
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
      </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: 'Home',
    computed: {
      ...mapState({
        currentParticipant: state => state.currentParticipant
      })
    },
    methods: {
      goBack() {
        this.$router.push('/');
      }
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
</style>

