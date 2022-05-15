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
      </div>
      <div class="main-menu-wrapper">
        <div class="menu-header">
          <a href="/" class="menu-logo">
            <img :src="this.asset_url+'frontend/assets/img/logo.png'" class="img-fluid" alt="Logo">
          </a>
          <a id="menu_close" class="menu-close">
            <i class="fas fa-times"></i>
          </a>
        </div>
        <ul class="main-nav">
          <li class="has-submenu active">
            <a href="#">{{$t('home')}}</a>
          </li>

          <li class="has-submenu">
            <a href="#">{{$t('spe_drs')}} </a>

          </li>
          <li class="has-submenu">
            <a href="#">{{$t('hospitals')}}</a>

          </li>
          <li class="has-submenu">
            <a href="#">{{$t('emergency')}}  </a>

          </li>
          <li class="has-submenu">
            <a href="#">{{$t('ambulance_service')}} </a>

          </li>
          <li class="has-submenu">
            <a href="#">{{$t('hel_blg')}} </a>

          </li>



        </ul>
      </div>
      <ul class="nav header-navbar-rht">
        <li class="nav-item contact-item">
          <div class="header-contact-img">
            <i class="far fa-hospital"></i>
          </div>
          <div class="header-contact-detail">
            <p class="contact-header">{{$t('htLine')}}</p>
            <p class="contact-info-header"> +৮৮০১২৪৩৪৪৫</p>
          </div>
        </li>
        <li v-if="!isLogged" class="nav-item">

          <router-link class="nav-link header-login btn-one-light" :to="{name:'login'}">{{$t('LR')}}</router-link>

        </li>
        <li v-if="isLogged" class="nav-item">

          <router-link class="nav-link header-login btn-one-light" :to="{name:'myAccount'}">Account Panel</router-link>

        </li>

        <li class="nav-item">
          <a v-if="!bn" class="nav-link header-four text-white badge-primary" href="" @click.prevent="changeLang('bn')">বাংলা</a>
          <a v-if="bn" class="nav-link header-banner text-white badge-primary" href="" @click.prevent="changeLang('en')">English</a>
        </li>
      </ul>
    </nav>
  </header>


</template>

<script>
export default {
name: "Header",
  data(){
    return {
      language:null,
      bn:localStorage.getItem('lang')=='bn'?true:false,
      isLogged:false
    }
  },
  methods: {
    changeLang(ln) {
      localStorage.setItem('lang',ln)
      window.location.reload()
    }
  },

  mounted(){

    if (localStorage.getItem('token')!=null) {
      this.isLogged=true
    } else {
      this.isLogged=false
    }

  }


}
</script>

<style scoped>

</style>