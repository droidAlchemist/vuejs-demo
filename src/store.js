import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let cart = window.localStorage.getItem('cart');
let current_user = window.localStorage.getItem('current_user');



export default new Vuex.Store({
  state: {
    cart: cart ? JSON.parse(cart) : [],
    current_user: current_user ? JSON.parse(current_user) : {},
  },

  getters: {
    totalPrice: state => {
      let total = 0;
      state.cart.filter((item) => {
        total += (item.productPrice * item.productQuantity);
      });

      return total;
    },
    getName: state => {
      let name = "";
      if (state.current_user && state.current_user.username) {
        name = state.current_user.username;
      }
      return name;
    },
    getLoginStatus: state => {
      let logged_in = "0";
      if (state.current_user && state.current_user.logged_in) {
        logged_in = state.current_user.logged_in;
      }
      return logged_in;
    },
    getAdminStatus: state => {
      let is_admin = "0";
      if (state.current_user && state.current_user.is_admin) {
        is_admin = state.current_user.is_admin;
      }
      return is_admin;
    },
  },

  mutations: {

    addToCart(state, item) {

      let found = state.cart.find(product => product.productId == item.productId);

      if (found) {
        found.productQuantity++;
      } else {
        state.cart.push(item);

      }

      this.commit('saveData');

    },

    saveData(state) {
      window.localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    removeFromCart(state, item) {

      let index = state.cart.indexOf(item);
      state.cart.splice(index, 1);
      this.commit('saveData');

    },


    addUser(state, item) {
      state.current_user = item;
      this.commit('saveUser');

    },

    removeUser(state) {
      state.current_user = {};
      this.commit('saveUser');

    },

    saveUser(state) {
      window.localStorage.setItem('current_user', JSON.stringify(state.current_user));
    },



  }

})