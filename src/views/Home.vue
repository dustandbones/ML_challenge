<template>
  <div class="home">
    <topBar />
  </div>
</template>

<script>
// @ is an alias to /src
import topBar from "@/components/topBar.vue";

export default {
  name: "Home",
  components: {
    topBar
  }
};
</script>
