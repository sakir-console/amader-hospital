<template>

  <div>
    <div class="breadcrumb-bar">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-md-12 col-12">

            <h2 class="breadcrumb-title">Apply as Doctor</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <sidebar></sidebar>
          <div class="col-md-7 col-lg-8 col-xl-9">
            <div class="card">
              <div class="card-body">

                <form @submit.prevent="appDr">
                  <div class="row form-row">

                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Dr. Name</label>
                        <input v-model="title" type="text" class="form-control" placeholder="Ex: Dr. Jamal Uddin">
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Qualification</label>
                        <input v-model="qlf" type="text" class="form-control"  placeholder="Ex: MBBS, FCPS">
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Registration No.</label>
                        <input v-model="reg_no" type="text" class="form-control" placeholder="Ex: 12345 ">
                      </div>
                    </div>

                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Fee</label>
                        <input v-model="fee" type="text" class="form-control"  placeholder="Ex: 900">
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Follow up fee</label>
                        <input v-model="ff" type="text" class="form-control"  placeholder="Ex: 700 ">
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Doctor code</label>
                        <input v-model="dc" type="text" class="form-control"  placeholder="Ex: 874hmnf">
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label class="col-lg-3 col-form-label">Specialist on-</label>
                        <div class="col-lg-9">
                          <select v-model="speciality" class="form-select">

                            <option v-for="(sector,index) in sectors.data" :key="sector.id" :value="sector.id">
                              {{ sector.name }}
                            </option>
                          </select>
                        </div>
                      </div>

                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>NID</label>
                        <input v-model="nid" type="number" class="form-control"  placeholder="Ex: 76373672366832">
                      </div>
                    </div>


                    <br>



                      <hr>

                      <div class="col-12 col-md-6 upload-img">
                        <div class="">
                          <span><i class="fa fa-upload"></i> NID Front: </span>

                          <hr>
                          <input type="file" ref="photo" name="nid_f" accept=".png, .jpg, .jpeg" @change="onNidFChange"/>
                        </div>
                        <small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>

                      </div>

                      <div class="col-12 col-md-6 upload-img">
                        <div class="">
                          <span><i class="fa fa-upload"></i> NID Back: </span>
                          <hr>
                          <input type="file" ref="photo" name="nid_f" accept=".png, .jpg, .jpeg" @change="onNidBChange"/>
                        </div>
                        <small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                      </div>





                    <hr>
                    <p v-if="uploadPercent!=0">  Uploading: {{ uploadPercent }} %</p>
                    <hr>




                    <div class="form-group"><label>Hospital name</label>
                      <input  @blur="()=>{this.searchingHos=false}" @click="searchHospitals" @input="searchHospitals" type="text" v-model="searchHos" class="form-control" placeholder="Enter Hospital Name"></div>
                    <div class="filter-widget">
                      <h4>Hospital</h4>
                      <div>
                        <div class="form-group">



                          <div v-if="searchingHos" class="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>


                          <div v-for="(hospital,index) in hospitals.data" :key="hospital.id"
                               :value="hospital.id" class="form-check-inlinex visits">
                            <label class="visit-btns">
                              <input v-model="hosNum" :value="hospital.id" type="checkbox"
                                     class="form-check-input">
                              <span class="visit-rsn" data-bs-toggle="tooltip"
                                    title="Select Symptom">
                                                    {{ hospital.name }}
                                                     <br></span>


                            </label>
                          </div>





                        </div>
                      </div>

                    </div>



                  </div>

                  <div v-if="errors.length!=0" class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong>
                    <li style="text-transform: capitalize;" v-for="(error,index) in errors.fields">{{ index }}: {{ error }} </li>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                  <div class="submit-section">
                    <button type="submit" class="btn btn-primary submit-btn">Submit application</button>
                  </div>
                </form>

              </div>
            </div>
          </div>



        </div>
      </div>
    </div>
  </div>
</template>


<script>


import Sidebar from "@/components/frontend/sidebar";
export default {
  name: "appDr",
  components: {Sidebar},

  data() {
    return {
      errors:[],
      hasNid:localStorage.getItem('nid')!=null?true:false,
      title:'',
      qlf:'',
      reg_no:'',
      fee:'',
      ff:'',
      dc:'',
      speciality: '',
      nid: '',
      nid_f:'',
      nid_b:'',
      result: false,
      msg: '',
      isLogged: false,
      uploadPercent: 0,
      showUploadProgress: false,
      processingUpload: false,
      profileUp:0,
      sectors: [],



      hosNum: [],
      searchHos:'',
      searchingHos:false,
      hos:'',
      loading: false,
      hospitals:[],


    }
  },
  methods: {

    appDr(){
      if(this.$refs.photo){
        this.showUploadProgress = true
        this.processingUpload = true
        this.uploadPercent = 0
        let formData = new FormData()
        formData.append('nid_front', this.nid_f)
        formData.append('nid_back', this.nid_b)

        formData.append('nid', this.nid)
        formData.append('title', this.title)

        formData.append('sect', this.speciality)
        formData.append('qualification', this.qlf)
        formData.append('reg_no', this.reg_no)
        formData.append('fee', this.fee)
        formData.append('follow_up_fee', this.ff)
        formData.append('doctor_code', this.dc)
        formData.append('hospitals', this.hosNum)

        this.axios.post("doctor/apply", formData, {
          onUploadProgress: (progressEvent) => {
            this.uploadPercent = progressEvent.lengthComputable ? Math.round( (progressEvent.loaded * 100) / progressEvent.total ) : 0 ;
          }
        }).then( (response) => {
          this.err=false;
          this.errMsg='',
              this.msg=response.data.message;
          this.showUploadProgress = false
          this.processingUpload = false
          this.$emit('imageUrl', response.data.secure_url )
          this.profileUp += 1;
          if (response.data.success == true) {
            this.toast(response.data.message, "", "success")
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          } else {
            this.errors=response.data
            this.toast(response.data.error, "", "danger")
          }
        }) .catch( (error) => {
          if(error.response){
            this.err=true;
            this.errMsg=error.response.data.data;
            console.log(error.message)
            this.msg=error.response.data.message;
          }else{
            console.log(error)
          }
          this.showUploadProgress = false
          this.processingUpload = false
        })
      }
    },
    hospitalList() {
      // searchHos request - AH
      this.axios.get("hospital/search?q="+this.searchHos)
          .then(response => {
            this.loading = false;
            console.log((response.data))
            if (response.data.success == true) {
              this.hospitals = response.data
              if (response.data.data.length !== 0) {
                this.searchingHos=false
              }

            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },

    searchHospitals(){
      this.searchingHos=true
      if(this.searchHos!=''){
        this.hospitalList()
      }

    },


    getSec() {
      // Sectors request - AH
      this.axios.get("doctor/sectors")
          .then(response => {
            console.log((response.data))
            this.sectors = response.data

          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });


    },

    onCLChange(e) {
      this.cl = e.target.files[0]
    },

    onNidFChange(e) {
      this.nid_f = e.target.files[0]
    } ,
    onNidBChange(e) {
      this.nid_b = e.target.files[0]
    } ,

  },
  mounted() {
    this.getSec()
  }
}
</script>


<style scoped>

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;

  height: 80px;
  margin-left: 35%;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #2cb09b;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
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