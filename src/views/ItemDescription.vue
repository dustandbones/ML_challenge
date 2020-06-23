<template>
  <div>
    <topBar />
    <template v-if="loading">
      <v-container>
        <v-layout mt-16>
          <v-flex class="text-lg-center">
            <v-progress-circular :size="50" indeterminate color="#ffe600"></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
    <template v-else-if="msj != '' && msj == 'No results found'">
      <v-layout mt-16>
        <v-flex class="text-lg-center">
          <h3 color="#666666">Lo sentimos, No se encontro el Producto!</h3>
        </v-flex>
      </v-layout>
    </template>
    <template v-else>
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
          <v-layout class="itemContent">
            <v-flex lg8>
              <v-img
                alt="Vuetify Logo"
                class="shrink"
                contain
                :src="imagen"
                transition="scale-transition"
                max-width="680px"
                max-height="500px"
              />
            </v-flex>
            <v-flex lg3>
              <v-layout>
                <v-flex>
                  <label
                    class="itemConditionAndSold"
                  >{{condicion == 'new' ? 'Nuevo' : 'Usado'}} - {{ cantidadesVendidas }} vendidos</label>
                </v-flex>
              </v-layout>
              <v-layout mt-4>
                <v-flex>
                  <label class="itemName">{{ titulo }}</label>
                </v-flex>
              </v-layout>
              <v-layout mt-8 mb-8>
                <v-flex>
                  <span class="itemPrice">{{ monedaSimbolo }}{{ precio.toLocaleString() }}</span>
                  <span>{{decimales}}</span>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex lg12 mr-8>
                  <v-btn class="btn">Comprar</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex></v-flex>
          </v-layout>
          <v-layout>
            <v-flex lg7 class="itemDescriptionTitle" mt-8>
              <label>Descripción del producto</label>
            </v-flex>
          </v-layout>
          <v-layout class="itemDescription">
            <v-flex lg7>
              <!--<v-textarea v-model="descripcion" solo flat></v-textarea>-->
              <label>{{descripcion}}</label>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
    </template>
  </div>
</template>

<script>
import topBar from "@/components/topBar.vue";
import axios from "axios";

export default {
  data: () => ({
    idItem: "",
    loading: false,
    categorias: [],
    titulo: "",
    condicion: "",
    envioGratuito: "",
    precio: "",
    monedaSimbolo: "",
    decimales: "00",
    cantidadesVendidas: "",
    imagen: "",
    descripcion: "",
    msj: ""
  }),
  components: {
    topBar
  },
  mounted: function() {
    this.obtenerDescripcionProducto();
  },
  methods: {
    obtenerDescripcionProducto() {
      this.loading = true;
      this.idItem = this.$route.params.id; // guarda id item del param get url
      console.log(this.idItem, process.env.VUE_APP_API);

      let servidorUrl = process.env.VUE_APP_API;
      let metodo = "api/items/";
      let parametros = this.idItem;

      let result = axios.get(servidorUrl + metodo + parametros, {});

      result
        .then(result => {
          if (result.data.msj != "No results found") {
            this.titulo = result.data.item.title;
            this.condicion = result.data.item.condition;
            this.cantidadesVendidas = result.data.item.sold_quantity;
            this.descripcion = result.data.item.description;
            this.imagen = result.data.item.picture;
            this.categorias = result.data.categories;
            console.log(this.categorias, result, result.data.categories);
            this.precio = result.data.item.price.decimals;
            this.obtenerSimboloMoneda(result.data.item.price.currency);
          } else {
            this.msj = result.data.msj;
          }
        })
        .catch(error => {
          console.log("error.response.status: ", error, error.response);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    obtenerSimboloMoneda(moneda) {
      switch (moneda) {
        case "ARG":
          this.monedaSimbolo = "$";
          break;
        default:
          this.monedaSimbolo = "$";
          break;
      }
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

.itemConditionAndSold {
  color: #666666;
}

.itemName {
  font-size: 24px;
  color: #333333;
}

.itemPrice {
  font-size: 46px;
  color: #333333;
  float: left;
}

.decimal {
  float: left;
  font-size: 32px;
}

.itemDescriptionTitle {
  padding-left: 32px;
  font-size: 28px;
  color: #666666;
}

.itemDescription {
  padding: 32px 0 32px 32px;
  color: #999999;
}

.itemDescription label {
  font-size: 16px;
}

.btn {
  width: 100%;
  background-color: #3483fa !important;
  color: #ffffff;
}
</style>