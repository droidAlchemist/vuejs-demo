<template>
  <div class="wrapper-boxed header-style-header-10">
    <Navbar></Navbar>
    <div class="container-single-page container-default-page">
      <div id="main" class="penci-main-single-page-default">
        <div class="elementor elementor-6" >
          <div class="elementor-inner">
            <div class="elementor-section-wrap">
              <Hero />

              <section
                class="penci-section penci-disSticky penci-structure-22 elementor-element elementor-element-7d1b802 elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section"
                data-id="7d1b802"
                data-element_type="section"
              >
                <div class="elementor-container elementor-column-gap-wider">
                  <div class="elementor-row">
                    <div
                      class="penci-ercol-66 penci-ercol-order-1 penci-sticky-ct elementor-element elementor-element-3c4b99e elementor-column elementor-col-66 elementor-top-column"
                      data-id="3c4b99e"
                      data-element_type="column"
                    >
                      <div
                        class="theiaStickySidebar elementor-column-wrap elementor-element-populated"
                      >
                        <div class="elementor-widget-wrap">
                          <div
                            class="elementor-element elementor-element-bc6d11b elementor-widget elementor-widget-penci-fancy_heading"
                            data-id="bc6d11b"
                            data-element_type="widget"
                            data-widget_type="penci-fancy_heading.default"
                          >
                            <div class="elementor-widget-container">
                              <div
                                class="penci-fancy-heading penci-heading-text-left"
                              >
                                <div class="penci-fancy-heading-inner">
                                  <h2 class="penci-heading-title">Our Story</h2>
                                  <div
                                    class="penci-heading-content entry-content"
                                  >
                                    <p>
                                      Zomato, which started as Foodiebay, was established in July 2008 by two IIT Delhi alumnus, Deepinder Goyal, and Pankaj Chaddah. 
                                      The idea struck Deepinder when his colleagues consistently had a demand for paper menu leaflets of different restaurants, to order food.
                                      That's when he thought of converting these restaurant paper menus into a digital app, that is far more accessible and easier to use. 
                                      <br/>
                                      <br/>
                                      The online food delivery space in India is dominated by two big players- Zomato and Swiggy. 
                                      There are other players like Foodpanda, JustEat, TastyKhana and FoodMingo but the competition for the No 1 position is majorly confined between 
                                      Zomato and Swiggy, backed by big global investors and a large user base.
                                      <br/>
                                      <br/>
                                      The company, which had once decided not to expand its business, is aiming higher now. 
                                      Zomato had to rather pay a dear cost for keeping things put as it saw newbie Swiggy punch 
                                      holes in its dominance in the Indian food ordering space. In the firm's blog, co-founder Deepinder Goyal 
                                      shared his larger-than-life future plan of making Zomato the biggest farm to table food company in the world.
                                      <br/>
                                      <br/>
                                      Zomato is among the top start-ups in India and operates in about 23 countries including India, Australia, and the USA. In 2016, Zomato was valued at USD 1 billion.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="elementor-element elementor-element-095fda4 elementor-align-left elementor-widget elementor-widget-button"
                            data-id="095fda4"
                            data-element_type="widget"
                            data-widget_type="button.default"
                          >
                            <div class="elementor-widget-container">
                              <div class="elementor-button-wrapper">
                                <router-link
                                  to="/products"
                                  class="elementor-button-link elementor-button elementor-size-lg"
                                  role="button"
                                >
                                  <span
                                    class="elementor-button-content-wrapper"
                                  >
                                    <span class="elementor-button-text"
                                      >discover more</span
                                    >
                                  </span>
                                </router-link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="penci-ercol-33 penci-ercol-order-2 penci-sticky-sb penci-sidebarSC elementor-element elementor-element-b5a3c41 elementor-column elementor-col-33 elementor-top-column"
                      data-id="b5a3c41"
                      data-element_type="column"
                    >
                      <div
                        class="theiaStickySidebar elementor-column-wrap elementor-element-populated"
                      >
                        <div class="elementor-widget-wrap">
                          <div
                            class="elementor-element elementor-element-106a45e elementor-widget elementor-widget-image"
                            data-id="106a45e"
                            data-element_type="widget"
                            data-widget_type="image.default"
                          >
                            <div class="elementor-widget-container">
                              <div class="elementor-image">
                                <img
                                  src="/img/home/3-683x1024.jpg"
                                  class="attachment-large size-large"
                                  alt=""
                                  width="683"
                                  height="1024"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container h-100">
      <div
        class="row p-5 h-100 justify-content-center align-items-center"
      ></div>
    </div>
    <login></login>

    <mini-cart></mini-cart>

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import Login from "@/components/Login.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "home",
  components: {
    Hero,
    Login,
    Footer,
  },
};
</script>

<style>

@font-face {
  font-family: "Parisienne";
  src: url(../fonts/Parisienne-Regular.ttf) format("truetype");
}

@import "../assets/home.scss";


a:hover {
    text-decoration: none !important;
}

</style>

