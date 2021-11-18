<template>
      <div class="grid-wrap">
        <div class="text-h3 my-10 title">
          Bem vindo ao Papai Noel Secreto!
        </div>
        <div class="text-h6 mb-5 title">
          Quantas pessoas vão participar este ano?
        </div>
        <div>
          <v-select
            :items="numOfParticipants"
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
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'Home',
    data: () => ({
      numOfParticipants: [
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
      participants: 0
    }),
    computed: {
      ...mapState({
        currentParticipant: state => state.currentParticipant
      })
    },
    methods: {
      changeAction(participants) {
          this.$store.dispatch("changeAction", Number(participants))
        console.log(this.currentParticipant)
        this.$router.push('/about');
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
