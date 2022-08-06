<template>

  <div class="breadcrumb-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-8 col-12">
          <h2 class="breadcrumb-title">{{ ambulance.name }}</h2>
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
              <div v-if="ambulance.photo==''" class="doctor-img">
                <img :src="this.asset_url+'/frontend/assets/img/amb.png'" style="height: 92%;" class="img-fluid" alt="Ambulance Image">
              </div>
              <div v-if="ambulance.photo!=''" class="doctor-img">
                <img :src="ambulance.photo" style="height: 92%;" class="img-fluid" alt="Ambulance Image">
              </div>
              <div class="doc-info-cont">
                <h4 class="doc-name">{{ ambulance.name }}</h4>


                <div class="rating">
                  <span class="d-inline-block average-rating">({{ ambulance.thana_name }})</span>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star"></i>
                </div>
                <div class="clinic-details">
                  <px class="doc-location"><i class="fas fa-map-marker-alt"></i> {{ ambulance.addr }}</px>
                </div>
                <div class="clinic-details">
                  <a class="btn btn-white call-btn">
                    <i class="fas fa-phone"></i>
                  </a>
                  <span
                      style="background: rgb(222, 249, 255);padding: 6px;border: 1px dotted #2af7ff;margin-left: 12px;">{{
                      ambulance.phones
                    }} </span>

                </div>

              </div>
            </div>
            <div class="doc-info-right">
              <div class="clini-infos">
                <ul>
                  <li><i class="fa fa-angle-double-right"></i> Car model: {{ ambulance.car_model }}</li>
                  <li><i class="fa fa-angle-double-right"></i> Car type: {{ ambulance.car_type }}</li>
                  <li><i class="fa fa-angle-double-right"></i>Basic Life support: {{ ambulance.oxygen }}</li>
                  <li><i class="fa fa-angle-double-right"></i>Rate: {{ ambulance.rate }}</li>
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
                <a class="nav-link active" href="#doc_overview" data-bs-toggle="tab">
                  <div class="video__icon">
                    <div class="circle--outer"></div>
                    <div class="circle--inner"></div>
                    LIVE
                  </div>

                 Live Location of Ambulance</a>
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
                              :src="`https://maps.google.com/maps?q=`+ambulance.llat+`,`+ambulance.llng+`&t=&z=13&ie=UTF8&iwloc=&output=embed`"
                              frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

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
  name: "viewAmbulance",
  data() {
    return {
      loading: false,
      page: 1,
      NoData: false,
      doctors: [],


      errors: [],
      ambulance: []

    }
  },
  methods: {

    //  FETCH request - AH
    viewAmbulence() {
      this.loading = true
      this.axios.get("ambulance/" + urlParams.get('id'))
          .then(response => {
            this.loading = false
            console.log((response.data))
            this.ambulance = response.data.data[0]
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },


  },
  mounted() {
    this.viewAmbulence()
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

.video__icon {
  position: absolute;
  width: 50px;
  left: 20px;
  top: 20px; }
.video__icon .circle--outer {
  border: 1px solid #e50040;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 auto 5px;
  position: relative;
  opacity: .8;
  -webkit-animation: circle 2s ease-in-out infinite;
  animation: circle 2s ease-in-out infinite; }
.video__icon .circle--inner {
  background: #e50040;
  left: 15px;
  top: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  opacity: .8; }
.video__icon .circle--inner:after {
  content: '';
  display: block;
  border: 2px solid #e50040;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  top: -4px;
  left: -4px;
  position: absolute;
  opacity: .8;
  -webkit-animation: circle 2s ease-in-out .2s infinite;
  animation: circle 2s ease-in-out .2s infinite; }
.video__icon p {
  color: #000;
  text-align: center; }

@-webkit-keyframes circle {
  from {
    -webkit-transform: scale(1);
    transform: scale(1); }

  to {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
    opacity: 0; } }

@keyframes circle {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  to {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
    opacity: 0;
  } }

</style>