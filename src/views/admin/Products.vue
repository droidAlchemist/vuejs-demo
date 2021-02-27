<template>
  <div class="products">
      <div class="container">
          
        <div class="h-100">
            <div class="row h-100 justify-content-center align-items-center">
              <div class="col-md-6">
                    <h3>Products Page</h3>
                    
                 <p>
                   Here you can add, edit and delete your products.
                 </p>
              </div>
              <div class="col-md-6">
                  <img src="/img/svg/products.svg" alt="" class="img-fluid">
              </div>
            </div>
          </div>

          <hr>

          <div class="product-test">


            <h3 class="d-inline-block">Products list</h3>
            <button @click="addNew" class="btn btn-primary float-right">Add New Product</button>

            <div class="table-responsive mt-2">
              
                <table class="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price (₹)</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                      <tr v-for="(product, index) in products" :key="index">
                        <td class="align-middle">
                          {{ (index + 1) }}
                        </td>
                        <td>
                          <img :src="product.image" class="mr-2" alt="..." width="80px">
                        
                          {{product.name}}
                        </td>                        

                        <td class="align-middle">
                          {{product.price}}
                        </td>

                        <td class="align-middle">

                          <button class="btn btn-primary" @click="editProduct(product)">Edit</button>
                          <button class="btn btn-danger ml-2" @click="deleteProduct(product)">Delete</button>
                        </td>

                      </tr>


                  </tbody>
                </table>
            </div>

          </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <vue-editor v-model="product.description"></vue-editor>
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                       <label for="product_price">Product Price (₹)</label>
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>
                   


                    <div class="form-group">
                      <label for="product_image">Product Image</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>

                    <div class="form-group d-flex">
                      <div v-if="product.image" class="img-wrapp">
                          <img :src="product.image" class="popup-img" alt="" width="80px">
                          <span class="delete-img" @click="deleteImage()">X</span>
                      </div>
                      
                    </div>

                  </div>
                </div>




            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
              <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
            </div>
          </div>
        </div>
      </div>


    
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { fb, db} from '../../firebase';
export default {
  name: "Products",
  components: {
    VueEditor
  },
  props: {
    msg: String
  },
  data(){
    return {
        products: [],
        product: {
          name:null,
          description:null,
          price:null,
          image: null
        },
        activeItem:null,
        modal: null,
        tag: null,

        editorSettings: {
          disabled: true
      }
    }
  },
  firestore(){
      return {
        products: db.collection('products'),
      }
  },
  methods:{
    deleteImage(){
      let image = fb.storage().refFromURL(this.product.image);
      this.product.image = null;
      image.delete().then(function() {
        console.log('image deleted');
      }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log('an error occurred');
      });
    },
    uploadImage(e){
      if(e.target.files[0]){
        
          let file = e.target.files[0];
    
          var storageRef = fb.storage().ref('products/'+ Math.random() + '_'  + file.name);
    
          let uploadTask  = storageRef.put(file);
    
          uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot);

          }, (error) => {
            // Handle unsuccessful uploads
            console.log(error);
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log(downloadURL);
              this.product.image = downloadURL;
            });
          });
      }
    },
    reset(){
      this.product = {
          name:null,
          description:null,
          price:null,
          image: null
      }
    },
    addNew(){
        this.modal = 'new';
        this.reset();
        $('#product').modal('show');
    },
    updateProduct(){
        this.$firestore.products.doc(this.product.id).update(this.product);
          Toast.fire({
            type: 'success',
            title: 'Updated  successfully'
          })
           $('#product').modal('hide');
    },
    editProduct(product){
      this.modal = 'edit';
      this.product = product;
      $('#product').modal('show');
    },
    deleteProduct(doc){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$firestore.products.doc(doc.id).delete()
          Toast.fire({
            type: 'success',
            title: 'Deleted  successfully'
          })
        
        }
      })
        
    },
    readData(){
      
     
    },
    addProduct(){
      
      this.$firestore.products.add(this.product);
      
          Toast.fire({
            type: 'success',
            title: 'Product created successfully'
          })
      $('#product').modal('hide');
    }
  
  },
  created(){
  
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img-wrapp{
  position: relative;
}
img.popup-img {
  width: 90%;
}
.img-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    
}
.img-wrapp span.delete-img:hover{
  cursor: pointer;
}
</style>