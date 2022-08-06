<template>

  <div class="breadcrumb-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-8 col-12">

          <h2 class="breadcrumb-title">Emergency post</h2>
        </div>

      </div>
    </div>
  </div>


  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body" style="background: linear-gradient(#96c8f5, #f1f1f13b 100px);">
              <div class="doctor-widget">
                <div class="doc-info-left">
                  <div class="doctor-img">
                    <img :src="this.asset_url+'/frontend/assets/img/patient.png'" style="

" class="img-fluid" alt="Hospital Image">
                  </div>
                  <div class="doc-info-cont">
                    <h4 class="doc-name">{{ emergency.name }}</h4>


                    <div class="rating">
                      <span class="d-inline-block average-rating">(@{{ emergency.username }})</span>

                    </div>
                    <div class="clinic-details">
                      <px class="doc-location"><i class="fa fa-phone-square"> Phone: </i> {{ emergency.phone }}</px>
                    </div>
                    <div class="clinic-details">
                      <px class="doc-location"><i class="fa fa-user-check"> Submitted by: </i> {{ emergency.submitted_by }}</px>
                    </div>
                    <div class="clinic-details">
                      <px class="doc-location"><i class="fa fa-clock"> Time: </i> {{ this.getTime(emergency.tstamp) }}</px>
                    </div>

                  </div>
                </div>
                <div class="doc-info-right">
                  <div class="clini-infos">
                    <ul>
                      <li><i class="fa fa-genderless"></i> Gender: {{ emergency.gender }}</li>
                      <li><i class="fa fa-male"></i> Age: {{ emergency.age }}</li>
                      <li><i class="fa fa-medkit"></i>Blood Group: {{ emergency.blood_group }}</li>
                      <li><i class="fa fa-recycle"></i>Blood Pressure: {{ emergency.blood_pressure }}</li>
                      <li><i class="fa fa-user-shield"></i>Sugar level: {{ emergency.sugar_level }}</li>
                      <li><i class="fa fa-thermometer-half"></i>Body Temperature: {{ emergency.body_temp }}</li>
                    </ul>
                  </div>


                </div>
              </div>
            </div>
          </div>


          <div class="card booking-schedule schedule-widget">

            <div class="schedule-header" style="background: aliceblue;">
              <div class="row">
                <div class="col-md-12">

                  <div class="day-slot">
                    <img :src="this.asset_url+'/frontend/assets/img/symptoms.png'"  style="width:40px;padding: 4px;" alt="Notification Image" width="140px">


                    Symptoms
                  </div>

                </div>
              </div>
            </div>
            <div class="schedule-cont">
              <div class="row">
                <div class="col-md-12">

                  <div class="time-slot">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="token-slot mt-2">
                          {{ emergency.symptoms }}
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>
          <div class="card booking-schedule schedule-widget">

            <div class="schedule-header" style="background: aliceblue;">
              <div class="row">
                <div class="col-md-12">

                  <div class="day-slot">
                    <img :src="this.asset_url+'/frontend/assets/img/symptoms2.png'"  style="width:40px;padding: 4px;" alt="Notification Image" width="140px">

                    Previous History
                  </div>

                </div>
              </div>
            </div>
            <div class="schedule-cont">
              <div class="row">
                <div class="col-md-12">

                  <div class="time-slot">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="token-slot mt-2">
                          {{ emergency.previous }}
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>
          <div class="card booking-schedule schedule-widget">

            <div class="schedule-header" style="background: aliceblue;">
              <div class="row">
                <div class="col-md-12">

                  <div class="day-slot">
                    <img :src="this.asset_url+'/frontend/assets/img/info.png'"  style="width:40px;padding: 4px;" alt="Notification Image" width="140px">

                    Details:
                  </div>

                </div>
              </div>
            </div>
            <div class="schedule-cont">
              <div class="row">
                <div class="col-md-12">

                  <div class="time-slot">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="token-slot mt-2">
                          {{ emergency.details }}
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>

   <div class="card booking-schedule schedule-widget">

            <div class="schedule-header" style="background: aliceblue;">
              <div class="row">
                <div class="col-md-12">

                  <div class="day-slot">
                    <img :src="this.asset_url+'/frontend/assets/img/images.png'"  style="width:40px;padding: 4px;" alt="Notification Image" width="140px">
                    Attached Images:
                  </div>

                </div>
              </div>
            </div>
            <div class="schedule-cont">
              <div class="row">
                <div class="col-md-12">

                  <div class="time-slot">
                    <div class="row">
                      <div class="col-lg-12">
                        <div v-if="selectedImage" max-width="85vw">
                          <img :src="selectedImage" alt="" width="100%" @click.stop="selectedImage = null">
                          <hr>
                        </div>

                        <div class="token-slot mt-2">



                        </div>

                        <div class="row blog-grid-row">
                          <div v-for="(img,index) in imgs" :key="index" class="col-md-6 col-sm-12">

                            <div class="blog grid-blog">
                              <div class="blog-image">
                                <img @click="zoom(img)" class="img-fluid" :src="img" alt="Image">
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


          <div v-if="is_dr&&accepted" class="submit-section proceed-btn text-end">
            <a href="#" class="btn btn-danger submit-btn">Already Accepted.</a>
          </div>
          <div v-if="is_dr&&!accepted&&!thisUsr" class="submit-section proceed-btn text-end">
            <a @click="acceptEmergency" href="#" class="btn btn-primary submit-btn">Accept request</a>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>

let urlParams = new URLSearchParams(window.location.search);
export default {
  name: "viewEmergency",
  data() {
    return {
      selectedImage: null,
      errors:[],
      imgs:[],
      is_dr:parseInt(localStorage.getItem('is_dr')),
      thisUsr: false,
      accepted: false,
      loading: false,

      emergency:[],


    }
  },
  methods: {
    viewEmergencyInfo() {
      this.loading = true
      this.axios.get("/emergency/info/" + urlParams.get('id'))
          .then(response => {
            this.loading = false
            console.log((response.data))
            this.emergency = response.data.data
            this.imgs=JSON.parse(response.data.data.imgs)
            if(parseInt(response.data.data.accepted)) {
              this.accepted = true
            }    if(parseInt(response.data.data.uid)==localStorage.getItem('user')) {
              this.thisUsr = true
            }
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },

    zoom(url) {
      console.log("Zoom", url);
      this.selectedImage = url;
    },
    //  FETCH request - AH

    acceptEmergency() {
      // locations request - AH
      this.axios.post("emergency/accept", this.pBody({
        "id":urlParams.get('id')
      })).then(response => {
        console.log((response.data))

        setTimeout(() => {
          window.location='/chat?echat='+urlParams.get('id');
        }, 4000);

        if (response.data.success == true) {
          this.toast(response.data.message, "", "success")

        } else {
          this.errors=response.data
          this.toast(response.data.error, "", "danger")
        }

      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },

    formatSchTime(min){
      let h = Math.floor(min / 60);
      let tf='AM';
      let minutes = min % 60;
      if(h>12){
        h-=12;
        tf='PM';
      }
      if(h===0){
        h = 12;
      }
      if(h<10){
        h='0'+h.toString();
      }
      if(minutes<10){
        minutes='0'+minutes.toString();
      }
      return h+':'+minutes+' '+tf;
    }

  },
  mounted() {
    this.viewEmergencyInfo()
  }
}
</script>

<style scoped>

</style>