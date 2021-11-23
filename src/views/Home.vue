<template>
  <div class="background">
    <div class="grid-wrap">
      <v-alert type="error" class="error-next" v-if="noParticipants">
        <v-row align="center">
          <v-col class="grow">
            Erro! É necessário selecionar ao menos 3 participantes!
          </v-col>
        </v-row>
      </v-alert>
      <div class="my-title my-5">Bem vindo ao Papai Noel Secreto!</div>
      <img src="santa.png" class="santa" />
      <div class="my-text">Quantas pessoas vão participar este ano?</div>
      <div class="input-select">
        <v-select
          :items="maxParticipants"
          v-model="participants"
          label="Quantidade de participantes"
          solo
          @click:append="nextPage"
          color="success"
        ></v-select>
      </div>
      <div align="center">
        <v-btn
          x-large
          color="success"
          class="mb-5"
          dark
          @click="nextPage(participants)"
        >
          Próximo
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  data: () => ({
    maxParticipants: [
      3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    participants: 0,
    noParticipants: false,
  }),
  computed: {
    ...mapState({
      numOfParticipants: (state) => state.numOfParticipants,
    }),
  },
  methods: {
    nextPage(participants) {
      if (participants != 0) {
        this.$store.dispatch("changeAction", Number(participants));
        this.$router.push("/participants");
        this.noParticipants = false;
      } else {
        this.noParticipants = true;
        setTimeout(() => {
          this.noParticipants = false;
        }, 3000);
      }
    },
  },
};
</script>

<style >
@import url("https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montagu+Slab:wght@100;400&family=Mountains+of+Christmas:wght@400;700&display=swap");

.background {
  background-color: #8f1a1a;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2%;
}
.my-title {
  font-family: "Mountains of Christmas", cursive;
  font-size: 45px;
  color: #8f1a1a;
  font-size: clamp(32px, 5vw, 50px);
  margin: 3% 2%;
}
.my-text {
  font-family: "Montagu Slab", serif;
  font-size: clamp(17px, 5vw, 25px);
  color: #39853c;
  margin: 4% 0% 1% 0%;
}
.my-title,
.my-text {
  text-align: center;
}
.grid-wrap {
  display: flex;
  flex-direction: column;
  height: fit-content;
  justify-content: center;
  align-content: center;
  margin: 0% 5%;
  background-color: white;
  padding: 1%;
  border-radius: 1vw;
}
.santa {
  width: 22%;
  align-self: center;
  min-width: 150px;
}
.input-select {
  align-self: center;
  width: 50%;
}
.error-next {
  width: 100%;
  justify-self: center;
  align-self: center;
  margin: 0%;
}
@media only screen and (max-width: 600px) {
  .input-select {
    width: 100%;
    padding: 0% 5%;
  }
  .grid-wrap {
    margin: 0% 2%;
  }
  .my-title {
    padding: 2%;
  }
}
</style>
