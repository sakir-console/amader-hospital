<template>
  <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
    <div class="profile-sidebar">
      <div class="widget-profile pro-widget-content">
        <div class="profile-info-widget">
          <a href="#" class="booking-doc-img">
            <img :src="this.getDP(user)" alt="User Image">
          </a>
          <div class="profile-det-info">
            <h3>{{user.name}}</h3>
            <div class="patient-details">
              <h5><i class="fas fa-birthday-cake"></i> 24 Jul 1983, 38 years</h5>
              <h5 class="mb-0"><i class="fas fa-map-marker-alt"></i> {{user.addr}}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard-widget">
        <nav class="dashboard-menu">
          <ul>


            <li class="active">
              <router-link :to="{name:'myAccount'}">

            <i class="fas fa-users"></i>
                <span>Accounts Panel</span>
              </router-link>
            </li>


            <li>
              <router-link :to="{name:'profile'}">

              <i class="fas fa-user-cog"></i>
                <span>Profile Settings</span>
              </router-link>
            </li>

            <li>
              <router-link :to="{name:'appDr'}">

              <i class="fas fa-file-medical-alt"></i>
                <span>Apply as Doctor</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'appAmb'}">

              <i class="fas fa-car"></i>
                <span>Apply as Ambulance owner</span>
              </router-link>
            </li>
            <li>
              <a @click="logout" href="#">
                <i class="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>

</template>

<script>
export default {
name: "sidebar",
  data() {
    return {
      page: 1,
      id: '',
      name: '',
      user: []
    }
  },
  methods: {
    //   FETCH request - AH
    viewUser() {
      this.axios.get("user")
          .then(response => {
            console.log((response.data))
            this.user = response.data.data
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },
    logout() {
      this.axios.get("auth/logout")
          .then(response => {
            console.log((response.data))
            localStorage.removeItem('token')
            window.location.reload()
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    }
  },
  mounted() {
    this.viewUser()
  }
}
</script>

<style scoped>

</style>