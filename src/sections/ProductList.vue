<template>
  <section id="recipes" class="general-row">
    <div class="container">
      <div class="section-title">
        <h2>Discover Producs</h2>
        <p>
          Discover our products that match your unique tastes and diet preferences
        </p>
      </div>

      <div class="images-left-top">
        <img src="/img/products/img-back-top1.png" alt="" />
      </div>
      <div class="images-right-bottom">
        <img src="/img/products/food-plate-3.png" alt="" />
      </div>

      <div id="tabs0">
        

        
            <div class="row">
              <div class="col-md-4 mb-4" v-for="(product, index) in products" :key="index">
                <div class="item text-center">
                  <div class="img">
                    <img :src="product.image" alt="" />
                  </div>
                  <div class="details">
                    <h3>{{ product.name }}</h3>
                    
                    <div class="price">
                      <span>₹ {{ product.price  }}</span>
                    </div>
                    
                    <add-to-cart 
                        :image="product.image"
                        :p-id="product.id"
                        :price="product.price"
                        :name="product.name">
                    </add-to-cart>
                  </div>
                  
                </div>
              </div>
                            
            </div>
          
      </div>
    </div>
  </section>
</template>

<script>
import { db } from "../firebase";

export default {
  name: "Products-list",
  props: {
    msg: String,
  },

  data() {
    return {
      products: [],
    };
  },

  methods: {},

  firestore() {
    return {
      products: db.collection("products"),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

@import "../assets/product-list.scss";

#recipes .img img {
  width: 100%;
  height: 263px;
  vertical-align: top;
}

</style>
