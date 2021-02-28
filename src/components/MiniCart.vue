<template>
  <div class="mini-cart">
   
        <!-- Modal -->
        <div class="modal fade" id="miniCart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">My Bag</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <ul v-if="this.$store.getters.totalPrice > 0">
                    <li v-for="(item, index) in this.$store.state.cart" class="media mb-4" :key="index">
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
                  <ul v-else>
                    <li><p class="p-1">Your cart is empty!</p></li>
                  </ul>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Continue Shopping</button>
                <button v-if="this.$store.getters.totalPrice > 0" type="button" class="btn btn-checkout" @click="checkout">Checkout</button>
              </div>
            </div>
          </div>
        </div>

    
  </div>
</template>

<script>
export default {
  name: "MiniCart",
  props: {
    msg: String
  },
  methods:{

    checkout(){
      $('#miniCart').modal('hide')
      this.$router.push('/checkout')  
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.close-btn {
  cursor: pointer;
}

.btn-checkout {
  background-color: #ff7043;
  color: #fff;
}

</style>
