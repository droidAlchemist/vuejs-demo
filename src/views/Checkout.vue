<template>
  <div class="chekout">
       <Navbar></Navbar>

        <div class="container mt-5 pt-5 pb-5">
            <h2 class="py-4 mb-2">Checkout</h2>

            <div class="row">

                <div class="col-md-6">                    
                     <ul>
                        <li v-for="item in this.$store.state.cart" class="media mb-4">
                          <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt="">

                          <div class="media-body">
                              <h5 class="mt-1">{{item.productName}}

                                  <span class='float-right close-btn' @click="$store.commit('removeFromCart',item)"><i class="fa fa-trash mb-1 text-danger"></i></span>

                              </h5>
                              <p class="m-0">₹ {{item.productPrice }}</p>
                              <p class="m-0">Quantity : {{item.productQuantity }}</p>
                          </div>
                        </li>

                    </ul>
                </div>
              </div>

              <hr>

              <div class="row">
                <div class="col-md-4">
                  <h3>Total</h3>
                  <p class="mt-3 price-total">
                      ₹ {{ this.$store.getters.totalPrice }}
                  </p>                                   
                    
                </div>
            </div>

          <hr/>

          <button class="checkout-button mt-3">Proceed</button>
            

        </div>

        <login></login>

        <Footer />
  </div>
</template>

<script>

import Login from "@/components/Login.vue";
import Footer from "@/components/Footer.vue";


export default {
    data () {
    return {
      complete: false,
      
    }
  },

  components: { Login, Footer },

  methods: {
    pay () {
      
    }
  }
}
</script>



<style scoped lang="scss">

.checkout-button {
  border: none;
  padding: 13px 15px;
  min-width: 150px;
  background: #313131;
  color: #fff;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  outline: none;
  font-size: 14px;
  font-weight: bold;
  }

.checkout-button:hover {
    background: #6eb48c;
    color: #fff;
}

.price-total {
  font-size: 20px;
}

.chekout {
  background: #f7f7f7;
}

.container {
  min-height: 800px;
}

.close-btn {
  cursor: pointer;
}

</style>

