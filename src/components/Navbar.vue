<template>
  
   <nav class="navbar shadow-sm custom-nav fixed-top navbar-expand-lg navbar-light bg-light p-0">
     <div class="container">
        <router-link class="navbar-brand" to="/">Sinoy's Kitchen</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            
          
          </ul>
          <form class="form-inline my-2 my-lg-0">
            

              <div v-if="this.$store.getters.getLoginStatus == '1'" class="dropdown my-nav-item">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" >
                  {{ this.$store.getters.getName }}
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
    
  
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  },

  methods:{      
      logout(){ 
        this.$store.commit('removeUser');
        this.$router.replace('/');
      }
  },
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
    line-height: 65px;
    text-transform: uppercase;
    display: inline-block;
    position: relative;
    font-weight: bold;
    text-decoration: none;
}

.dropdown-item {
  line-height: 2;
  letter-spacing: normal;
  text-transform: none;
}

.my-nav-item:before {
    content: "";
    position: absolute;
    bottom: 14px;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    left: 50%;
    height: 2px;
    width: 0;
    background: #ff7043;
}
.my-nav-item:hover:before {
    left: 0;
    width: 100%;
}
.my-nav-item:hover {
    color: #ff7043;
}


.my-nav-btn {
  color: #000;
}


.my-nav-item:hover, .my-nav-btn:hover {
  color: #ff7043 !important;
}


.dropdown:hover .dropdown-menu, 
.btn-group:hover .dropdown-menu { 
    display: block; 
} 
.dropdown-menu { 
    margin: auto; 
} 
.dropdown-toggle { 
    margin: auto; 
} 
.navbar .dropdown-toggle, 
.nav-tabs .dropdown-toggle { 
    margin: auto; 
} 

  @media (min-width: 992px) { 
    
    .navbar.custom-nav{
      padding-top:16px;
      padding-bottom:16px;
      background-color: #fff !important;
    }

   }

</style>
