<template>

  <div class="breadcrumb-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-8 col-12">

          <h2 class="breadcrumb-title">Ambulance List</h2>
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
              <h4 class="card-title mb-0">Search Ambulance</h4>
            </div>
            <div class="card-body">

              <div class="filter-widget">


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
                    <select v-model="parent_tha"  @change="selTha(parent_tha)" class="form-select">
                      <option v-for="(thana,index) in thanas.data" :key="thana.id" :value="thana.id">
                        {{ thana.name }}
                      </option>
                    </select>
                  </div>
                </div>


              </div>

              <div class="btn-search">
                <button @click="ambulanceView" type="button" class="btn w-100">Search</button>
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
          <h1 v-if="NoData">No Ambulance Found! 😢</h1>
          <div>
            <div v-for="(ambulance,index) in ambulances.data" :key="ambulance.id" class="card">
              <div class="card-body">
                <div class="doctor-widget">
                  <div class="doc-info-left">
                    <div class="doctor-img">
                      <a href="">
                        <img :src="this.asset_url+'/frontend/assets/img/ambu.png'" class="img-fluid" alt="User Image">
                      </a>
                    </div>
                    <div class="doc-info-cont" style="margin-bottom: 8px;">
                      <h4 class="doc-name"><a v-bind:href=ambulanceUrl+ambulance.id>{{ ambulance.name }}</a></h4>


                      <p class="doc-speciality"><i class="fas fa-map-marker-alt"></i> {{ ambulance.addr }}</p>

                      <div class="clinic-services">
                        <span style="background: #def9ff;"><i class="fas fa-phone"></i> {{ ambulance.phones }}</span>

                      </div>
                    </div>
                  </div>
                  <div class="doc-info-right">
                    <div class="clinic-booking">
                      <a v-if="ambulance.verified=='1'" class="view-pro-btn" href="#">
                        <i style="color: green;font-size: 18px;" class="fas fa-check-circle verified"></i>
                        Verified</a>
                      <a v-if="ambulance.verified=='0'" class="view-pro-btn" href="#" style="background-color: aliceblue;" >
                        <i style="color: red;font-size: 18px;" class="fa fa-window-close verified"></i>
                        Not Verified</a>
                      <a v-if="ambulance.available=='1'" class="apt-btn">Available</a>
                      <a v-if="ambulance.available=='0'" class="apt-btn" style="background-color: palevioletred;">Unavailable</a>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>



          <div class="load-more text-center" v-if="!NoData">
            <div >
              <ul class="pagination mb-4">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1">Pages:</a>
                </li>
                <li v-for="index in ambulances['maxPage']" :key="index" :class="[(page == index) ? 'active':'']">
                  <a style="color: white;font-weight: 600;color:#15558d" class="page-link" href="#" @click="nextPage(index)">{{ index }}</a>
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
  name: "ambulances",
  data() {
    return {
      //Basic
      ambulanceUrl:'/ambu?id=',
      loading: false,
      NoData:false,
      page: 1,


      ambulances:[],

      //Location:

      parent: '0',
      parent_con: '',
      parent_dis: '',
      parent_tha: '',
      countries: [],
      districts: [],
      thanas: []

    }
  },
  methods: {


    ambulanceView(nearBy) {
      let areaBody=this.parent
      if(nearBy===true) {
        console.log("nearBy found........." + this.currentLocation.lat)
        areaBody=this.currentLocation.lat+','+this.currentLocation.lng
      }
      this.loading = true;

      //request - AH
      this.axios.get("ambulance/list/"+areaBody+"/"+this.page)
          .then(response => {
            this.loading = false;
            if(response.data.data.length!==0){this.NoData=false}else{this.NoData=true}
            console.log((response.data))
            this.ambulances = response.data
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    nextPage(pg) {
      this.page = pg
      this.ambulanceView()
    },



    //Location
    getCon() {
      // locations request - AH
      this.axios.get("location/get/all/country/0")
          .then(response => {
            console.log((response.data))
            this.countries = response.data

          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });


    },
    getDis() {
      // locations request - AH
      this.axios.get("location/get/1/district/0")
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
            this.parent=dis
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });


    },
    selTha(tha) {
      this.parent=tha
    }

  },
  mounted() {
    this.ambulanceView()
    this.getDis()


  }
}
</script>



<style scoped>


.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #f5fffc;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;
}




.clinic-booking a {
  background-color: #ffb394;
  border: 2px solid #f7e4c9;
  border-radius: 4px;
  color: #091215;
  display: block;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  padding: 10px 20px;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
}
.clinic-booking a.apt-btn {
  background-color: #3e3354ba;
  color: #fff;
}
.clinic-booking a.apt-btn:hover, .clinic-booking a.apt-btn:focus {
  background-color: #92c28e;
  border-color: #0db9f2;
  color: #fff;
}


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