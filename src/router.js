import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Products from "./views/ViewProducts.vue";

import Admin from "./views/admin/Admin.vue";
import AdminProducts from "./views/admin/Products.vue";


Vue.use(Router);

const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/products",
      name: "products",
      component: Products
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: { requiresAuth: true, is_admin:true },
      children:[
        {
          path: "products",
          name: "admin-products",
          component: AdminProducts
        }        
      ]
    },
    {
      path: "/checkout",
      name: "checkout",

      component: () =>
        import("./views/Checkout.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const logged_in = localStorage.getItem('logged_in') ;
  const is_admin = localStorage.getItem('is_admin') ;

  // console.log(logged_in);
  // console.log(is_admin);

  if (requiresAuth && logged_in == "1" && is_admin != "1") {
      next('/')
  } else if (requiresAuth && logged_in == "1" && is_admin == "1") {
      next()
  } else {
      next()
  }
})

export default router;