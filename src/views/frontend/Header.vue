<template>

  <header class="header">
    <nav class="navbar navbar-expand-lg header-nav">
      <div class="navbar-header">
        <a id="mobile_btn">
            <span class="bar-icon bar-icon-one">
            <span></span>
            <span></span>
            <span></span>
            </span>
        </a>
        <a href="/" class="navbar-brand logo">
          <img :src="this.asset_url+'frontend/assets/img/logo.png'" class="img-fluid" alt="Logo">
        </a>

        <div v-if="isLogged" id="mobile_btn" href="javascript:void(0)" style="cursor: default;position: inherit;">
          <router-link :to="{name:'notifications'}">
          <button type="button" class="icon-button">
            <span class="material-icons">notifications</span>
            <span v-if="count!=0" class="icon-button__badge">{{count}}</span>
          </button>
          </router-link>
        </div>



      </div>
      <div class="main-menu-wrapper">
        <div class="menu-header">
<!--          <a href="/" class="menu-logo">
            <img :src="this.asset_url+'frontend/assets/img/logo.png'" class="img-fluid" alt="Logo">
          </a>-->
          <div v-if="isLogged">

            <router-link class="nav-link header-login btn-one-light" :to="{name:'myAccount'}"> <i class="fa fa-user-circle" style="
    font-size: 18px;
"></i> Account</router-link>

          </div>
          <a id="menu_close" class="menu-close">
            <i class="fas fa-times"></i>
          </a>


        </div>
        <ul class="main-nav">
          <li class="has-submenu active">
            <router-link :to="{name:'Home'}">{{ $t('home') }}</router-link>
          </li>

          <li class="has-submenu">
            <router-link :to="{name:'doctors'}">{{ $t('spe_drs') }}</router-link>

          </li>
          <li class="has-submenu">
            <router-link :to="{name:'hospitals'}">{{ $t('hospitals') }}</router-link>

          </li>
          <li class="has-submenu">
            <router-link :to="{name:'emergency'}">{{ $t('emergency') }}</router-link>

          </li>
          <li class="has-submenu">
            <router-link :to="{name:'blood'}">{{ $t('blood_bank') }}</router-link>

          </li>
          <li class="has-submenu">
            <router-link :to="{name:'ambulance'}">{{ $t('ambulance_service') }}</router-link>

          </li>
          <li class="has-submenu">
            <router-link :to="{name:'blog'}">{{ $t('hel_blg') }}</router-link>

          </li>


        </ul>
      </div>
      <ul class="nav header-navbar-rht">

        <li v-if="isLogged" class="nav-item dropdown has-arrow logged-item">
          <a @click.prevent="notificationSeen" class="dropdown-toggle nav-link" data-bs-toggle="dropdown">
            <button type="button" class="icon-button">
              <span class="material-icons">notifications</span>
              <span v-if="count!=0" class="icon-button__badge">{{count}}</span>
            </button>

          </a>
          <div class="dropdown-menu dropdown-menu-end">
            <div class="user-header">
              <router-link :to="{name:'notifications'}">

                <div class="user-text">
                  <h6>Notification Panel</h6>
                  <p class="text-muted mb-0">{{count}} New notifications</p>
                </div>

              </router-link>
            </div>
            <div v-for="(notification,index) in notificationData.data" :key="notification.id">
              <div v-if="index <= 5" style="
    border-bottom: 1px solid #80808021;
