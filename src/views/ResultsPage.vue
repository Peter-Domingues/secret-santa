<template>
  <v-main class="background">
    <v-container class="wrap">
      <v-row>
        <v-col class="results-text">
          <div class="my-title">Aqui estão os resultados do sorteio!</div>
          <div class="my-text">
            ATENÇÃO, abra apenas o cartão com o seu nome para descobrir quem
            você tirou!
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="n in finalListOfSecretSanta"
          :key="n.id"
          xm="1"
          lg="4"
          md="3"
        >
          <li v-on:click="toggleCard(n)">
            <transition name="flip">
              <p v-bind:key="n.flipped" :class="getClass(n)">
                {{ n.flipped ? n.secretSanta : n.name }}
              </p>
            </transition>
          </li>
        </v-col>
      </v-row>
      <v-row justify="center" class="mb-3">
        <v-btn x-large color="#c92727" dark class="ml-5" @click="goBack">
          Reiniciar
        </v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      cards: [
        {
          front: 'The "First Computer Programmer"',
          back: "Ada Lovelace",
          flipped: false,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      numOfParticipants: (state) => state.numOfParticipants,
      finalListOfSecretSanta: (state) => state.finalListOfSecretSanta,
    }),
  },
  methods: {
    toggleCard: function (n) {
      n.flipped = !n.flipped;
    },
    getClass: function (n) {
      return {
        "card front": n.flipped,
        "card back": !n.flipped,
      };
    },
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Montserrat", sans-serif;
  text-align: center;
}

ul {
  padding-left: 0;
  display: flex;
  flex-flow: row wrap;
}

li {
  list-style-type: none;
  padding: 10px 10px;
  transition: all 0.3s ease;
}

.card {
  display: block;
  padding: 80px 50px;
  border-radius: 7px;
  margin: 5px;
  text-align: center;
  line-height: 27px;
  cursor: pointer;
  position: relative;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  -webkit-box-shadow: 9px 10px 22px -8px rgba(209, 193, 209, 0.5);
  -moz-box-shadow: 9px 10px 22px -8px rgba(209, 193, 209, 0.5);
  box-shadow: 9px 10px 22px -8px rgba(209, 193, 209, 0.5);
  will-change: transform;
}

li:hover {
  transform: scale(1.1);
}

.front {
  background-color: #8f1a1a;
}

.back {
  background-color: #009514;
}
.flip-enter-active {
  transition: all 0.4s ease;
}

.flip-leave-active {
  display: none;
}

.flip-enter,
.flip-leave {
  transform: rotateY(180deg);
  opacity: 0;
}
.wrap {
  background-color: white;
  padding: 1%;
  border-radius: 1vw;
}

@media only screen and (max-width: 600px) {
  .container {
    width: 95%;
  }
  .results-text {
    margin: 3%;
  }
}
</style>
