<template>
  <div class="background">
    <div class="grid-wrap">
      <v-alert type="error" class="error-next" v-if="anError">
        <v-row align="center">
          <v-col class="grow">
            {{ errorMessage }}
          </v-col>
        </v-row>
      </v-alert>
      <div class="my-title">
        O seu Papai Noel Secreto tem {{ numOfParticipants }} participantes!
      </div>
      <img src="santa2.png" class="santa" />
      <div class="my-text">Escreva o nome de cada um</div>
      <div class="new-participant">
        <v-text-field
          color="success"
          label="Nome do Participante"
          v-model="newParticipantName"
          class="field-name"
          outlined
          hide-details
          clearable
          @keyup.enter="addParticipant"
        ></v-text-field>
        <div class="btn-add">
          <v-btn large color="success" dark @click="addParticipant" >
            <v-icon x-large> mdi-plus </v-icon>
          </v-btn>
        </div>
      </div>
      <div align="center" class="btn-specify">
        <v-btn x-large color="success" dark @click="selectParticipants">
          Sortear
        </v-btn>
        <v-btn x-large color="success" dark class="ml-5" @click="goBack">
          Voltar
        </v-btn>
      </div>
      <v-list class="pt-0 list-of-names">
        <div
          v-for="person in participantsList"
          :key="person.id"
        >
          <v-list-item>
            <template>
              <v-list-item-content>
                <v-list-item-title class="name-text">
                  {{ person.name }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn @click.stop="deleteParticipant(person.id)" icon>
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      newParticipantName: "",
      participantsList: [],
      match: [],
      unselectedParticipants: [],
      anError: false,
      errorMessage: "",
    };
  },
  computed: {
    ...mapState({
      numOfParticipants: (state) => state.numOfParticipants,
      finalListOfSecretSanta: (state) => state.finalListOfSecretSanta,
    }),
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    addParticipant() {
      let newParticipant = {
        id: Date.now(),
        name: this.newParticipantName,
        flipped: false,
      };
      if (this.participantsList.length >= this.numOfParticipants) {
        this.anError = true;
        this.errorMessage =
          "Erro! Você já adicionou o número maximo de participantes!";
        setTimeout(() => {
          this.anError = false;
        }, 3000);
      } else if (this.newParticipantName === "") {
        this.anError = true;
        this.errorMessage = "Erro! O nome não pode ficar vazio!";
        setTimeout(() => {
          this.anError = false;
        }, 3000);
      } else {
        var repeatedNameList = this.participantsList.filter(
          (part) => part.name === newParticipant.name
        );
        if (repeatedNameList.length == 0) {
          this.participantsList.push(newParticipant);
          this.newParticipantName = "";
        } else {
          this.anError = true;
          this.errorMessage = "Erro! Já existe um participante com este nome!";
          setTimeout(() => {
            this.anError = false;
          }, 3000);
        }
      }
    },
    deleteParticipant(id) {
      this.participantsList = this.participantsList.filter(
        (person) => person.id != id
      );
    },
    resetParticipants() {
      this.unselectedParticipants = [];
      this.participantsList.map((test) => {
        this.unselectedParticipants.push(test.name);
      });
      console.log(this.unselectedParticipants);
    },
    getRandomParticipant() {
      var randomIndex = Math.floor(
        Math.random() * this.unselectedParticipants.length
      );
      return this.getParticipantByName(
        this.unselectedParticipants[randomIndex]
      );
    },
    secretSantaIsValid(secretSanta, participant) {
      if (secretSanta.name === participant.name) {
        return false;
      }
      if (this.unselectedParticipants.indexOf(secretSanta.name) === -1) {
        return false;
      }
      return true;
    },
    getParticipantByName(name) {
      for (var i = 0; i < this.participantsList.length; ++i) {
        if (this.participantsList[i].name === name) {
          return this.participantsList[i];
        }
      }
      return null;
    },
    getNewSecretSanta(participant, isTheLast) {
      var secretSanta = this.getRandomParticipant();
      if (isTheLast) {
        return secretSanta;
      }
      if (this.secretSantaIsValid(secretSanta, participant)) {
        this.unselectedParticipants.splice(
          this.unselectedParticipants.indexOf(secretSanta.name),
          1
        );
        return secretSanta;
      }
      return this.getNewSecretSanta(participant, isTheLast);
    },
    selectParticipants() {
      this.resetParticipants();
      var lastParticipant;
      var secretSanta;
      this.participantsList.map((participant, index) => {
        secretSanta = this.getNewSecretSanta(
          participant,
          index === this.participantsList.length - 1
        );
        participant.secretSanta = secretSanta.name;
      });

      lastParticipant = this.participantsList[this.participantsList.length - 1];

      if (
        !this.secretSantaIsValid(
          this.getParticipantByName(lastParticipant.secretSanta),
          lastParticipant
        )
      ) {
        this.selectParticipants();
      }
      //console.log(this.participantsList)
      this.$store.dispatch("finalListAction", Object(this.participantsList));
      console.log(this.finalListOfSecretSanta);
      this.$router.push("/results");
    },
  },
};
</script>

<style >
.new-participant {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  align-self: center;
  margin-bottom: 2%;
}
.list-of-names {
  width: 50%;
  align-self: center;
}
.name-text {
  font-family: "Montagu Slab", serif;
  font-size: clamp(16px, 5vw, 20px);
  color: #39853c;
}
.btn-specify {
    margin-bottom:1%;
}
.btn-add {
  padding-left: 2%;
}
@media only screen and (max-width: 600px) {
 .new-participant {
    width: 100%;
    flex-direction: column;
    margin-bottom: 0%;
  }
  .btn-specify {
    margin:7% 2%;
  }
  .btn-add {
    margin-top: 5%;
    padding-left: 0%;
  }
}
</style>

