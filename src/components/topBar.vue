<template>
  <div>
    <v-app-bar app color="#FFE600">
      <v-layout align-center>
        <v-flex lg1 offset-lg1>
          <v-layout>
            <v-flex lg6 offset-lg6>
              <v-img
                alt="Vuetify Logo"
                class="shrink mr-5"
                contain
                :src="logo"
                transition="scale-transition"
                width="40"
              />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex lg8>
          <v-text-field
            solo
            label="Nunca dejes de buscar"
            append-icon="mdi-magnify"
            class="mt-7"
            @click:append="buscarProducto"
            @keyup="funcionTeclaEnter"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    logo: require("../assets/logo.png")
  }),
  components: {},
  methods: {
    funcionTeclaEnter(event) {
      if (event.keyCode == 13) this.buscarProducto();
    },
    buscarProducto() {
      console.log("buscarProducto");
    }
  }
};
</script>

<style scoped>
</style>