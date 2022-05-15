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
                        <label>Title</label>
                        <input v-model="title" type="text" class="form-control">
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Qualification</label>
                        <input v-model="qlf" type="text" class="form-control">
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>BMDC</label>
                        <input v-model="bmdc" type="text" class="form-control">
                      </div>
                    </div>

                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Fee</label>
                        <input v-model="fee" type="text" class="form-control">
                      </div>
                    </div>   <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Follow up fee</label>
                        <input v-model="ff" type="text" class="form-control">
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Doctor code</label>
                        <input v-model="dc" type="text" class="form-control">
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
                    </div>


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
      hasNid:localStorage.getItem('nid')!=null?true:false,
      title:'',
      qlf:'',
      bmdc:'',
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
        formData.append('bmdc', this.bmdc)
        formData.append('fee', this.fee)
        formData.append('follow_up_fee', this.ff)
        formData.append('doctor_code', this.dc)

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

</style>