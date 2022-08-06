<template>

  <div class="breadcrumb-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-8 col-12">

          <h2 class="breadcrumb-title">Blood bank</h2>
        </div>

      </div>
    </div>
  </div>


  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 col-lg-4 col-xl-3 theiaStickySidebar">

          <div class="card search-filter">
            <div class="card-header">
              <h4 class="card-title mb-0">Find Blood</h4>
            </div>
            <div class="card-body">

              <div class="filter-widget">
                <h4>Select Blood Group</h4>


                <div class="form-group row">
                  <label class="col-lg-3 col-form-label" style="font-size: 12px;">Blood Group</label>
                  <div class="col-lg-9">
                    <select v-model="bg" class="form-select">
                      <option value="A+"> (A+)</option>
                      <option value="A-"> (A-)</option>
                      <option value="B+"> (B+)</option>
                      <option value="B-"> (B-)</option>
                      <option value="O+"> (O+)</option>
                      <option value="O-"> (O-)</option>
                      <option value="AB+"> (AB+)</option>
                      <option value="AB-"> (AB-)</option>

                    </select>
                  </div>
                </div>

              </div>
              <div class="filter-widget">
                <h4>Select Location</h4>


                <div class="form-group row">
                  <label class="col-lg-3 col-form-label" style="font-size: 12px;">District</label>
                  <div class="col-lg-9">
                    <select v-model="parent_dis" @change="getTha(parent_dis)" class="form-select">
                      <option v-for="(district,index) in districts.data" :key="district.id"
                              :value="district.id">{{ district.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label" style="font-size: 12px;">Upazila</label>
                  <div class="col-lg-9">
                    <select v-model="parent_tha" @change="selTha(parent_tha)" class="form-select">
                      <option v-for="(thana,index) in thanas.data" :key="thana.id" :value="thana.id">
                        {{ thana.name }}
                      </option>
                    </select>
                  </div>
                </div>


              </div>

              <div class="btn-search">
                <button @click="bloodView" type="button" class="btn w-100">Search</button>
              </div>
            </div>
          </div>

        </div>
        <div class="col-md-7 col-lg-8 col-xl-9">

          <div class="card" style="background: #fff0e9a8;border: 1px solid #f7ab8b;">
            <div class="card-body">
              <div class="xdoctor-widget">
                <form @submit.prevent="bloodPost">
                  <div class="row form-row">
                    Blood request..
                    <hr>
                    <div class="col-12 col-md-4">
                      <div class="form-group">
                        <label>Blood Group</label>
                        <select v-model="br_bg" class="form-select">
                          <option value="A+"> (A+)</option>
                          <option value="A-"> (A-)</option>
                          <option value="B+"> (B+)</option>
                          <option value="B-"> (B-)</option>
                          <option value="O+"> (O+)</option>
                          <option value="O-"> (O-)</option>
                          <option value="AB+"> (AB+)</option>
                          <option value="AB-"> (AB-)</option>

                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-md-4">
                      <div class="form-group">
                        <label>Needed Time</label>
                        <input v-model="br_date" type="datetime-local" name="" class="form-control">
                      </div>
                    </div>

                    <div class="col-12 col-md-4">
                      <div class="form-group">
                        <label>Bags</label>
                        <input v-model="br_bags" type="number" class="form-control">
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>District</label>
                        <div class="col-lg-12">
                          <select v-model="br_parent_dis" @change="getTha(br_parent_dis)" class="form-select">
                            <option v-for="(district,index) in districts.data" :key="district.id"
                                    :value="district.id">{{ district.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Upazila</label>
                        <div class="col-lg-12">
                          <select v-model="br_parent_tha" @change="selTha(br_parent_tha)" class="form-select">
                            <option v-for="(thana,index) in thanas.data" :key="thana.id" :value="thana.id">
                              {{ thana.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>


                    <div v-if="errors.length!=0" class="alert alert-danger alert-dismissible fade show" role="alert">
                      <strong>Error!</strong>
                      <li style="text-transform: capitalize;" v-for="(error,index) in errors.fields">{{ index }}: {{ error }} </li>
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  </div>

                  <div class="submit-section">
                    <button type="submit" class="btn btn-primary submit-btn" style="margin-left: 84%;">Add Request</button>
                  </div>
                </form>

              </div>
            </div>
          </div>


          <div v-if="loading" class="row ">
            <div class="col-md-12">
              <div class="pagination-tab mt-md-5 d-flex justify-content-center">
                <div>
                  <div class="circle-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                </div>
              </div>
            </div>
          </div>


          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Blood Bank</h4>
              </div>
              <div class="card-body">
                <ul class="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
                  <li class="nav-item"><a class="nav-link active" href="#solid-rounded-justified-tab1" data-bs-toggle="tab">Blood Donors</a></li>
                  <li class="nav-item"><a class="nav-link" href="#solid-rounded-justified-tab2" data-bs-toggle="tab">Emergency Blood request</a></li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane active" id="solid-rounded-justified-tab1">

                    <h1 v-if="NoData">No Blood Found! 😢</h1>
                    <div>
                      <div v-for="(blood,index) in bloods.data" :key="blood.id" class="card">
                        <div class="card-body">
                          <div class="doctor-widget">
                            <div class="doc-info-left">
                              <div class="doctor-img">
                                <a href="">
                                  <img :src="this.asset_url+'/frontend/assets/img/bg.png'" class="img-fluid" alt="User Image">
                                </a>
                              </div>
                              <div class="doc-info-cont" style="margin-bottom: 8px;">
                                <h4 class="doc-name"><a href="#">{{ blood.blood_rh }}</a></h4>
                                <div class="rating">
                                  <i class="fas fa-star filled"></i>
                                  <i class="fas fa-star filled"></i>
                                  <i class="fas fa-star filled"></i>
                                  <i class="fas fa-star filled"></i>
                                  <i class="fas fa-star filled"></i>
                                  <!--                      <span class="d-inline-block average-rating">(*)</span>-->
                                </div>

                                <p class="doc-speciality"><i class="fas fa-phone"></i> {{ blood.phone }}</p>


                                <div class="clinic-services">
                                 <a :href="`/view-profile?user=`+blood.uid"> <span style="background: #def9ff;">{{ blood.name }}</span>
                                  </a>
                                </div>

                              </div>
                            </div>
                            <div class="doc-info-right">
                              <div class="clini-infos">
                                <div class="clinic-services">
                        <span
                            style="background: rgb(205, 255, 190); border: 1px solid rgb(89 218 89); border-radius: 18px; display: inline-block; padding: 5px 25px;  font-size: 25px; margin-top: 19%;color: #515151;">{{
                            blood.bags
                          }} Bags</span>

                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="load-more text-center" v-if="!NoData">
                      <div>
                        <ul class="pagination mb-4">
                          <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1">Pages:</a>
                          </li>
                          <li v-for="index in bloods['maxPage']" :key="index" :class="[(page == index) ? 'active':'']">
                            <a style="color: white;font-weight: 600;color:#15558d" class="page-link" href="#"
                               @click="nextPage(index)">{{
                                index
                              }}</a>
                          </li>

                        </ul>
                      </div>
                    </div>


                  </div>
                  <div class="tab-pane" id="solid-rounded-justified-tab2">
                    <div v-if="br_errors.length!=0" class="alert alert-danger alert-dismissible fade show" role="alert">
                      <strong>Error!</strong>
                      <li style="text-transform: capitalize;" v-for="(error,index) in br_errors.fields">{{ index }}: {{ error }} </li>
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    <div>
                      <div v-for="(blood_req,index) in blood_reqs.data" :key="blood_req.id" class="card">

                        <a v-bind:href=bloodReqUrl+blood_req.id onmouseover="this.style='background-color:#f8f8f8;';" onmouseout="this.style='background-color:white';">

                        <div class="card-body">
                          <div class="doctor-widget">
                            <div class="doc-info-left">
                              <div class="doctor-img">
                                <a href="">
                                  <img :src="this.asset_url+'/frontend/assets/img/br.png'" class="img-fluid" alt="User Image">
                                </a>
                              </div>
                              <div class="doc-info-cont" style="margin-bottom: 8px;">
                                <h4 class="doc-name"><a v-bind:href=bloodReqUrl+blood_req.id>{{ blood_req.blood_group }}</a></h4>


                                <a :href="`/view-profile?user=`+blood_req.uid"> <p class="doc-speciality"><i class="fa fa-align-right"></i> Posted: {{ blood_req.name }} </p></a>
                                <p class="doc-speciality"><i class="fa fa-align-right"></i> Needed time: {{ blood_req.needed_at }} </p>
                                <p class="doc-speciality"><i class="fa fa-align-right"></i> Place: {{ blood_req.thana_name }} </p>





                              </div>
                            </div>
                            <div class="doc-info-right">
                              <div class="clini-infos">
                                <div class="clinic-servicesx" style="">

                                  <p class="doc-speciality"><i class="fa fa-align-right"></i> Found: {{ blood_req.found_bags }} bag</p>
                                  <hr>

                                  <p class="doc-speciality"><i class="fa fa-align-right"></i> Needed: {{ blood_req.needed_bags }} bag</p>


                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                        </a>

                      </div>
                    </div>
                    <div>
                      <ul class="pagination mb-4">
                        <li class="page-item disabled">
                          <a class="page-link" href="#" tabindex="-1">Pages:</a>
                        </li>
                        <li v-for="index in blood_reqs['maxPage']" :key="index" :class="[(br_page == index) ? 'active':'']">
                          <a style="color: white;font-weight: 600;color:#15558d" class="page-link" href="#"
                             @click="nextPageBR(index)">{{
                              index
                            }}</a>
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
    </div>

  </div>

</template>

<script>
export default {
  name: "blood",
  data() {
    return {
      //Basic
      bloodReqUrl:'/blood?req=',
      errors:[],
      br_errors:[],
      loading: false,
      NoData: false,
      page: 1,
      br_page: 1,
      donor_bag:[],
      br_date:'',
      br_bg: '',
      br_bags: '',
      bg: '',
      bloods: [],
      blood_reqs: [],

      //Location:

      parent: '0',
      parent_con: '',
      br_parent_dis: '',
      br_parent_tha: '',
      parent_dis: '',
      parent_tha: '',
      countries: [],
      districts: [],
      thanas: []

    }
  },
  methods: {


    bloodPost() {

      //request - AH
      this.axios.post("bloodreq/add",this.pBody({
        "blood_group":this.br_bg,
        "bags":this.br_bags,
        "thana":this.br_parent_tha,
        "needed_at":Math.floor((new Date(this.br_date)) / 1000)
      }))
          .then(response => {
            if (response.data.success == true) {
              this.toast(response.data.message, "", "success")
              setTimeout(() => {
                window.location.reload();
              }, 224000);
            } else {
              this.errors=response.data
              this.toast(response.data.error, "", "danger")
            }
          })
          .catch(error => {
            if (error.response) {

              this.err = true;
              this.errMsg = error.response.data.data;
              console.log(error.message)
              this.msg = error.response.data.message;
            } else {
              console.log(error)
            }
          });
    },
    bloodView() {
      let areaBody = this.parent

      this.loading = true;

      //request - AH
      this.axios.get("bloodbank/" + this.bg + "/" + this.parent + "?page=" + this.page)
          .then(response => {
            this.loading = false;
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




    admitAsDonor(reqId) {
      // locations request - AH
      this.axios.post("bloodreq/accept/"+reqId, this.pBody({
        'bags':this.donor_bag[this.donor_bag.length-1]
      })).then(response => {
        console.log((response.data))

        if (response.data.success == true) {
          this.toast(response.data.message, "", "success")

        } else {
          this.br_errors=response.data
          this.toast(response.data.error, "", "danger")
        }

      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },







    bloodReq() {

      this.loading = true;

      //request - AH
      this.axios.get("bloodreq?page=" + this.br_page)
          .then(response => {
            this.loading = false;

            console.log((response.data))
            this.blood_reqs = response.data
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },


    nextPage(pg) {
      this.page = pg
      this.bloodView()
    },
    nextPageBR(pg) {
      this.br_page = pg
      this.bloodReq()
    },


    getDis() {
      // locations request - AH
      this.axios.get("location/get/" + 1 + "/district/0")
          .then(response => {
            console.log((response.data))
            this.districts = response.data

          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });


    },
    getTha(dis) {
      // locations request - AH
      this.axios.get("location/get/" + dis + "/thana/0")
          .then(response => {
            console.log((response.data))
            this.thanas = response.data
            this.parent = dis
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });


    },
    selTha(tha) {
      this.parent = tha
    }

  },
  mounted() {
    this.bloodView()
    this.bloodReq()
    this.getDis()


  }
}
</script>


<style scoped>
.circle-loader {
  position: relative;

}

.circle-loader div {
  height: 10px;
  width: 10px;
  background-color: #03A9F4;
  border-radius: 50%;
  position: absolute;
  -webkit-animation: 1.3s opaque ease-in-out infinite both;
  animation: 1.3s opaque ease-in-out infinite both;
}

.circle-loader > div:nth-child(1) {
  top: -25px;
  left: 0;
}

.circle-loader > div:nth-child(2) {
  top: -17px;
  left: 17px;
  -webkit-animation-delay: .15s;
  animation-delay: .15s;
}

.circle-loader > div:nth-child(3) {
  top: 0;
  left: 25px;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.circle-loader > div:nth-child(4) {
  top: 17px;
  left: 17px;
  -webkit-animation-delay: 0.45s;
  animation-delay: 0.45s;
}

.circle-loader > div:nth-child(5) {
  top: 25px;
  left: 0;
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.circle-loader > div:nth-child(6) {
  top: 17px;
  left: -17px;
  -webkit-animation-delay: 0.75s;
  animation-delay: 0.75s;
}

.circle-loader > div:nth-child(7) {
  top: 0;
  left: -25px;
  -webkit-animation-delay: .9s;
  animation-delay: .9s;
}

.circle-loader > div:nth-child(8) {
  top: -17px;
  left: -17px;
  -webkit-animation-delay: 1.05s;
  animation-delay: 1.05s;
}

@-webkit-keyframes opaque {
  0%, 40%, 100% {
    opacity: 0.1;
  }
  40% {
    opacity: 1;
  }
}

@keyframes opaque {
  0%, 40%, 100% {
    opacity: 0.1;
  }
  40% {
    opacity: 1;
  }
}

</style>