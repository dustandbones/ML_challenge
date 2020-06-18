<template>
  <div>
    <topBar />
    <v-container>
      <v-layout>
        <v-flex class="categoryAndFilter">
          <template v-for="(categoria, i) in categorias">
            {{categoria}} {{i + 1}}
            <template v-show="(categorias.length < (i + 1))">
              <v-icon small :key="i">mdi-chevron-right</v-icon>
            </template>
          </template>
        </v-flex>
      </v-layout>
      <v-layout class="itemContent">
        <v-flex lg7>
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-5"
            contain
            :src="logo"
            transition="scale-transition"
          />
        </v-flex>
        <v-flex lg3></v-flex>
      </v-layout>
      <v-layout>
        <v-flex lg7 class="itemDescriptionTitle">
          <label>Descripción del producto</label>
        </v-flex>
      </v-layout>
      <v-layout class="itemDescription">
        <v-flex lg7 color="success">
          <label>asd</label>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import topBar from "@/components/topBar.vue";

export default {
  data: () => ({
    logo: require("../assets/logo.png"),
    categorias: [
      "Electrónica, Audio y Video",
      "Audio",
      "Equipos de DJ y Accesorios",
      "Luces y Efectos",
      "Lásers Profesionales"
    ]
    //filtros: ["iPod", "Reproductores", "iPod touch", "32 GB"]
  }),
  components: {
    topBar
  },
  mounted: function() {
    this.codigoVerificacion = this.$route.params.id;
    console.log(this.codigoVerificacion);
  },
  methods: {
    concatenadorCategorias(i) {
      let result = i + 1 < this.categorias.lenght ? "," : "";
      return result;
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 0;
}

.categoryAndFilter {
  padding: 16px 0;
  font-size: 14px;
}

.itemContent {
  padding-top: 32px;
}

.itemDescriptionTitle {
  padding-left: 32px;
  font-size: 28px;
}

.itemDescription {
  padding: 32px 0 32px 32px;
}

.itemDescription label {
  font-size: 16px;
}
</style>