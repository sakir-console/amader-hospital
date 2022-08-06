<template>

  <div class="breadcrumb-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-8 col-12">
          <h2 class="breadcrumb-title">{{ hospital.name }}</h2>
        </div>

      </div>
    </div>
  </div>

  <div class="content">
    <div class="container">

      <div class="card">
        <div class="card-body">
          <div class="doctor-widget">
            <div class="doc-info-left">
              <div class="doctor-img">
                <img :src="this.asset_url+'/frontend/assets/img/hs1.png'" style="
    height: 92%;
" class="img-fluid" alt="Hospital Image">
              </div>
              <div class="doc-info-cont">
                <h4 class="doc-name">{{ hospital.name }}</h4>


                <div class="rating">
                  <span class="d-inline-block average-rating">({{ hospital.thana_name }})</span>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star"></i>
                </div>
                <div class="clinic-details">
                  <px class="doc-location"><i class="fas fa-map-marker-alt"></i> {{ hospital.addr }}</px>
                </div>
                <div class="clinic-details">
                  <a class="btn btn-white call-btn">
                    <i class="fas fa-phone"></i>
                  </a>
                  <span style="background: rgb(222, 249, 255);padding: 6px;border: 1px dotted #2af7ff;margin-left: 12px;">{{ hospital.contacts }} </span>

                </div>
                <div class="clinic-details">
                  <a class="btn btn-white call-btn">
                    <i class="fa fa-globe"></i>
                  </a>
                  <span style="    background: rgb(255 193 176);
    padding: 6px;
    border: 1px dotted rgb(123 123 123);
    margin-left: 12px;
    border-radius: 14px;">{{ hospital.website }} </span>

                </div>

              </div>
            </div>
            <div class="doc-info-right">
              <div class="clini-infos">
                <ul>
                  <li><i class="fa fa-angle-double-right"></i> Beds: {{ hospital.beds }}</li>
                  <li><i class="fa fa-angle-double-right"></i> ICU: {{ hospital.icu }}</li>
                  <li><i class="fa fa-angle-double-right"></i>NICU: {{ hospital.nicu }}</li>
                  <li><i class="fa fa-angle-double-right"></i>CCU: {{ hospital.ccu }}</li>
                  <li><i class="fa fa-angle-double-right"></i>Dialysis: {{ hospital.dialysis }}</li>
                </ul>
              </div>


            </div>
          </div>
        </div>
      </div>


      <div class="card">
        <div class="card-body pt-0">

          <nav class="user-tabs mb-4">
            <ul class="nav nav-tabs nav-tabs-bottom nav-justified">
              <li class="nav-item">
                <a class="nav-link active" href="#doc_overview" data-bs-toggle="tab">Map Location</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#doc_locations" data-bs-toggle="tab">Specialist Doctors</a>
              </li>

            </ul>
          </nav>


          <div class="tab-content pt-0">

            <div role="tabpanel" id="doc_overview" class="tab-pane fade show active">
              <div class="row">
                <div class="col-md-6">

                  <div class="mapouter">
                    <div class="gmap_canvas">
                      <iframe width="600" height="500" id="gmap_canvas"
                              :src="`https://maps.google.com/maps?q=`+hospital.lat+`,`+hospital.lng+`&t=&z=13&ie=UTF8&iwloc=&output=embed`"
                              frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

                    </div>
                  </div>

                </div>
              </div>
            </div>


            <div role="tabpanel" id="doc_locations" class="tab-pane fade">



              <div class="location-list">
                <div class="row">
                  <div class="col-md-12 col-lg-2 col-xl-12">

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
                                        <img :src="this.asset_url+'/frontend/assets/img/features/feature-01.jpg'" alt="Feature">
                                      </a>
                                    </li>
                                    <li>
                                      <a href="assets/img/features/feature-02.jpg" data-fancybox="gallery">
                                        <img :src="this.asset_url+'/frontend/assets/img/features/feature-02.jpg'" alt="Feature">
                                      </a>
                                    </li>
                                    <li>
                                      <a href="assets/img/features/feature-03.jpg" data-fancybox="gallery">
                                        <img :src="this.asset_url+'/frontend/assets/img/features/feature-03.jpg'" alt="Feature">
                                      </a>
                                    </li>
                                    <li>
                                      <a href="assets/img/features/feature-04.jpg" data-fancybox="gallery">
                                        <img :src="this.asset_url+'/frontend/assets/img/features/feature-04.jpg'" alt="Feature">
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
                            <a style="color: white;font-weight: 600;color:#15558d" class="page-link" href="#" @click="nextPage(index)">{{ index }}</a>
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
  </div>

</template>

<script>

let urlParams = new URLSearchParams(window.location.search);
export default {
  name: "viewHospital",
  data() {
    return {
      appointmentUrl:'/appointment?doc=',
      loading: false,
      page: 1,
      NoData:false,
      doctors: [],


      errors: [],
      hospital: []

    }
  },
  methods: {

    //  FETCH request - AH
    viewHospital() {
      this.loading = true
      this.axios.get("hospital/" + urlParams.get('id'))
          .then(response => {
            this.loading = false
            console.log((response.data))
            this.hospital = response.data.data
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },

    viewDocs() {
      this.loading = true
      this.axios.get("doctor?page="+this.page+"&hospital="+urlParams.get('id')+"&verified=1")
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

  },
  mounted() {
    this.viewHospital()
    this.viewDocs()

  }
}
</script>

<style scoped>
.mapouter {
  position: relative;
  text-align: right;
  height: 500px;
  width: 600px;
}


.gmap_canvas {
  overflow: hidden;
  background: none !important;
  height: 500px;
  width: 600px;
}
</style>