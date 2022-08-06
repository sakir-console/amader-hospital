<template>

  <div class="breadcrumb-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-8 col-12">

          <h2 class="breadcrumb-title">Blood request ({{ info.blood_group }})</h2>
        </div>

      </div>
    </div>
  </div>


  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body"
                 style="background:linear-gradient(rgb(255 85 85 / 52%), rgba(241, 241, 241, 0.23) 100px);">
              <div class="doctor-widget">
                <div class="doc-info-left">
                  <div class="doctor-img">
                    <img :src="this.asset_url+'/frontend/assets/img/blood-req.png'" style="

" class="img-fluid" alt="Hospital Image">
                  </div>
                  <div class="doc-info-cont">
                    <h4 class="doc-name">{{ info.blood_group }}</h4>


                    <div class="rating">
                      <span class="d-inline-block average-rating">(@{{ info.username }})</span>

                    </div>
                    <div class="clinic-details">
                      <px class="doc-location">
                        <div class="clinic-services"><span style="background:rgb(255 255 255);font-size: 18px;">
                           <i class="fa fa-user-check"></i> Name: {{ info.name }}
                        </span></div>

                      </px>
                    </div>

                    <div class="clinic-details">
                      <px class="doc-location">
                        <div class="clinic-services"><span style="background:rgb(255 178 168 / 40%);font-size: 18px;">
                           <i class="fa fa-search-location"></i> Upazila: {{ info.thana_name }}
                        </span></div>

                      </px>
                    </div>

                    <div class="clinic-details">
                      <px class="doc-location">
                        <div class="clinic-services"><span style="background: rgb(255 255 255);font-size: 18px;">
                           <i class="fa fa-clock"></i> Needed time: {{ info.needed_at }}
                        </span></div>

                      </px>
                    </div>



                  </div>
                </div>
                <div class="doc-info-right">
                  <div class="clini-infos">
                    <ul>
                      <li><i class="fa fa-genderless"></i> Needed Bags: {{ info.needed_bags }}</li>
                      <hr>
                      <li><i class="fa fa-male"></i> Found bags: {{ info.found_bags }}</li>
                      <hr>
                    <li class="submit-section proceed-btn text-end">
                      Blood donation:
                      <input v-model="donor_bag" type="number" placeholder="Number of Bags for donation" style="width: 100%"/>
                      <button @click="admitAsDonor(info.id)" type="button" class="btn btn-secondary btn-sm" style="background-color: #217c60;">Admit as donor </button>
                    </li>

                    </ul>
                  </div>


                </div>
              </div>
            </div>
          </div>






          <div class="card booking-schedule schedule-widget" style="border: 2px solid #d6e4e6;">

            <div class="schedule-header" style="background: #d6ecff;">
              <div class="row">
                <div class="col-md-12">

                  <div class="day-slot" style="font-size: 20px;color: black;">
                    <img :src="this.asset_url+'/frontend/assets/img/donors.png'" style="width:50px;padding: 4px;"
                         alt="Notification Image" width="140px">
                    Donors:
                  </div>

                </div>
              </div>
            </div>



            <div class="schedule-cont">
              <div class="row">
                <div class="col-md-12">




                  <div class="row">
                    <div class="col-md-12 col-lg-9">

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
                      <h4 v-if="NoData">Not donated yet! Be the first one. 💕</h4>


                      <div v-if="!NoData" class="widget education-widget">

                        <div class="experience-box">
                          <ul class="experience-list">
                            <li v-for="(donor,index) in donors" :key="donor.id" :value="donor.id">
                              <div class="experience-user">
                                <div class="before-circle"></div>
                              </div>
                              <div class="experience-content">
                                <div class="timeline-content">
                                  <a :href="`/view-profile?user=`+donor.uid" class="name">{{ donor.name }}</a>
                                  <div>{{ donor.username }}</div>
                                  <span class="time"> Donated: {{ donor.bags }} Bags</span>
                                  <span v-if="donor.addr" class="time">Donor Address: {{ donor.addr }}</span>
                                  <span v-if="donor.phone" class="time">Donor phone: {{ donor.phone }}</span>
                                </div>
                              </div>
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
  </div>

</template>

<script>

let urlParams = new URLSearchParams(window.location.search);
export default {
  name: "viewBloodReq",
  data() {
    return {
      errors: [],
      is_dr: parseInt(localStorage.getItem('is_dr')),
      loading: false,
      NoData:false,
      info: [],
      donor_bag:'',
      donors: []


    }
  },
  methods: {
    viewBoodReqInfo() {
      this.loading = true
      this.axios.get("/bloodreq/" + urlParams.get('req'))
          .then(response => {
            this.loading = false
            console.log((response.data))
            this.info = response.data.data
            this.donors = response.data.donors

            if (response.data.donors.length !== 0) {
              this.NoData = false
            } else {
              this.NoData = true
            }

          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },


    //  FETCH request - AH

    acceptEmergency() {
      // locations request - AH
      this.axios.post("emergency/accept", this.pBody({
        "id": urlParams.get('id')
      })).then(response => {
        console.log((response.data))

        if (response.data.success == true) {
          this.toast(response.data.message, "", "success")

        } else {
          this.errors = response.data
          this.toast(response.data.error, "", "danger")
        }

      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },


    admitAsDonor(reqId) {
      // locations request - AH
      this.axios.post("bloodreq/accept/"+reqId, this.pBody({
        'bags':this.donor_bag
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


    formatSchTime(min) {
      let h = Math.floor(min / 60);
      let tf = 'AM';
      let minutes = min % 60;
      if (h > 12) {
        h -= 12;
        tf = 'PM';
      }
      if (h === 0) {
        h = 12;
      }
      if (h < 10) {
        h = '0' + h.toString();
      }
      if (minutes < 10) {
        minutes = '0' + minutes.toString();
      }
      return h + ':' + minutes + ' ' + tf;
    }

  },
  mounted() {
    this.viewBoodReqInfo()
  }
}
</script>

<style scoped>

</style>