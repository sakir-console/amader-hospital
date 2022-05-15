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
                        <input v-model="ct" type="text" class="form-control">
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Car Model</label>
                        <input v-model="cm" type="text" class="form-control">
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
                        <label>NID</label>
                        <input v-model="nid" type="number" class="form-control">
                      </div>
                    </div>


                    <br>
                    <div class="upload-img">
                      Uploading: {{ uploadPercent }} %
                      <br>
                      <br>
                      <div class="">
                        <span><i class="fa fa-upload"></i> Car license</span>
                        <input type="file" ref="photo" name="nid_f" accept=".png, .jpg, .jpeg" @change="onCLChange"/>
                      </div>
                      <small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                    </div>

                    <br><br><br>


                    <div class="upload-img">
                      <div class="">
                        <span><i class="fa fa-upload"></i> Car Insurance</span>
                        <input type="file" ref="photo" name="nid_b" accept=".png, .jpg, .jpeg" @change="onCIChange"/>
                      </div>
                      <small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                    </div>
                    <br><br><br>

                    <div class="upload-img">
                      <div class="">
                        <span><i class="fa fa-upload"></i>Driving License</span>
                        <input type="file" ref="photo" name="nid_b" accept=".png, .jpg, .jpeg" @change="onDLChange"/>
                      </div>
                      <small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                    </div>
                    <br><br><br>



                    <div id="nid">
                        <div class="upload-img">
                          <div class="">
                            <span><i class="fa fa-upload"></i> NID Front</span>
                            <input type="file" ref="photo" name="nid_f" accept=".png, .jpg, .jpeg" @change="onNidFChange"/>
                          </div>
                          <small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                        </div>

                      <div class="upload-img">
                          <div class="">
                            <span><i class="fa fa-upload"></i> NID Back</span>
                            <input type="file" ref="photo" name="nid_b" accept=".png, .jpg, .jpeg" @change="onNidBChange"/>
                          </div>
                          <small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                        </div>
                    </div>






                    <div class="form-group row">
                      <label class="col-lg-3 col-form-label">Country</label>
                      <div class="col-lg-9">
                        <select v-model="parent_con" @change="getDis(parent_con)" class="form-select">

                          <option v-for="(country,index) in countries.data" :key="country.id" :value="country.id">
                            {{ country.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-lg-3 col-form-label">District</label>
                      <div class="col-lg-9">
                        <select v-model="parent_dis" @change="getTha(parent_dis)" class="form-select">
                          <option v-for="(district,index) in districts.data" :key="district.id"
                                  :value="district.id">{{ district.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-lg-3 col-form-label">Thana</label>
                      <div class="col-lg-9">
                        <select v-model="parent_tha" class="form-select">
                          <option v-for="(thana,index) in thanas.data" :key="thana.id" :value="thana.id">
                            {{ thana.name }}
                          </option>
                        </select>
                      </div>
                    </div>

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
      hasNid:localStorage.getItem('nid')!=null?true:false,
      cl:'',
      ci:'',
      dl:'',
      ct:'',
      cm:'',
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
          } else {
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


    getCon() {
      // locations request - AH
      this.axios.get("location/get/all/country/0")
          .then(response => {
            console.log((response.data))
            this.countries = response.data
            this.getDis(this.parent)
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });


    },
    getDis(con) {
      // locations request - AH
      this.axios.get("location/get/" + con + "/district/0")
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
    this.getCon()
  }
}
</script>

<style scoped>

</style>