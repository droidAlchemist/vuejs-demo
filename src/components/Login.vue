<template>
  <div class="login">
        <!-- Modal -->
        <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">

                <div class="modal-body login-container">


                        <ul class="nav nav-fill nav-pills border mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Register</a>
                            </li>
                        </ul>

                        <div class="tab-content mt-4" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">

                            <h2 class="text-center mb-4">Welcome Back!</h2>
                            <div class="form-group">
                                <label>Mobile Number</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">+91</div>
                                    </div>
                                    <input type="tel" v-model="mobile" class="form-control" placeholder="Enter mobile number">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" @keyup.enter="login" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>

                             <div class="form-group">
                                <button class="btn btn-block custom-btn btn-primary" @click="login">Login</button>
                            </div>

                        </div>
                        <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                            <form id="register-form">
                                <h2 class="text-center mb-4">Create New Account</h2>
                                
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" required v-model="name" @change="updateSignInButtonUI" class="form-control" id="name" placeholder="Enter your name">
                                </div>
                                

                                <div class="form-group">
                                    <label for="email">Email address</label>
                                    <input type="email" required  autocomplete="new-username" @change="updateSignInButtonUI" v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" required autocomplete="new-password" @change="updateSignInButtonUI" v-model="password" class="form-control" id="password" placeholder="Password">
                                </div>

                                <div class="form-group">
                                    <label>Mobile Number</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">+91</div>
                                        </div>
                                        <input type="tel" required v-model="mobile" @keyup="updateSignInButtonUI" class="form-control" id="phone-number" placeholder="Enter mobile number">
                                        <div class="input-group-append">
                                            <button disabled id="sign-up-button" class="btn btn-flat btn-primary text-uppercased" >Send SMS</button>
                                        </div>
                                    </div>
                                    <div id="recaptcha-container"></div>
                                </div>

                                

                                <div class="otp-container">

                                    <div class="form-group">
                                        <label for="exampleInputEmail1">OTP</label>
                                        <input type="tel" v-model="otp" @keyup="updateVerifyCodeButtonUI" class="form-control" id="verification-code"  placeholder="Enter enter OTP code">
                                    </div>

                                    <div class="form-group">
                                        <button disabled class="btn custom-btn btn-block btn-primary" id="verify-code-button" @click="onVerifyCodeSubmit">Register</button>
                                    </div>
                                </div>

                            </form>

                        </div>
                        </div>
                    
 
                </div>
           
            </div>
        </div>
        </div>
    
  </div>
</template>

<script>

