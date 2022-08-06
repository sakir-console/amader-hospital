<template>

  <div>
    <div class="breadcrumb-bar">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-md-12 col-12">

            <h2 class="breadcrumb-title">Doctor dashboard</h2>

          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="row">

        <docSidebar></docSidebar>

          <div class="col-md-7 col-lg-8 col-xl-9">
            <div class="row">
              <div class="col-md-12">
                <div class="card dash-card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-12 col-lg-4">
                        <div class="dash-widget dct-border-rht">
                          <div class="circle-bar circle-bar1">
                            <div class="circle-graph1" data-percent="75">
                              <img :src="this.asset_url+'/frontend/assets/img/icon-01.png'" class="img-fluid" alt="patient">
                            </div>
                          </div>
                          <div class="dash-widget-info">
                            <h6>Total Patient</h6>
                            <h3>1500</h3>
                            <p class="text-muted">Till Today</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12 col-lg-4">
                        <div class="dash-widget dct-border-rht">
                          <div class="circle-bar circle-bar2">
                            <div class="circle-graph2" data-percent="65">
                              <img :src="this.asset_url+'/frontend/assets/img/icon-02.png'" class="img-fluid" alt="Patient">
                            </div>
                          </div>
                          <div class="dash-widget-info">
                            <h6>Today Patient</h6>
                            <h3>160</h3>
                            <p class="text-muted">06, Nov 2022</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12 col-lg-4">
                        <div class="dash-widget">
                          <div class="circle-bar circle-bar3">
                            <div class="circle-graph3" data-percent="50">
                              <img :src="this.asset_url+'/frontend/assets/img/icon-03.png'" class="img-fluid" alt="Patient">
                            </div>
                          </div>
                          <div class="dash-widget-info">
                            <h6>Appoinments</h6>
                            <h3>85</h3>
                            <p class="text-muted">06, Apr 2022</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <h4 class="mb-4">Emergency patient</h4>
                <div class="appointment-tab">

                  <ul class="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                    <li class="nav-item">
                      <a class="nav-link active" href="#upcoming-appointments" data-bs-toggle="tab">Emergency</a>
                    </li>

                  </ul>

                  <div class="tab-content">

                    <div class="tab-pane show active" id="upcoming-appointments">
                      <div class="card card-table mb-0">
                        <div class="card-body">

                          <div v-if="errors.length!=0" class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Error!</strong>
                            <li style="text-transform: capitalize;" v-for="(error,index) in errors.fields">{{ index }}: {{ error }} </li>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                          </div>

                          <div class="table-responsive">
                            <table class="table table-hover table-center mb-0">
                              <thead>
                              <tr>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Date</th>
                                <th>Symptoms</th>
                                <th></th>

                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="(emergency,index) in emergency_list.data" :key="emergency.id" :value="emergency.id">
                                <td>
                                  <h2 class="table-avatar">
                                    <a :href="`/view-profile?user=`+emergency.uid" class="d-block text-info">{{emergency.name}}
                                      <span>@{{emergency.username}}</span></a>
                                  </h2>
                                </td>

                                <td>{{emergency.gender}}</td>
                                <td>{{emergency.age}}</td>

                                <td class="text-left">{{this.getTime(emergency.tstamp)}}</td>
                                <td class="text-left">{{emergency.symptoms}}</td>

                                <td class="text-end">
                                  <div class="table-action">
                                    <a v-bind:href=emerUrl+emergency.id class="btn btn-sm bg-warning-light">Full View
                                    </a>
                                  </div>
                                </td>
                                <td class="text-end">
                                  <div class="table-action">
                                    <a @click="acceptEmer(emergency.id)" href="#" class="btn btn-sm bg-success-light">
                                      <i class="fas fa-check"></i> Accept
                                    </a>
                                  </div>
                                </td>

                              </tr>

                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>



                  </div>
                </div>
                <div>
                  <ul class="pagination mb-4">
                    <li class="page-item disabled">
                      <a class="page-link" href="#" tabindex="-1">Pages:</a>
                    </li>
                    <li v-for="index in emergency_list['maxPage']" :key="index" :class="[(page == index) ? 'active':'']">
                      <a style="color: white;font-weight: 900;" class="page-link" href="#" @click="nextPage(index)">{{ index }}</a>
                    </li>

                  </ul>
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
import docSidebar from "@/components/frontend/docSidebar";
export default {
  name: "docDash",
  components: {docSidebar},
  data() {
    return {
      emerUrl:'/view-emergency?id=',
      errors:[],
      page: 1,
      id: '',
      name: '',
      emergency_list: []
    }
  },
  methods: {
    //   FETCH request - AH

    emergencyView() {

      this.loading = true;

      //request - AH
      this.axios.get("emergency/list?accepted=no&page="+this.page)
          .then(response => {
            this.loading = false;
            this.emergency_list=response.data
            if (response.data.data.length !== 0) {
              this.NoData = false
            } else {
              this.NoData = true
            }
            console.log((response.data))
            this.bloods = response.data
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    acceptEmer(id) {
      // locations request - AH
      this.axios.post("emergency/accept", this.pBody({
        "id":id
      })).then(response => {
        console.log((response.data))

        if (response.data.success == true) {
          this.toast(response.data.message, "", "success")
          this.emergencyView()
        } else {
          this.errors=response.data
          this.toast(response.data.error, "", "danger")
        }

      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },

    nextPage(pg) {
      this.page = pg
      this.emergencyView()
    }
  },
  mounted() {
    this.emergencyView()
  }
}
</script>

<style scoped>

</style>