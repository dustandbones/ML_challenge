<template>
  <div>
    <topBar :productoBuscado="producto" />
    <template v-if="loading">
      <v-container>
        <v-layout mt-16>
          <v-flex class="text-lg-center">
            <v-progress-circular :size="50" indeterminate color="#ffe600"></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
    <template v-else-if="productos.length > 0">
      <v-container>
        <v-layout>
          <v-flex class="categoryAndFilter">
            <template v-for="(categoria, i) in categorias">
              {{categoria}}
              <template>
                <v-icon small :key="i" v-if="(i + 1 != categorias.length)">mdi-chevron-right</v-icon>
              </template>
            </template>
          </v-flex>
        </v-layout>
        <v-card>
          <template v-for="(elem, i) in productos">
            <div :key="i" @click="verDescripcion(elem.id)" class="pepe">
              <itemLista :datos="elem" />
            </div>
          </template>
        </v-card>
      </v-container>
    </template>
    <template v-else>
      <v-layout mt-16>
        <v-flex class="text-lg-center">
          <h3 color="#666666">{{msj}}</h3>
        </v-flex>
      </v-layout>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import topBar from "@/components/topBar.vue";
import itemLista from "@/components/itemListaProductos.vue";

export default {
  data: () => ({
    loading: false,
    producto: "", //search
    categorias: [],
    productos: [],
    msj: "Debe ingresar un producto para buscar!"
  }),
  components: {
    topBar,
    itemLista
  },
  mounted: function() {
    this.producto = this.$route.query.search;
    if (this.producto != "") this.obtenerProductos();
  },
  methods: {
    obtenerProductos() {
      this.loading = true;

      let servidorUrl = process.env.VUE_APP_API;
      let metodo = "api/items";
      let parametros = "?q=" + this.producto;

      let result = axios.get(servidorUrl + metodo + parametros, {});

      result
        .then(result => {
          console.log(result.data);
          if (result.data.msj != "No results found") {
            this.productos = result.data.items;
            this.categorias = result.data.categories;
          } else this.msj = "No se obtuvieron resultados para la búsqueda";
        })
        .catch(error => {
          console.log("error.response.status: ", error, error.response);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    verDescripcion(id) {
      document.location.href = "/items/" + id;
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
</style>