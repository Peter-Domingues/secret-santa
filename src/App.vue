<template>
  <v-app>
   <v-app-bar
      app
      color="primary"
      dark
      src="christmas.jpg"
      prominent
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(0,0,0,.2), rgba(0,0,0,.1)"
        ></v-img>
      </template>
    </v-app-bar>  

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>
