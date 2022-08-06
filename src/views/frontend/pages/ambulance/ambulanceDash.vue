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

          <ambSidebar></ambSidebar>


          <div class="col-md-7 col-lg-8 col-xl-9">

            <div class="row patient-graph-col">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title">Ambulance panel</h4>
                  </div>
                  <div class="card-body pt-2 pb-2 mt-1 mb-1">
                    <div class="row">

                      <div class="col-12 col-md-6 col-lg-4 col-xl-3 patient-graph-box">
                        <a @click="updateLocation" href="#" class="graph-box sky-blue-graph" data-bs-toggle="modal"
                           data-bs-target="#graph3">
                          <div>
                            <h4>Update Current Location</h4>
                          </div>
                          <div class="graph-img">
                            <img :src="this.asset_url+'/frontend/assets/img/ambu.png'" alt="">
                          </div>
                          <div class="graph-status-result mt-3">
                            <span class="graph-update-date">Your current location.</span>
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
import ambSidebar from "@/components/frontend/ambSidebar";
export default {
  name: "ambulanceDash",
  components: {ambSidebar},
  data() {
    return {
      page: 1,
      id: '',
      name: '',
      user: []
    }
  },
  methods: {
    updateLocation() {
      // locations request - AH
      this.axios.post("ambulance/go", this.pBody({
        "lat":this.currentLocation.lat,
        "lng":this.currentLocation.lng,
      })).then(response => {
        console.log((response.data))

        if (response.data.success == true) {
          this.toast(response.data.message, "", "success")

        } else {
          this.toast(response.data.error, "", "danger")
        }

      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },
  }
}
</script>

<style scoped>

</style>