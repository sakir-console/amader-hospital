<template>

  <div>
    <div class="breadcrumb-bar">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-md-12 col-12">

            <h2 class="breadcrumb-title">My Account</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="row">

          <sidebar></sidebar>
          <div class="col-md-7 col-lg-8 col-xl-9">
            <div class="row">
              <div class="col-lg-5 d-flex">
                <div class="card flex-fill">
                  <div class="card-header">
                    <div class="row">
                      <div class="col-sm-6">
                        <h3 class="card-title">Account</h3>
                      </div>
                      <div class="col-sm-6">
                        <div class="text-end">
                          <router-link :to="{name:'profile'}" title="Edit Profile" class="btn btn-primary btn-sm"><i class="fas fa-pencil"></i> Edit profile</router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="profile-view-bottom">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="info-list">
                            <div class="title">Account Name</div>
                            <div class="text" id="account_name">
                              {{user.name}}</div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="info-list">
                            <div class="title">My address</div>
                            <div class="text">  {{user.addr}}</div>

                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="info-list">
                            <div class="title">Phone number</div>
                            <div class="text">{{user.phone}}</div>

                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="info-list">
                            <div class="title">NID Number</div>
                            <div class="text">{{user.nid}}</div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-7 d-flex">
                <div class="card flex-fill">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="account-card bg-success-light">
                          <router-link :to="{name:'patientDash'}">  <span>Patient Panel </span>
                          </router-link>
                          (Me as Patient)
                        </div>
                      </div>
                      <div v-if="is_doc" class="col-lg-6">
                        <div class="account-card bg-info-light">
                          <router-link :to="{name:'doctorDash'}">
                          <span>Doctor's Panel</span>

                          </router-link>
                          (Me as Doctor)
                        </div>
                      </div>
                      <div v-if="is_amb" class="col-lg-6">
                        <div class="account-card bg-purple-light">
                          <router-link :to="{name:'ambulanceDash'}"> <span>Ambulance</span>
                          </router-link>
                            (Owner Panel)
                        </div>
                      </div>
                      <div v-if="is_adm" class="col-lg-6">
                        <div class="account-card bg-warning-light">
                          <a href="https://admin.amaderhospital.com"> <span>Admin panel</span>
                          </a>
                          Global admin
                        </div>
                      </div>
                      <!-- <div class="col-md-12 text-center">
                               <a href="#" class="btn btn-primary request_btn" data-bs-toggle="modal">Apply as Medi Activist</a>
                             </div>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex aos" data-aos="fade-up">
                <div class="looking-grid w-100 hvr-bounce-to-right">
                  <div class="looking-small-icon">
                    <i class="fas fa-user-md"></i>
                  </div>
                  <div class="looking-info">
                    <a href="" class="looking-link">Visit a Doctor</a>
                    <p>We hire the best specialists to deliver top-notch diagnostic services for you.</p>
                  </div>
                  <div class="looking-big-icon">
                    <i class="fas fa-user-md"></i>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 d-flex aos" data-aos="fade-up">
                <div class="looking-grid w-100 hvr-bounce-to-right">
                  <div class="looking-small-icon">
                    <i class="fas fa-ambulance"></i>
                  </div>
                  <div class="looking-info">
                    <a href="" class="looking-link">Find ambulance</a>
                    <p>We provide the a wide range of medical ambulance services opportunity.</p>
                  </div>
                  <div class="looking-big-icon">
                    <i class="fas fa-tablets"></i>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 d-flex aos" data-aos="fade-up">
                <div class="looking-grid w-100 hvr-bounce-to-right">
                  <div class="looking-small-icon">
                    <i class="fas fa-heartbeat"></i>
                  </div>
                  <div class="looking-info">
                    <a href="#" class="looking-link">Emergency blood</a>
                    <p> Complete your pre-reading and health history and get blood drive location.</p>
                  </div>
                  <div class="looking-big-icon">
                    <i class="fas fa-vial"></i>
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
import Sidebar from "@/components/frontend/sidebar";
export default {
  name: "myAccount",
  components: {Sidebar},
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