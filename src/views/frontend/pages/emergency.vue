<template>

  <div class="breadcrumb-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-8 col-12">

          <h2 class="breadcrumb-title">Emergency Support</h2>
        </div>

      </div>
    </div>
  </div>


  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-md-5 col-lg-4 col-xl-2 theiaStickySidebar">

        </div>

        <div class="col-md-7 col-lg-8 col-xl-9">
          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body pt-0">

                  <nav class="user-tabs mb-4">
                    <ul class="nav nav-tabs nav-tabs-bottom nav-justified">
                      <li class="nav-item">
                        <a class="nav-link" href="#pat_medicalrecords" data-bs-toggle="tab">Add Emergency
                          Post</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link active" href="#pat_prescription" data-bs-toggle="tab">My Emergency post</a>
                      </li>
                    </ul>
                  </nav>


                  <div class="tab-content pt-0">

                    <div id="pat_medicalrecords" class="tab-pane fade">

                      <div class="card card-table mb-0">
                        <div class="card-body">
                          <div class="modal-dialog modal-dialog-centered modal-lg" role="document"
                               style="max-width: 900px;">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">Add Emergency medical</h5>

                              </div>
                              <div id="medical_records_form">
                                <div class="modal-body">

                                  <div class="row">
                                    <div class="col-12 col-md-6">
                                      <div class="form-group">
                                        <label>Title Name</label>
                                        <input v-model="name" type="text" name="description" class="form-control"
                                               placeholder="Enter Title Name">
                                      </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                      <div class="form-group">
                                        <label>Gender</label>
                                        <select v-model="gender" class="form-select">
                                          <option value="Male">Male</option>
                                          <option value="Female">Female</option>
                                          <option value="Custom">Custom</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="row">
                                    <div class="col-12 col-md-6">
                                      <div class="form-group">
                                        <label>Age</label>
                                        <input v-model="age" type="number" name="description" class="form-control"
                                               placeholder="Enter Age">
                                      </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                      <div class="form-group">
                                        <label>Body temperature</label>
                                        <input v-model="body_temp" type="number" name="body_temp" class="form-control"
                                               placeholder="Enter Body temperature">
                                      </div>
                                    </div>
                                  </div>


                                  <div class="row">
                                    <div class="col-12 col-md-4">
                                      <div class="form-group">
                                        <label>Blood group</label>
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
                                    <div class="col-12 col-md-4">
                                      <div class="form-group">
                                        <label>Blood pressure</label>
                                        <input v-model="bp" type="text" name="description" class="form-control"
                                               placeholder="Enter Blood pressure">
                                      </div>
                                    </div>
                                    <div class="col-12 col-md-4">
                                      <div class="form-group">
                                        <label>Sugar level</label>
                                        <input v-model="sl" type="text" name="description" class="form-control"
                                               placeholder="Enter Sugar level">
                                      </div>
                                    </div>
                                  </div>


                                  <div class="row">
                                    <div class="col-12">
                                      <div class="form-group">
                                        <label>Details</label>
                                        <textarea v-model="details" rows="5" type="text" name="hospital"
                                                  class="form-control"
                                                  placeholder="Enter details here.."></textarea>
                                      </div>
                                    </div>
                                  </div>


                                  <div class="row">
                                    <div class="col-12">
                                      <div class="form-group">
                                        <label>Symptoms</label>
                                        <div class="time-slot">
                                          <div class="row">
                                            <div class="col-lg-12">
                                              <div class="token-slot mt-2">

                                                <div class="search-wrapper cf">
                                                  <input v-model="symptom_name" type="text"
                                                         placeholder="Enter symptom name..." required
                                                         style="box-shadow: none">
                                                  <button @click="addSymptom" type="submit">Add symptom</button>
                                                </div>
                                                <div v-for="(symptom,index) in symptoms.data" :key="symptoms.id"
                                                     :value="symptom.id" class="form-check-inline visits">
                                                  <label class="visit-btns">
                                                    <input v-model="symNum" :value="symptom.id" type="checkbox"
                                                           class="form-check-input">
                                                    <span class="visit-rsn" data-bs-toggle="tooltip"
                                                          title="Select Symptom">
                                                    {{ symptom.symptom }}
                                                     <br></span>


                                                  </label>
                                                </div>

                                              </div>
                                            </div>

                                          </div>

                                        </div>


                                      </div>
                                    </div>
                                  </div>

                                  <hr>
                                  <div class="row">
                                    <div class="col-12">
                                      <div class="form-group">
                                        <label>Previous History:-</label>
                                        <div class="time-slot">
                                          <div class="row">
                                            <div class="col-lg-12">
                                              <div class="token-slot mt-2">

                                                <div class="search-wrapper cf">
                                                  <input v-model="history_name" type="text"
                                                         placeholder="Enter History name..." required
                                                         style="box-shadow: none">
                                                  <button @click="addHistory" type="submit">Add History</button>
                                                </div>
                                                <div v-for="(history,index) in histories.data" :key="history.id"
                                                     :value="history.id" class="form-check-inline visits">
                                                  <label class="visit-btns">
                                                    <input v-model="hisNum" :value="history.id" type="checkbox"
                                                           class="form-check-input">
                                                    <span class="visit-rsn" data-bs-toggle="tooltip"
                                                          title="Select History">
                                                    {{ history.name }}
                                                     <br></span>


                                                  </label>
                                                </div>

                                              </div>
                                            </div>

                                          </div>

                                        </div>


                                      </div>
                                    </div>
                                  </div>

                                  <hr>
                                  <br>
                                  <div  class="upload-img" style="font-weight: 700;color: cadetblue;margin-bottom: 10px;">
                                    Uploading: {{ uploadPercent }} %
                                    <br>
                                  </div>


                                  <div class="row">
                                    <div class="col-12 col-md-4">
                                      <div class="form-group">
                                        <label>Upload Image 1</label>
                                        <div class="upload-medical-recordsx">
                                          <input ref="photo" name="img1" accept=".png, .jpg, .jpeg"
                                                 @change="onImg1Change" class="form-control" type="file"
                                                 id="user_files_mr1">
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-12 col-md-4">
                                      <div class="form-group">
                                        <label>Upload Image 2</label>
                                        <div class="upload-medical-recordsx">
                                          <input ref="photo" name="img2" accept=".png, .jpg, .jpeg"
                                                 @change="onImg2Change" class="form-control" type="file"
                                                 id="user_files_mr2">
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-12 col-md-4">
                                      <div class="form-group">
                                        <label>Upload Image 3</label>
                                        <div class="upload-medical-recordsx">
                                          <input ref="photo" name="img3" accept=".png, .jpg, .jpeg"
                                                 @change="onImg3Change" class="form-control" type="file"
                                                 id="user_files_mr3">
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div v-if="errors.length!=0" class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Error!</strong>
                                    <li style="text-transform: capitalize;" v-for="(error,index) in errors.fields">{{ index }}: {{ error }} </li>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                  </div>

                                  <div class="text-center mt-4">
                                    <div class="submit-section text-center">
                                      <button @click="addEmergency" type="submit" id="medical_btn" class="btn btn-primary submit-btn">Submit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>


                    <div class="tab-pane fade show active" id="pat_prescription">



                      <div class="card card-table mb-0">

                        <div class="card-body">



                          <div class="table-responsive">
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
                            <h1 v-if="NoData">No Post Found! 😢</h1>

                            <table class="table table-hover table-center mb-0">
                              <thead>
                              <tr>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Age</th>
                                <th>Symptoms</th>
                                <th>Accepted</th>
                                <th></th>

                              </tr>
                              </thead>



                              <tbody>




                              <tr v-for="(emergency,index) in emergency_list.data" :key="emergency.id" :value="emergency.id">
                                <td>
                                  <h2 class="table-avatar">
                                    <a href="#">{{emergency.name}}
                                      <span>@{{emergency.username}}</span></a>
                                  </h2>
                                </td>
                                <td>{{emergency.gender}}</td>
                                <td>{{emergency.phone}}</td>
                                <td class="text-left">{{emergency.age}}</td>
                                <td class="text-left">{{emergency.symptoms}}</td>


                                <td v-if="!parseInt(emergency.accepted)" class="text-left">No</td>
                                <td v-if="parseInt(emergency.accepted)" class="text-end">
                                  <div class="table-action">
                                    <a v-bind:href=chatUrl+emergency.id class="btn btn-sm bg-success-light">
                                      <img :src="this.asset_url+'/frontend/assets/img/drchat.png'"  style="width:40px;padding: 4px;" alt="Notification Image" width="140px">
                                      Doctor Chat
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
<br>
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
  </div>