import {fb,db, firebase} from '../firebase';



  
export default {
  name: "Login",
  props: {
    msg: String
  },
  data(){
      return {
          name:null,
          mobile:null,
          email:null,
          password:null,
          otp:null,
      }
  },

  mounted(){
      const self = this;

      // [START appVerifier]
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-up-button', {
            'size': 'invisible',
            'callback': () => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                console.log("captcha solved");
                self.onSignInSubmit();
            }
        });
        // [END appVerifier]

        window.recaptchaVerifier.render().then((widgetId) => {
            window.recaptchaWidgetId = widgetId;
            console.log(widgetId);
            // self.updateSignInButtonUI();
        });
    },

  methods:{

    onSignInSubmit() {
        console.log("submit");
        if (this.validateRegisterForm()) {
            window.signingIn = true;
            this.updateSignInButtonUI();
            var phoneNumber = "+91" + this.mobile;
            var appVerifier = window.recaptchaVerifier;
            fb.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    window.signingIn = false;
                    console.log("sms sent..");
                    this.updateSignInButtonUI();
                    this.updateVerificationCodeFormUI();
                    this.updateVerifyCodeButtonUI();
                }).catch((error) => {
                    // Error; SMS not sent
                    console.error('Error during signInWithPhoneNumber', error);
                    window.alert('Error during signInWithPhoneNumber');
                    window.signingIn = false;
                    this.updateSignInButtonUI();
            });
        }
    },

  onVerifyCodeSubmit() {
    
    if (!!this.otp) {
      window.verifyingCode = true;
      this.updateVerifyCodeButtonUI();
      var code = this.otp;
      confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        console.log("otp verified..");
        console.log(result);
        var user = result.user;
        window.verifyingCode = false;
        window.confirmationResult = null;
        this.updateVerificationCodeFormUI();
        this.register(user); 
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.error('Error while checking the verification code', error);
        window.alert('Error while checking the verification code:\n\n'
            + error.code + '\n\n' + error.message);
        window.verifyingCode = false;
        this.updateSignInButtonUI();
        this.updateVerifyCodeButtonUI();
      });
    }
  },

  updateVerificationCodeFormUI(){
    
    // if (!fb.auth().currentUser && window.confirmationResult) {
    //     $(".otp-container").removeClass("d-none");
    // } else {
    //     $(".otp-container").addClass("d-none");
    // }
  },

  validateRegisterForm() {
    var pattern = /^0{0,1}[1-9]{1}[0-9]{1,2}[\s]{0,1}[\-]{0,1}[\s]{0,1}[1-9]{1}[0-9]{6}$/;
    var phoneNumber = this.mobile;
    var isValid = false;
    var form = document.getElementById('register-form');

    if (phoneNumber && this.password && this.name) {
        phoneNumber = phoneNumber.replace('+91','');
        this.mobile = phoneNumber;
        isValid = phoneNumber.search(pattern) !== -1;
        console.log(isValid);
    } else {
        form.checkValidity();
        form.classList.add('was-validated');
    }
    

    return isValid;
  },

  resetReCaptcha() {
    if (typeof grecaptcha !== 'undefined'
        && typeof window.recaptchaWidgetId !== 'undefined') {
      grecaptcha.reset(window.recaptchaWidgetId);
    }
  },

  updateSignInButtonUI() {
    document.getElementById('sign-up-button').disabled = !this.validateRegisterForm() || !!window.signingIn;
  },

  updateVerifyCodeButtonUI() {
    document.getElementById('verify-code-button').disabled = !!window.verifyingCode || !this.otp;
  },
      login(){
          if (this.mobile == "admin") {
              if (this.password == "admin") {
                $('#login').modal('hide')                
                console.log("admin login..");

                localStorage.setItem('username', "admin");
                localStorage.setItem('is_admin', "1");
                localStorage.setItem('logged_in', "1"); 

                Toast.fire({
                    type: 'success',
                    title: 'LoggedIn successfully'
                });
                
                this.$router.replace('admin/products');
                
              } else {
                  Toast.fire({
                        type: 'error',
                        position: 'center',
                        title: 'Invalid username/password!'
                    });
              }
          } else {
              this.mobile = this.mobile.replace('+91','');
              db.collection("users").where("mobile", "==", this.mobile).where("password", "==", this.password).limit(1).get()
                .then((querySnapshot) => {
                    var name = "";
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        name = doc.data().name;
                    });

                    
                    if (querySnapshot.size > 0) {  
                        console.log(name);
                        localStorage.setItem('username', name);
                        localStorage.setItem('is_admin', "0");                      
                        localStorage.setItem('logged_in', "1");                      
                        $('#login').modal('hide');
                        
                        this.$router.replace('/products');

                        Toast.fire({
                            type: 'success',
                            position: 'center',
                            title: 'LoggedIn successfully'
                        });
                    } else {
                        // doc.data() will be undefined in this case
                        localStorage.setItem('username', "");
                        localStorage.setItem('is_admin', "0");                      
                        localStorage.setItem('logged_in', "0");    

                        console.log("No such document!");                        
                        alert('Wrong username/password.');
                    }                      
                })
                .catch(function(error) {
                    // Handle Errors here.
                    Toast.fire({
                        type: 'error',
                        position: 'center',
                        title: 'Wrong username/password!'
                    });
                    localStorage.setItem('username', "");
                    localStorage.setItem('is_admin', "0");                      
                    localStorage.setItem('logged_in', "0"); 
                    console.log(error);
            });
          }            
      },
      register(user){

        db.collection("users").doc(user.uid).set({
            name: this.name,
            email: this.email,
            mobile: this.mobile,
            password: this.password,

        }).then(function() {
            console.log("Document successfully written!");
            console.log("Registration completed!");

            $('#login').modal('hide');

            Toast.fire({
                type: 'success',
                position: 'center',
                title: 'Registration completed!'
            });
            
        })
        .catch(function(error) {
            $('#login').modal('hide');
            Toast.fire({
                type: 'error',
                position: 'center',
                title: 'Registration failed! Please Try again!'
            });
            console.error("Error writing document: ", error);
        });

      }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .login-container {
        
        padding: 40px;
        
    }

    .nav-pills .nav-link {
        font-size: 20px;
        padding: 10px;
    }

</style>
