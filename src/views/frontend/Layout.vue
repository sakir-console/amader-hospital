<template>
  <div class="main-wrapper">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>

</template>

<script>
import Header from "@/views/frontend/Header";
import Footer from "@/views/frontend/Footer";
export default {
  name: "Layout",
  components: {Header,Footer}
}
</script>

<style scoped>

</style>