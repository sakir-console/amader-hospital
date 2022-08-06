<template>

  <div>
    <div class="breadcrumb-bar">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-md-12 col-12">

            <h2 class="breadcrumb-title">Apply as Ambulance</h2>
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

                <form @submit.prevent="appAmbulance">
                  <div class="row form-row">

                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Car Type</label>
                        <select v-model="ct" class="form-select form-control">
                          <option value="AC">AC</option>
                          <option value="Non_AC">Non AC</option>

                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Car Model</label>
                        <select v-model="cm" class="form-select form-control">
                          <option value="Small">Small</option>
                          <option value="Medium">Medium</option>
                          <option value="Large">Large</option>

                        </select>
                      </div>
                    </div>

                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Mobile Numbers</label>
                        <input v-model="phones" type="text" class="form-control">
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Basic Life support</label>
                        <select v-model="oxygen" class="form-select form-control">
                          <option value="General">General</option>
                          <option value="oxygen_support">Oxygen Support</option>
                          <option value="icu_support">ICU Support</option>
                          <option value="nicu_support">NICU Support</option>
                        </select>
                      </div>
                    </div>      <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Rate</label>
                        <input v-model="rate" type="text" class="form-control">
                      </div>
                    </div>      <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Address</label>
                        <input v-model="addr" type="text" class="form-control">
                      </div>
                    </div>
                    <div class="col-12 col-md-12">
                      <div class="form-group">
                        <label>NID Number:</label>
                        <input v-model="nid" type="number" class="form-control">
                      </div>
                    </div>




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

                    <div class="col-12 col-md-6 upload-img">
                      <div class="">
                        <span><i class="fa fa-upload"></i> Car license: </span>

                        <hr>
                        <input type="file" ref="photo" name="nid_f" accept=".png, .jpg, .jpeg" @change="onCLChange"/>
                      </div>
                      <small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>

                    </div>

                    <div class="col-12 col-md-6 upload-img">
                      <div class="">
                        <span><i class="fa fa-upload"></i> Car Insurance: </span>
                        <hr>
                        <input type="file" ref="photo" name="nid_f" accept=".png, .jpg, .jpeg" @change="onCIChange"/>
                      </div>
                      <small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                    </div>
                    <br>

                    <hr>
                    <div class="col-12 col-md-6 upload-img">
                      <div class="">
                        <span><i class="fa fa-upload"></i>Driving License: </span>
                        <hr>
                        <input type="file" ref="photo" name="nid_f" accept=".png, .jpg, .jpeg" @change="onDLChange"/>
                      </div>
                      <small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                    </div>





                    <p v-if="uploadPercent!=0">  Uploading: {{ uploadPercent }} %</p>
                    <hr>





                    <hr>
                    <div class="col-12 col-md-6 form-group row">
                      <label class="col-lg-3 col-form-label">District</label>
                      <div class="col-lg-9">
                        <select v-model="parent_dis" @change="getTha(parent_dis)" class="form-select">
                          <option v-for="(district,index) in districts.data" :key="district.id"
                                  :value="district.id">{{ district.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 form-group row">
                      <label class="col-lg-3 col-form-label">Upazila</label>
                      <div class="col-lg-9">
                        <select v-model="parent_tha" class="form-select">

                          <option v-for="(thana,index) in thanas.data" :key="thana.id" :value="thana.id">

                            {{ thana.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <hr>

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
  name: "appAmb",
  components: {Sidebar},

  data() {
    return {
      errors:[],
      hasNid:localStorage.getItem('nid')!=null?true:false,
      cl:'',
      ci:'',
      dl:'',
      ct:'',
      cm:'',
      addr:'',
      rate:'',
      oxygen:'',
      phones:'',
      thana: '',
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
      parent: '',
      parent_con: '',
      parent_dis: '',
      parent_tha: '0',
      countries: [],
      districts: [],
      thanas: []
    }
  },
  methods: {

    appAmbulance(){
      if(this.$refs.photo){
        this.showUploadProgress = true
        this.processingUpload = true
        this.uploadPercent = 0
        let formData = new FormData()
        formData.append('car_license', this.cl)
        formData.append('car_insurance', this.ci)
        formData.append('driver_license', this.dl)
        formData.append('nid_front', this.nid_f)
        formData.append('nid_back', this.nid_b)

        formData.append('nid', this.nid)
        formData.append('addr', this.addr)
        formData.append('rate', this.rate)
        formData.append('oxygen', this.oxygen)

        formData.append('car_type', this.ct)
        formData.append('car_model', this.cm)
        formData.append('phones', this.phones)
        formData.append('thana', this.parent_tha)

        this.axios.post("ambulance/save", formData, {
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


    getDis() {
      // locations request - AH
      this.axios.get("location/get/" + 1 + "/district/0")
          .then(response => {
            console.log((response.data))
            this.districts = response.data
            this.getTha(this.parent)
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
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });


    },

    onCLChange(e) {
      this.cl = e.target.files[0]
    },
    onCIChange(e) {
      this.ci = e.target.files[0]
    },
    onDLChange(e) {
      this.dl = e.target.files[0]
    },
    onNidFChange(e) {
      this.nid_f = e.target.files[0]
    } ,
    onNidBChange(e) {
      this.nid_b = e.target.files[0]
    } ,

  },
  mounted() {
    this.getDis()
  }
}
</script>

<style scoped>

</style>