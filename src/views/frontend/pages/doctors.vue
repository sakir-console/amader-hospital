<template>

  <div class="breadcrumb-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-8 col-12">

          <h2 class="breadcrumb-title">Doctors List</h2>
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
              <h4 class="card-title mb-0">Search Doctors</h4>
            </div>
            <div class="card-body">

              <div class="filter-widget">
                <h4>Hospital</h4>
                <div>
                  <div class="form-group">

                    <select v-model="hos" class="select form-control select2-hidden-accessible">
                      <option value="" selected>Select Hospital</option>
                      <option v-for="(hospital,index) in hospitals.data" :key="hospital.id" :value="hospital.id">
                        {{ hospital.name }}
                      </option>
                    </select>


                  </div>
                </div>

              </div>
              <div class="filter-widget">
                <h4>Select Specialist</h4>
                <div v-for="(speciality,index) in specialities.data" :key="speciality.id" :value="speciality.id">
                  <label class="custom_check">
                    <input v-model="spec" type="radio" :value="speciality.id">
                    <span class="checkmark"></span> {{speciality.name}}
                  </label>
                </div>

              </div>

              <div class="btn-search">
                <button @click="viewDocs" type="button" class="btn w-100">Search</button>
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
          <h1 v-if="NoData">No Doctor Found! 😢</h1>
         <div>
          <div v-for="(doctor,index) in doctors.data" :key="doctor.id" class="card">
            <div class="card-body">
              <div class="doctor-widget">
                <div class="doc-info-left">
                  <div class="doctor-img">
                    <a href="">
                      <img :src="this.getPP(doctor)" class="img-fluid" alt="User Image">
                    </a>
                  </div>
                  <div class="doc-info-cont">
                    <h4 class="doc-name"><a href="#">{{ doctor.title }}</a></h4>
                    <p class="doc-speciality">@{{ doctor.username }}</p>
                    <h5 class="doc-department">{{doctor.sect_name}}</h5>
                    <div class="rating">
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star"></i>
<!--                      <span class="d-inline-block average-rating">(*)</span>-->
                    </div>
                    <div class="clinic-details">

                      <ul class="clinic-gallery">
                        <li>
                          <a href="assets/img/features/feature-01.jpg" data-fancybox="gallery">
                            <img src="frontend/assets/img/features/feature-01.jpg" alt="Feature">
                          </a>
                        </li>
                        <li>
                          <a href="assets/img/features/feature-02.jpg" data-fancybox="gallery">
                            <img src="frontend/assets/img/features/feature-02.jpg" alt="Feature">
                          </a>
                        </li>
                        <li>
                          <a href="assets/img/features/feature-03.jpg" data-fancybox="gallery">
                            <img src="frontend/assets/img/features/feature-03.jpg" alt="Feature">
                          </a>
                        </li>
                        <li>
                          <a href="assets/img/features/feature-04.jpg" data-fancybox="gallery">
                            <img src="frontend/assets/img/features/feature-04.jpg" alt="Feature">
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="clinic-services">
                      <span style="background: #def9ff;">Qualification :</span>
                      <span> {{doctor.qualification}}</span>
                    </div>
                  </div>
                </div>
                <div class="doc-info-right">
                  <div class="clini-infos">
                    <ul>
                      <li><i class="fas fa-money-bill"></i>Fee: ৳{{doctor.fee}}</li>
                      <li><i class="far fa-money-bill-alt"></i>Follow-up fee: ৳{{doctor.follow_up_fee}}   </li>
                    </ul>
                  </div>
                  <div class="clinic-booking">
                    <a class="view-pro-btn" href="#"><i style="color: green;font-size: 18px;" class="fas fa-check-circle verified"></i>Verified</a>
                    <a class="apt-btn" v-bind:href=appointmentUrl+doctor.uid>Book Appointment</a>
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
                <li v-for="index in doctors['maxPage']" :key="index" :class="[(page == index) ? 'active':'']">
                  <a style="color: white;font-weight: 900;" class="page-link" href="#" @click="nextPage(index)">{{ index }}</a>
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
name: "doctors",
  data() {
    return {
      appointmentUrl:'/appointment?doc=',
      loading: false,
      page: 1,
      NoData:false,

      spec:'',
      hos:'',
      doctors: [],
      hospitals:[],
      specialities:[],

    }
  },
  methods: {

    // Specialities FETCH request - AH
    viewDocs() {
      this.loading = true
      this.axios.get("doctor?page="+this.page+"&hospital="+this.hos+"&sector="+this.spec+"&verified=1")
          .then(response => {
            this.loading = false
            if(response.data.data.length!==0){this.NoData=false}else{this.NoData=true}
            console.log((response.data))
            this.doctors = response.data
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },

    hospitalView() {

      // locations request - AH
      this.axios.get("hospital/0/0")
          .then(response => {
            this.loading = false;
            console.log((response.data))
            this.hospitals = response.data
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    viewSpec() {
      this.axios.get("doctor/sectors")
          .then(response => {
            console.log((response.data))
            this.specialities = response.data
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },
    nextPage(pg) {
      this.page = pg
      this.viewDocs()
    },
  },
  mounted() {
    this.viewDocs()
    this.hospitalView()
    this.viewSpec()
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