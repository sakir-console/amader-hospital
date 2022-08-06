<template>

  <div>
    <div class="breadcrumb-bar">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-md-12 col-12">

            <h2 class="breadcrumb-title">Emergency patients</h2>

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
                <h4 class="mb-4">Emergency patients</h4>
                <div class="appointment-tab">

                  <div v-if="errors.length!=0" class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong>
                    <li style="text-transform: capitalize;" v-for="(error,index) in errors.fields">{{ index }}: {{ error }} </li>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>

                  <div class="tab-content">

                    <div class="tab-pane show active" id="upcoming-appointments">
                      <div class="card card-table mb-0">
                        <div class="card-body">
                          <div class="table-responsive">
                            <table class="table table-hover table-center mb-0">
                              <thead>
                              <tr>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Age</th>
                                <th>Symptoms</th>
                                <th></th>

                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="(emergency,index) in emergency_list.data" :key="emergency.id" :value="emergency.id">

                                <td>
                                  <h2 class="table-avatar">
                                    <a href="#">{{emergency.name}}
                                      <a :href="`/view-profile?user=`+emergency.uid"  class="d-block text-info"><span>Posted: {{emergency.username}}</span></a></a>
                                  </h2>
                                </td>
                                <td>{{emergency.gender}}</td>
                                <td>{{emergency.phone}}</td>
                                <td class="text-left">{{emergency.age}}</td>
                                <td class="text-left">{{emergency.symptoms}}</td>



                                <td v-if="parseInt(emergency.accepted)" class="text-end">
                                  <div class="table-action">
                                    <a v-bind:href=chatUrl+emergency.id class="btn btn-sm bg-success-light">
                                      <img :src="this.asset_url+'/frontend/assets/img/ptchat.png'"  style="width:40px;padding: 4px;" alt="Notification Image" width="140px">
                                      Patient Chat
                                    </a>
                                  </div>
                                </td>
                                <td class="text-end">
                                  <div class="table-action">
                                    <a v-bind:href=emerUrl+emergency.id class="btn btn-sm bg-warning-light">View
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
  name: "docEmergency",
  components: {docSidebar},
  data() {
    return {
      chatUrl:'/chat?echat=',
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
      this.axios.get("emergency?as=doctor&page="+this.page)
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
    },
  },
  mounted() {
    this.emergencyView()
  }
}
</script>

<style scoped>

</style>