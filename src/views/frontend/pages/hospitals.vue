<template>

  <div class="breadcrumb-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-8 col-12">

          <h2 class="breadcrumb-title">Hospital List</h2>
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
              <h4 class="card-title mb-0">Search Hospitals</h4>
            </div>
            <div class="card-body">

              <div class="filter-widget">

                <div class="form-group"><label>Hospital name</label>
                  <input @input="searchHospital" type="text" v-model="name" class="form-control"
                         placeholder="Enter Hospital Name"></div>

                <div class="btn-search">
                  <button @click="hospitalView(true)" type="button" class="btn w-100"
                          style="background-color: #c14333;"><i style="color: white;font-size: 18px;"
                                                                class="fas fa-search-location"></i> Nearby Hospital
                  </button>
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
                <button @click="hospitalView" type="button" class="btn w-100">Search</button>
              </div>
            </div>
          </div>

        </div>
        <div class="col-md-12 col-lg-8 col-xl-9">

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
          <h1 v-if="NoData">No Hospital Found! 😢</h1>
          <div>
            <div v-for="(hospital,index) in hospitals.data" :key="hospital.id" class="card">
              <div class="card-body">
                <div class="doctor-widget">
                  <div class="doc-info-left">
                    <div class="doctor-img">
                      <a href="">
                        <img :src="this.asset_url+'/frontend/assets/img/hos.png'" class="img-fluid" alt="User Image">
                      </a>
                    </div>
                    <div class="doc-info-cont" style="margin-bottom: 8px;">
                      <h4 class="doc-name"><a v-bind:href=hospitalUrl+hospital.id>{{ hospital.name }}</a></h4>
                      <p class="doc-speciality"><i class="fas fa-map-marker-alt"></i> {{ hospital.addr }}</p>


                      <div class="clinic-services">
                        <span style="background: #def9ff;">{{ hospital.thana_name }}</span>
                        <span> {{ hospital.district_name }}</span>
                      </div>
                      <div class="rating">
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <!--                      <span class="d-inline-block average-rating">(*)</span>-->
                      </div>

                    </div>
                  </div>
                  <div class="doc-info-right">
                    <div class="clini-infos">
                      <ul>
                        <li><i class="fas fa-location-arrow"></i>ICU: {{ hospital.icu }}</li>
                        <li><i class="fas fa-location-arrow"></i>Beds:{{ hospital.beds }}</li>
                      </ul>
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
                <li v-for="index in hospitals['maxPage']" :key="index" :class="[(page == index) ? 'active':'']">
                  <a style="color: white;font-weight: 600;color:#15558d" class="page-link" href="#"
                     @click="nextPage(index)">{{ index }}</a>
                </li>

              </ul>
            </div>
          </div>


        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "hospitals",
  data() {
    return {
      //Basic
      hospitalUrl: '/hospital?id=',
      loading: false,
      NoData: false,
      page: 1,

      name: '',
      spec: '',
      hos: '',
      doctors: [],
      hospitals: [],
      specialities: [],

      //Location:

      parent: '1',
      parent_con: '',
      parent_dis: '',
      parent_tha: '',
      countries: [],
      districts: [],
      thanas: []

    }
  },
  methods: {


    hospitalView(nearBy) {
      let areaBody = this.parent
      if (nearBy === true) {
        console.log("nearBy found........." + this.currentLocation.lat)
        areaBody = this.currentLocation.lat + ',' + this.currentLocation.lng
      }
      this.loading = true;

      //request - AH
      this.axios.get("hospital/" + areaBody + "/" + this.page)
          .then(response => {
            this.loading = false;
            if (response.data.data.length !== 0) {
              this.NoData = false
            } else {
              this.NoData = true
            }
            console.log((response.data))
            this.hospitals = response.data
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },

    searchHospital() {
      if (this.name == '') {
        this.hospitalView()
      } else {
        this.loading = true;

        //request - AH
        this.axios.get("hospital/search?q=" + this.name)
            .then(response => {
              this.loading = false;
              if (response.data.data.length !== 0) {
                this.NoData = false
              } else {
                this.NoData = true
              }
              console.log((response.data))
              this.hospitals = response.data
            })
            .catch(error => {
              this.errorMessage = error.message;
              console.error("There was an error!", error);
            });
      }

    },
    nextPage(pg) {
      this.page = pg
      this.hospitalView()
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
    this.hospitalView()
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