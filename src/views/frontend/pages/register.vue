<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 offset-md-2">

          <div class="account-content">
            <div class="row align-items-center justify-content-center">
              <div class="col-md-7 col-lg-6 login-left">
                <img :src="this.asset_url+'frontend/assets/img/login-banner.png'" class="img-fluid" alt="Doccure Login">
              </div>
              <div class="col-md-12 col-lg-6 login-right">
                <div class="login-header">
                  <h3>Registration করুন </h3>
                </div>
                <form  @submit.prevent="signUP">
                  <div class="form-group form-focus">
                    <input v-model="name" type="text" class="form-control floating">
                    <label class="focus-label">Name</label>
                  </div><div class="form-group form-focus">
                    <input v-model="email" type="email" class="form-control floating">
                    <label class="focus-label">ইমেইল</label>
                  </div><div class="form-group form-focus">
                    <label class="focus-label">Gender</label>
                  <input v-model="gender" type="radio" name="gender" value="male"> Male
                  <input v-model="gender" type="radio" name="gender" value="female"> Female

                </div><div class="form-group form-focus">
                    <input v-model="birth" type="date" class="form-control floating">
                    <label class="focus-label">Birth</label>
                  </div>
                  <div class="form-group form-focus">
                    <input  v-model="password" type="password" class="form-control floating">
                    <label class="focus-label">পাসওয়ার্ড</label>
                  </div>
                  <div class="form-group form-focus">
                    <input  v-model="confirm_password" type="password" class="form-control floating">
                    <label class="focus-label">Confirm পাসওয়ার্ড</label>
                  </div>

                  <button class="twoToneButton btn btn-primary w-100 btn-lg login-btn" type="submit">Registration করুন</button>
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
                  <div class="text-center dont-have">Already Registered
                    <router-link class="" :to="{name:'login'}">Sign In</router-link>
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
  name: "register",
  data() {
    return {
      name:'',
      email:'',
      gender:'',
      birth:'',
      password: '',
      confirm_password: '',
      result: false,
      msg: '',
      isLogged: false
    }
  },
  methods: {

    signUP() {
      let twoToneButton = document.querySelector('.twoToneButton');

      twoToneButton.innerHTML = "Sign up হচ্ছে";
      twoToneButton.classList.add('spinning');

      // Login request - AH
      this.axios.post("auth/register", this.pBody({
        "name": this.name,
        "email": this.email,
        "gender": this.gender,
        "birth": this.birth,
        "password": this.password,
        "confirm_password": this.confirm_password

      }))
          .then(response => {
            if (response.data.token!=null) {
              twoToneButton.innerHTML = "অপেক্ষা করুন";

              localStorage.removeItem('token')
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('is_dr', response.data.user.is_doctor);
              localStorage.setItem('is_amb', response.data.user.has_ambulance);
              console.log("Token stored: "+localStorage.getItem('token'))
              this.toast("Login successful","","success")
              window.location = "/my-account";


            }else{
              twoToneButton.classList.remove('spinning');
              twoToneButton.innerHTML = "Submit করুন";
              this.toast("Registration failed",response.data.error,"danger")
            }
          })
          .catch(error => {
            twoToneButton.classList.remove('spinning');
            twoToneButton.innerHTML = "Submit করুন";
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