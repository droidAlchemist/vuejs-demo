<template>
  <div class="wrapper-boxed header-style-header-10">
    <Navbar></Navbar>

      <products-list></products-list>

      <login></login>

      <mini-cart></mini-cart>

      <Footer />

  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "home",
  components: {
    Login, Footer
  }
};
</script>

<style>



</style>