</template>

<script>
export default {
  name: "emergency",

  data() {
    return {
      chatUrl:'/chat?echat=',
      emerUrl:'/view-emergency?id=',
      errors:[],
      page:"1",
      loading: false,
      NoData:false,

      symNum: [],
      symptom_name: '',
      hisNum: [],
      history_name: '',


      name: '',
      age: '',
      gender: '',
      body_temp: '',
      bg: '',
      bp: '',
      sl: '',
      details: '',

      img1: '',
      img2: '',
      img3: '',

      result: false,
      msg: '',
      uploadPercent: 0,
      showUploadProgress: false,
      processingUpload: false,

      emergencies: [],
      symptoms: [],
      histories: [],
      emergency_list: [],

    }
  },
  methods: {

    myEmergency() {

      this.loading = true;

      //request - AH
      this.axios.get("emergency?page="+this.page)
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
    addEmergency() {
      if (this.$refs.photo) {
        this.showUploadProgress = true
        this.processingUpload = true
        this.uploadPercent = 0
        let formData = new FormData()
        formData.append('img1', this.img1)
        formData.append('img2', this.img2)
        formData.append('img3', this.img3)

        formData.append('name', this.name)
        formData.append('age', this.age)
        formData.append('gender', this.gender)
        formData.append('body_temp', this.body_temp)
        formData.append('symptoms', this.symNum)
        formData.append('history', this.hisNum)
        formData.append('blood_group', this.bg)
        formData.append('blood_pressure', this.bp)
        formData.append('sugar_level', this.sl)
        formData.append('details', this.details)

        this.axios.post("emergency/add", formData, {
          onUploadProgress: (progressEvent) => {
            this.uploadPercent = progressEvent.lengthComputable ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
          }
        }).then((response) => {
          this.err = false;
          this.errMsg = '',
              this.msg = response.data.message;
          this.showUploadProgress = false
          this.processingUpload = false
          this.$emit('imageUrl', response.data.secure_url)
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
        }).catch((error) => {
          if (error.response) {
            this.err = true;
            this.errMsg = error.response.data.data;
            console.log(error.message)
            this.msg = error.response.data.message;
          } else {
            console.log(error)
          }
          this.showUploadProgress = false
          this.processingUpload = false
        })
      }
    },


    getSymptoms() {
      // Sectors request - AH
      this.axios.get("emergency/symptoms")
          .then(response => {
            console.log((response.data))
            this.symptoms = response.data

          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    addSymptom() {
      //  request - AH
      this.axios.post("emergency/symptom", this.pBody({
        "symptom": this.symptom_name
      })).then(response => {
        console.log((response.data))

        if (response.data.success == true) {
          this.toast(response.data.message, "", "success")
          this.getSymptoms()
        } else {
          this.toast(response.data.error, "", "danger")
        }

      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },
    getHistories() {
      // request - AH
      this.axios.get("emergency/histories")
          .then(response => {
            console.log((response.data))
            this.histories = response.data

          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    addHistory() {
      //  request - AH
      this.axios.post("emergency/history", this.pBody({
        "name": this.history_name,
      })).then(response => {
        console.log((response.data))

        if (response.data.success == true) {
          this.toast(response.data.message, "", "success")
          this.getHistories()
        } else {
          this.toast(response.data.error, "", "danger")
        }

      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },
    nextPage(pg) {
      this.page = pg
      this.myEmergency()
    },


    onImg1Change(e) {
      this.img1 = e.target.files[0]
    },

    onImg2Change(e) {
      this.img2 = e.target.files[0]
    },
    onImg3Change(e) {
      this.img3 = e.target.files[0]
    },

  },
  mounted() {
    this.myEmergency()
    this.getSymptoms()
    this.getHistories()
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

.visits span.visit-rsn {
  text-align: center;
  border: 0;
  /* border-radius: 5px; */
  padding: 7px 15px 5px 8px;
  background: #f3f9ff;
  min-width: max-content;
  display: inline-block;
  width: 100%;
}
.visits input:checked~.visit-rsn {
  background-color: #1ccc68;
  color: #fff;
  border-radius: 4px;
}
/*Clearing Floats*/
.cf:before, .cf:after {
  content: "";
  display: table;
}

.cf:after {
  clear: both;
}

.cf {
  zoom: 1;
}

/* Form wrapper styling */

.search-wrapper {
  width: 450px;
  margin-top: 10px;
  margin-bottom: 25px;
  border-radius: 40px;
  background: transparent;
  box-shadow: 0 4px 20px -2px #e9e9e9;
}

/* Form text input */

.search-wrapper input {
  padding-left: 20px;
  width: 330px;
  height: 20px;
  padding: 20px 8px;
  float: left;
  font: bold 13px 'lucida sans', 'trebuchet MS', 'Tahoma';
  border: 0;
  background: #fff;
  border-radius: 40px;
  border-top-style: none;
}

.search-wrapper input:focus {
  outline: 0;
  background: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.8) inset;
}

.search-wrapper input::-webkit-input-placeholder {
  color: #999;
  font-weight: normal;
  font-style: italic;
  padding-left: 20px;
}

.search-wrapper input:-moz-placeholder {

  color: #999;
  font-weight: normal;
  font-style: italic;
}

.search-wrapper input:-ms-input-placeholder {
  color: #999;
  font-weight: normal;
  font-style: italic;
  border-style: none;
}

/* Form submit button */
.search-wrapper button {
  overflow: visible;
  position: relative;
  float: right;
  border: 0;
  padding: 0;
  cursor: pointer;
  height: 40px;
  width: 110px;
  font: 13px/40px 'lucida sans', 'trebuchet MS', 'Tahoma';
  color: #fff;
  text-transform: uppercase;
  background: #198cff;
  border-radius: 40px;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, .3);
}

.search-wrapper button:hover {
  /*     background: #e54040; */
}

.search-wrapper button:active,
.search-wrapper button:focus {
  background: # #21a986;
  outline: 0;
}

.search-wrapper button:focus:before,
.search-wrapper button:active:before {
  border-right-color: #c42f2f;
}

.search-wrapper button::-moz-focus-inner { /* remove extra button spacing for Mozilla Firefox */
  border: 0;
  padding: 0;
}
</style>