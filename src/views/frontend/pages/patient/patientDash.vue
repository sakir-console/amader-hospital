<template>

  <div>
    <div class="breadcrumb-bar">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-md-12 col-12">

            <h2 class="breadcrumb-title">Patient dashboard</h2>

          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="row">

          <patSidebar></patSidebar>


          <div class="col-md-7 col-lg-8 col-xl-9">
            <div class="row">
              <div class="col-12 col-md-6 col-lg-4 col-xl-3 patient-dashboard-top">
                <div class="card">
                  <div class="card-body text-center">
                    <div class="mb-3">
                      <img :src="this.asset_url+'/frontend/assets/img/specialities/pt-dashboard-01.png'" alt="" width="55">
                    </div>
                    <h5>Heart Rate</h5>
                    <h6>12 <sub>bpm</sub></h6>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-4 col-xl-3 patient-dashboard-top">
                <div class="card">
                  <div class="card-body text-center">
                    <div class="mb-3">
                      <img :src="this.asset_url+'/frontend/assets/img/specialities/pt-dashboard-02.png'" alt="" width="55">
                    </div>
                    <h5>Body Temperature</h5>
                    <h6>18 <sub>C</sub></h6>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-4 col-xl-3 patient-dashboard-top">
                <div class="card">
                  <div class="card-body text-center">
                    <div class="mb-3">
                      <img :src="this.asset_url+'/frontend/assets/img/specialities/pt-dashboard-03.png'" alt="" width="55">
                    </div>
                    <h5>Glucose Level</h5>
                    <h6>70 - 90</h6>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-4 col-xl-3 patient-dashboard-top">
                <div class="card">
                  <div class="card-body text-center">
                    <div class="mb-3">
                      <img :src="this.asset_url+'/frontend/assets/img/specialities/pt-dashboard-04.png'" alt="" width="55">
                    </div>
                    <h5>Blood Pressure</h5>
                    <h6>202/90 <sub>mg/dl</sub></h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="row patient-graph-col">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title">Graph Status</h4>
                  </div>
                  <div class="card-body pt-2 pb-2 mt-1 mb-1">
                    <div class="row">
                      <div class="col-12 col-md-6 col-lg-4 col-xl-3 patient-graph-box">
                        <a href="#" class="graph-box" data-bs-toggle="modal"
                           data-bs-target="#graph1">
                          <div>
                            <h4>BMI Status</h4>
                          </div>
                          <div class="graph-img">
                            <img :src="this.asset_url+'/frontend/assets/img/shapes/graph-01.png'" alt="">
                          </div>
                          <div class="graph-status-result mt-3">
                            <span class="graph-update-date">Last Update 6d</span>
                          </div>
                        </a>
                      </div>
                      <div class="col-12 col-md-6 col-lg-4 col-xl-3 patient-graph-box">
                        <a href="#" class="graph-box pink-graph" data-bs-toggle="modal"
                           data-bs-target="#graph2">
                          <div>
                            <h4>Heart Rate Status</h4>
                          </div>
                          <div class="graph-img">
                            <img :src="this.asset_url+'/frontend/assets/img/shapes/graph-02.png'" alt="">
                          </div>
                          <div class="graph-status-result mt-3">
                            <span class="graph-update-date">Last Update 2d</span>
                          </div>
                        </a>
                      </div>
                      <div class="col-12 col-md-6 col-lg-4 col-xl-3 patient-graph-box">
                        <a href="#" class="graph-box sky-blue-graph" data-bs-toggle="modal"
                           data-bs-target="#graph3">
                          <div>
                            <h4>FBC Status</h4>
                          </div>
                          <div class="graph-img">
                            <img :src="this.asset_url+'/frontend/assets/img/shapes/graph-03.png'" alt="">
                          </div>
                          <div class="graph-status-result mt-3">
                            <span class="graph-update-date">Last Update 5d</span>
                          </div>
                        </a>
                      </div>
                      <div class="col-12 col-md-6 col-lg-4 col-xl-3 patient-graph-box">
                        <a href="#" class="graph-box orange-graph" data-bs-toggle="modal"
                           data-bs-target="#graph4">
                          <div>
                            <h4>Weight Status</h4>
                          </div>
                          <div class="graph-img">
                            <img :src="this.asset_url+'/frontend/assets/img/shapes/graph-04.png'" alt="">
                          </div>
                          <div class="graph-status-result mt-3">
                            <span class="graph-update-date">Last Update 3d</span>
                          </div>
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
  </div>
</template>

<script>
import patSidebar from "@/components/frontend/patSidebar";
export default {
  name: "patientDash",
  components: {patSidebar},
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