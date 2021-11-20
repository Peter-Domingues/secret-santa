<template>
  <v-app>
    <v-app-bar app color="#8f1a1a" dark src="christmas.jpg" >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(0,0,0,.2), rgba(0,0,0,.1)"
        ></v-img>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