">
              <strong> <img :src="this.asset_url+'/frontend/assets/img/'+iconNotification(notification.source)"  style="width:40px;padding: 4px;" alt="Notification Image" width="140px">

              </strong>
              <a :href=linkNotification(notification.source,notification.object_id) class="alert-link">

                {{nameNotification(notification.source)}}



              </a>
              </div>
            </div>





            <router-link :to="{name:'notifications'}">
              <div class="user-header user-text">
                <h6 style="color: #09e5ab;">>>All Notifications</h6>

              </div>
            </router-link>

          </div>
        </li>


        <li v-if="!isLogged" class="nav-item dropdown logged-item">
          <router-link :to="{name:'login'}">
            <button type="button" class="icon-button">
              <span class="material-icons">account_circle</span>

            </button>

          </router-link>

        </li>

        <li v-if="isLogged" class="nav-item dropdown logged-item">
          <router-link :to="{name:'myAccount'}">
            <button type="button" class="icon-button">
              <span class="material-icons">account_circle</span>

            </button>

          </router-link>

        </li>
        <li class="nav-item">

          <router-link class="nav-link header-login btn-one-light" :to="{name:'dataLab'}">Data Center</router-link>

        </li>
        <li class="nav-item">
          <a v-if="!bn" class="nav-link header-four text-white badge-primary" href="" @click.prevent="changeLang('bn')">বাংলা</a>
          <a v-if="bn" class="nav-link header-banner text-white badge-primary" href=""
             @click.prevent="changeLang('en')">English</a>
        </li>


      </ul>
    </nav>
  </header>


</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      count:'0',
      page:1,
      loading: false,
      notificationData:[],
      language: null,
      bn: localStorage.getItem('lang') == 'bn' ? true : false,
      isLogged: false,

    }
  },
  methods: {
    changeLang(ln) {
      localStorage.setItem('lang', ln)
      window.location.reload()
    },

    notificationSeen() {
      // Notification request - AH
      this.axios.get("/notification/readall")
          .then(response => {
            if (response.data.success == true) {
              console.log((response.data))

            } else {
              this.toast(response.data.error, "", "danger")
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });


    },

    checkNotifications() {

      if(this.loading) return
      this.loading = true;

      // Notification read request - AH
      this.axios.get("/notification/1")
          .then(response => {
            if (response.data.success == true) {
              this.loading = false;
              console.log((response.data))
              this.notificationData = response.data;
              this.count = response.data.unseen;
              setInterval(this.checkNotifications,5000);
            } else {
              this.toast(response.data.error, "", "danger")
            }
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });


    },
    iconNotification(source){

      switch (source) {
        case 'blood_req':
          return 'blood-donation.png.'
          break;
        case 'blood_donated':
          return 'blood-transfusion.png'
          break;
        case 'doctor_req':
          return 'doctor.png'
          break;
        case 'emergency_req':
          return 'siren.png'
          break;
        case 'emergency_accepted':
          return 'accept.png'
          break;

        default:
          console.log(`Sorry, we are out of.`);
      }
    },

    linkNotification(source,obj){

      switch (source) {
        case 'blood_req':
          return 'blood?req='+obj
          break;
        case 'blood_donated':
          return 'blood?req='+obj
          break;
        case 'doctor_req':
          return 'https://admin.amaderhospital.com/doctor-list'
          break;
        case 'emergency_req':
          return 'view-emergency?id='+obj
          break;
        case 'emergency_accepted':
          return 'view-emergency?id='+obj
          break;

        default:
          console.log(`Sorry, we are out of.`);
      }
    },

    nameNotification(source){

      switch (source) {
        case 'blood_req':
          return 'You have new blood request.'
          break;
        case 'blood_donated':
          return 'A blood donor accepted your blood request!'
          break;
        case 'doctor_req':
          return 'Admin!! New Doctor request.'
          break;
        case 'emergency_req':
          return 'You have new Emergency request.'
          break;
        case 'emergency_accepted':
          return 'Your Emergency request has been accepted by a doctor'
          break;

        default:
          console.log(`Sorry, we are out of.`);
      }
    },

  },

  mounted() {

    if (localStorage.getItem('token') != null) {
      this.isLogged = true

      this.checkNotifications()
    } else {
      this.isLogged = false
    }

  }


}
</script>

<style scoped>

.icon-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 41px;
  height: 41px;
  color: #17a25f;
  background: #dddddd6e;
  border: none;
  outline: none;
  border-radius: 50%;
}

.icon-button:hover {
  cursor: pointer;
}

.icon-button:active {
  background: #cccccc;
}

.icon-button__badge {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 25px;
  height: 25px;
  background: red;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

</style>