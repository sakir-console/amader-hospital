<template>
  <div class="breadcrumb-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-8 col-12">

          <h2 class="breadcrumb-title">Profile</h2>
        </div>

      </div>
    </div>
  </div>

  <div class="content">
    <div class="container">

      <div class="call-wrapper">
        <div class="call-main-row">
          <div class="call-main-wrapper">
            <div class="call-view">
              <div class="call-window">

                <div class="fixed-header">
                  <div class="navbar">
                    <div class="user-details me-auto">
                      <div class="float-start user-img">
                        <a class="avatar avatar-sm me-2" href="" title="Charlene Reed">
                          <img :src="this.getDP(user)" class="rounded-circle">
                          <span class="status online"></span>
                        </a>
                      </div>
                      <div class="user-info float-start">
                        <a href=""><span>{{user.name}}</span></a>

                      </div>
                    </div>
                    <ul class="nav float-end custom-menu">
                      <li class="nav-item dropdown dropdown-action">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-list-ul"></i></a>
                        <div class="dropdown-menu dropdown-menu-end">
                          <a href="javascript:void(0)" class="dropdown-item">More</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="call-contents" style="background-image: url('/frontend/assets/img/bg.jpg'); background-repeat: no-repeat;
  background-size: 100% 120%;">
                  <div class="call-content-wrap">
                    <div class="voice-call-avatar">
                      <img :src="this.getDP(user)" class="call-avatar">
                      <span class="username">{{user.name}}</span>
                      <span class="call-timing-count">(@{{user.username}})</span>
                    </div>
                    <div class="call-users">
                      <ul>
                        <li>
                          <a href="#">
                            <img :src="this.getDP(user)" class="img-fluid">
                            <span class="call-mute"><i class="fa fa-user-check"></i></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>


                <div class="call-footer">
                  <div class="call-icons">
                    <ul class="call-items">
                      <li class="call-item">
                        <a href="#" title="Mute" data-placement="top" data-bs-toggle="tooltip">
                          <i class="fa fa-phone phone"></i>
                        </a>
                      </li>

                      <li class="call-item">
                        <a href="#" title="Enable Video" data-placement="top" data-bs-toggle="tooltip">
                          <i class="fas fa-video camera"></i>
                        </a>
                      </li>

                      <li class="call-item">
                        <a href="#" title="Add User" data-placement="top" data-bs-toggle="tooltip">
                          <i class="fa fa-comment-medical"></i>
                        </a>
                      </li>
                    </ul>
                    <div class="end-call">
                      <a href="javascript:void(0);">
                        <i class="material-icons">verified_user</i>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>






</template>

<script>


let urlParams = new URLSearchParams(window.location.search);
export default {
  name: "profile",

  data() {
    return {
      page: 1,
      is_doc:localStorage.getItem("is_dr") === "1",
      is_amb:localStorage.getItem("is_amb") === "1",
      is_adm:localStorage.getItem("is_adm") === "1",
      id: '',
      name: '',
      user: []
    }
  },
  methods: {
    //   FETCH request - AH
    viewUser() {
      this.axios.get("user/"+urlParams.get('user'))
          .then(response => {

            console.log((response.data))
            this.user = response.data.data
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },

  },
  mounted() {
    this.viewUser()
  }
}
</script>


<style scoped>

</style>