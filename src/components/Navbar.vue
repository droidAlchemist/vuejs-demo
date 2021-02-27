<template>
  <div class="hello">
   <nav class="navbar custom-nav fixed-top navbar-expand-lg navbar-light bg-light">
     <div class="container">
        <router-link class="navbar-brand" to="/">Vue Shop</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            
          
          </ul>
          <form class="form-inline my-2 my-lg-0">
            

              <div v-if="logged_in == '1'" class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" >
                  {{ name }}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" @click="logout()" href="#">Logout</a>                  
                </div>
              </div>
              
              <div v-else> 
                <a class="my-2 my-nav-item my-sm-0" data-toggle="modal" data-target="#login">Login</a>
              </div>
              <a class=" border-0 my-nav-btn ml-3 mx-2 my-2 my-sm-0" data-toggle="modal" data-target="#miniCart">
                <i class="fas fa-shopping-cart"></i>
              </a>
          </form>
        </div>

     </div>

</nav>
    
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  },
  data(){
    return {
        logged_in: localStorage.getItem('logged_in') || "0",
        name: localStorage.getItem('username') || "",
    }
  },
  methods:{      
      logout(){
        localStorage.setItem('username', "");
        localStorage.setItem('is_admin', "0");                      
        localStorage.setItem('logged_in', "0");   
        this.logged_in = "0";
        this.name = "";
        this.$router.replace('/');
      }
  },
  // mounted() {
  //   this.logged_in = Boolean(localStorage.getItem('logged_in'));      
  //   this.name = localStorage.getItem('username');
  //   console.log("navbar mounted");
  // },
  updated() {
    this.logged_in = localStorage.getItem('logged_in');        
    this.name = localStorage.getItem('username');
    console.log("navbar updated");
    console.log(this.logged_in);
  },
  components:{}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  #dropdownMenuButton {
    box-shadow: none;
  }

  .my-nav-item {
    font-family: 'Raleway', sans-serif;
    font-size: 13px;
    letter-spacing: 1px;
    color: #313131;
    
    text-transform: uppercase;
    display: inline-block;
    position: relative;
    font-weight: bold;
    text-decoration: none;
}

.my-nav-item:hover, .my-nav-btn:hover {
  color: #ff7043 !important;
}

  @media (min-width: 992px) { 
    
    .navbar.custom-nav{
      padding-top:16px;
      padding-bottom:16px;
      background-color: #fff !important;
    }

   }

</style>
