<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 offset-md-2">

          <div class="account-content">
            <div class="row align-items-center justify-content-center">
              <div class="col-md-7 col-lg-6 login-left">
                <img :src="this.asset_url+'frontend/assets/img/login-banner.png'" class="img-fluid" alt="AmaderHospital Login">
              </div>
              <div class="col-md-12 col-lg-6 login-right">
                <div class="login-header">
                  <h3>লগইন করুন </h3>
                </div>
                <div v-if="errors.length!=0" class="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Error!</strong>
                  <li style="text-transform: capitalize;" v-for="(error,index) in errors.fields">{{ index }}: {{ error }} </li>
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <form  @submit.prevent="signIN">
                  <div class="form-group form-focus">
                    <input v-model="login" type="text" class="form-control floating">
                    <label class="focus-label">ইমেইল</label>
                  </div>
                  <div class="form-group form-focus">
                    <input  v-model="password" type="password" class="form-control floating">
                    <label class="focus-label">পাসওয়ার্ড</label>
                  </div>
                  <div class="text-end">
                    <a class="forgot-link" href="#">পাসওয়ার্ড ভুলে গেছেন ?</a>
                  </div>
                  <button class="twoToneButton btn btn-primary w-100 btn-lg login-btn" type="submit">প্রবেশ করুন</button>
                  <div class="login-or">
                    <span class="or-line"></span>
                    <span class="span-or">অথবা</span>
                  </div>
                  <div class="row form-row social-login">
                    <div class="col-6">
                      <a href="#" class="btn btn-facebook w-100"><i class="fab fa-facebook-f me-1"></i> ফেসবুক লগইন</a>
                    </div>
                    <div class="col-6">
                      <a href="#" class="btn btn-google w-100"><i class="fab fa-google me-1"></i> জিমেইল লগইন</a>
                    </div>
                  </div>
                  <div class="text-center dont-have">নতুন নিবন্ধন করুন
                    <router-link class="" :to="{name:'register'}">Sign up</router-link>
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
import {createToast} from "mosha-vue-toastify";
import 'mosha-vue-toastify/dist/style.css'

export default {
  name: "login",
  data() {
    return {
      errors:[],
      login: '',
      password: '',
      result: false,
      msg: '',
      isLogged: false
    }
  },
  methods: {

    signIN() {
      let twoToneButton = document.querySelector('.twoToneButton');

      twoToneButton.innerHTML = "লগইন হচ্ছে";
      twoToneButton.classList.add('spinning');

      // Login request - AH
      this.axios.post("auth/login", this.pBody({"login": this.login, "password": this.password}))
          .then(response => {
            if (response.data.token!=null) {
              twoToneButton.innerHTML = "অপেক্ষা করুন";

              localStorage.removeItem('token')
              localStorage.setItem("user", response.data.user.id)
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('nid', response.data.user.nid);
              localStorage.setItem('is_dr', response.data.user.is_doctor);
              localStorage.setItem('is_amb', response.data.user.has_ambulance);
              localStorage.setItem('is_adm', response.data.user.is_admin);
              console.log("Token stored: "+localStorage.getItem('token'))
              this.toast("Login successful","","success")

              setTimeout(()=>{
                if(response.data.user.is_admin){

                 // window.location = 'http://localhost:8081'+'/login-'+response.data.token;
                  window.location = '//admin.'+location.host+'/login-'+response.data.token;
                }else{
                  window.location = "/my-account";

                }
              }, 1000);

            }else{
              twoToneButton.classList.remove('spinning');
              twoToneButton.innerHTML = "প্রবেশ করুন";
              this.errors=response.data
               this.toast("Login failed",response.data.error,"danger")
            }
          })
          .catch(error => {
            twoToneButton.classList.remove('spinning');
            twoToneButton.innerHTML = "প্রবেশ করুন";
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    register() {
      // Signup request - AH
      this.axios.post("auth/register", this.pBody({"login": "sak@gmail.com", "password": "111223"}))
          .then(response => {
            console.log((response.data))
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
  },


}
</script>

<style scoped>
@media (max-width: 991px) {
  #myheader2 {
    display: none;
  }
  #myheader{
    display: none;
  }

}
.twoToneCenter {
  text-align: center;
  margin: 1em 0;
}
.twoToneButton {
  display: inline-block;
  outline: none;
  padding: 10px 20px;
  line-height: 1.4;
  background: #212121;
  background: linear-gradient(to bottom, #545454 0%, #474747 50%, #141414 51%, #1b1b1b 100%);
  border-radius: 4px;
  border: 1px solid #000000;
  color: #dadada;
  text-shadow: #000000 -1px -1px 0px;
  position: relative;
  transition: padding-right 0.3s ease;
  font-weight: 700;
  box-shadow: 0 1px 0 #6e6e6e inset, 0px 1px 0 #3b3b3b;
}
.twoToneButton:hover {
  box-shadow: 0 0 10px #080808 inset, 0px 1px 0 #3b3b3b;
  color: #f3f3f3;
}
.twoToneButton:active {
  box-shadow: 0 0 10px #080808 inset, 0px 1px 0 #3b3b3b;
  color: #ffffff;
  background: #080808;
  background: linear-gradient(to bottom, #3b3b3b 0%, #2e2e2e 50%, #141414 51%, #080808 100%);
}
.twoToneButton.spinning {
  background-color: #212121;
  padding-right: 40px;
}
.twoToneButton.spinning:after {
  content: '';
  right: 6px;
  top: 50%;
  width: 0;
  height: 0;
  box-shadow: 0px 0px 0 1px #080808;
  position: absolute;
  border-radius: 50%;
  -webkit-animation: rotate360 0.5s infinite linear, exist 0.1s forwards ease;
  animation: rotate360 0.5s infinite linear, exist 0.1s forwards ease;
}
.twoToneButton.spinning:before {
  content: "";
  width: 0px;
  height: 0px;
  border-radius: 50%;
  right: 6px;
  top: 50%;
  position: absolute;
  border: 2px solid #000000;
  border-right: 3px solid #27ae60;
  -webkit-animation: rotate360 0.5s infinite linear, exist 0.1s forwards ease;
  animation: rotate360 0.5s infinite linear, exist 0.1s forwards ease;
}
@-webkit-keyframes rotate360 {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotate360 {
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes exist {
  100% {
    width: 15px;
    height: 15px;
    margin: -8px 5px 0 0;
  }
}
@keyframes exist {
  100% {
    width: 15px;
    height: 15px;
    margin: -8px 5px 0 0;
  }
}
</style>