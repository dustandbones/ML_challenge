<template>
  <div>
    <v-layout>
      <v-flex shrink>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-5"
          contain
          :src="url"
          transition="scale-transition"
        />
      </v-flex>
      <v-flex lg8>
        <v-layout align-center>
          <v-flex class="price" shrink>
            <span>{{monedaSimbolo}} {{datos.price.decimals.toLocaleString()}}</span>
          </v-flex>
          <v-flex shrink>
            <template v-if="datos.free_shipping">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <img :src="shipping" v-on="on" />
                </template>
                <span>Envío Gratuito</span>
              </v-tooltip>
            </template>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex class="title">
            <span>{{datos.title}}</span>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="sate">
        <span>{{datos.state}}</span>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    url: "",
    shipping: require("../assets/ic_shipping.png"),
    monedaSimbolo: ""
  }),
  props: ["datos"],
  mounted: function() {
    this.url = this.datos.picture;
    this.obtenerSimboloMoneda(this.datos.price.currency);
  },
  methods: {
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
.v-image {
  width: 180px;
  height: 180px;
  margin: 16px;
  cursor: pointer;
}

.price {
  font-size: 24px;
  padding: 32px 8px 32px 0;
  color: #333333;
}

.title {
  font-size: 18px;
  cursor: pointer;
  color: #666666;
}

.sate {
  font-size: 12px;
  padding: 64px 0 0 0;
  color: #999999;
}
</style>