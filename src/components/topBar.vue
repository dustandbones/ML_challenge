<template>
  <div>
    <v-app-bar app color="#FFE600">
      <v-container>
        <v-layout align-center>
          <v-flex lg1>
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-5"
              contain
              :src="logo"
              transition="scale-transition"
              width="54"
              @click="goHome"
            />
          </v-flex>
          <v-flex lg11>
            <v-text-field
              v-model="producto"
              solo
              label="Nunca dejes de buscar"
              append-icon="mdi-magnify"
              class="mt-7 search"
              @click:append="buscarProducto"
              @keyup="funcionTeclaEnter"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    logo: require("../assets/logo.png"),
    producto: ""
  }),
  props: ["productoBuscado"],
  components: {},
  methods: {
    funcionTeclaEnter(event) {
      if (event.keyCode == 13) this.buscarProducto();
    },
    buscarProducto() {
      if (this.producto != "") {
        document.location.href = "/items?search=" + this.producto;
      } else console.log("Nada");
    },
    goHome() {
      document.location.href = "/";
    }
  },
  watch: {
    productoBuscado: function() {
      console.log("productoBuscado: ", this.productoBuscado);
      this.producto = this.productoBuscado;
    }
  }
};
</script>

<style scoped>
.v-image {
  cursor: pointer;
}
.search {
  font-size: 18px !important;
}
.v-text-field input {
  font-size: 18px !important;
}
</style>