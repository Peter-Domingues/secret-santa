<template>
  <div class="background">
    <div class="grid-wrap" >
      <div class="myTitle my-5">
        Bem vindo ao Papai Noel Secreto!
      </div>
      <img src="santa.png" class="santa"/>
      <div class="myText my-2">
        Quantas pessoas vão participar este ano?
      </div>
      <div class="inputSelect">
        <v-select
          :items="maxParticipants"
          v-model="participants"
          label="Quantidade de participantes"
          solo
          @click:append="changeAction"
        ></v-select>
      </div>
      <div align="center">
          <v-btn
            x-large
            color="success"
            dark
            @click="changeAction(participants)"
          >
            Próximo
          </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'Home',
    data: () => ({
      maxParticipants: [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
      ],
      participants: 0,
    }),
    computed: {
      ...mapState({
        numOfParticipants: state => state.numOfParticipants
      })
    },
    methods: {
      changeAction(participants) {
        this.$store.dispatch("changeAction", Number(participants))
        this.$router.push('/participants');
      }
    }
  }
</script>

<style >
  @import url('https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Montagu+Slab:wght@100;400&family=Mountains+of+Christmas:wght@400;700&display=swap');

  .background{
    background-color: #8f1a1a;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 2%;
  }
  .myTitle {
    font-family: 'Mountains of Christmas', cursive;
    font-size: 45px;
  }
  .myText {
    font-family: 'Montagu Slab', serif;
    font-size: 20px;
  }
  .myTitle, .myText {
    text-align: center;
    color: #8f1a1a;
  }
  .grid-wrap {
    display: flex;
    flex-direction: column;
    height: fit-content;
    justify-content: center;
    align-content: center;
    margin: 0% 10%;
    background-color: white;
    padding: 2%;
    border-radius: 2vw;
  }
  .santa {
    width: 30%;
    align-self: center;
  }
  .inputSelect {
    align-self: center;
    width: 50%;
  }
</style>
