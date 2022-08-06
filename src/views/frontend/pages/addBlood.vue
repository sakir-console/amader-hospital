<template>

  <div>
    <div class="breadcrumb-bar">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-md-12 col-12">

            <h2 class="breadcrumb-title">Add Blood</h2>
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


                <form @submit.prevent="addBlood">
                  <div class="row form-row">

                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Blood Group</label>
                        <select v-model="bg" class="form-select">
                          <option value="A+"> (A+) </option>
                          <option value="A-"> (A-) </option>
                          <option value="B+"> (B+) </option>
                          <option value="B-"> (B-) </option>
                          <option value="O+"> (O+) </option>
                          <option value="O-"> (O-) </option>
                          <option value="AB+"> (AB+) </option>
                          <option value="AB-"> (AB-) </option>

                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Birthday</label>
                        <input v-model="bd" type="date" class="form-control">
                      </div>
                    </div>

                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>Bags</label>
                        <input v-model="bags" type="number" class="form-control">
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group">
                        <label>NID</label>
                        <input v-model="nid" type="number" class="form-control">
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
                      <label class="col-lg-3 col-form-label">Upazila</label>
                      <div class="col-lg-9">
                        <select v-model="parent_tha" class="form-select">
                          <option v-for="(thana,index) in thanas.data" :key="thana.id" :value="thana.id">
                            {{ thana.name }}
                          </option>
                        </select>
                      </div>
                    </div>

                  </div>
                  <div v-if="errors.length!=0" class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong>
                    <li style="text-transform: capitalize;" v-for="(error,index) in errors.fields">{{ index }}: {{ error }} </li>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                  <div class="submit-section">
                    <button type="submit" class="btn btn-primary submit-btn">Add Blood</button>
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
      hasNid: localStorage.getItem('nid') != null ? true : false,
      bg: '',
      bd: '',
      bags: '',
      thana: '',
      nid: '',
      nid_f: '',
      nid_b: '',
      result: false,
      msg: '',
      isLogged: false,
      uploadPercent: 0,
      showUploadProgress: false,
      processingUpload: false,
      profileUp: 0,
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

    addBlood() {
      if (this.$refs.photo) {
        this.showUploadProgress = true
        this.processingUpload = true
        this.uploadPercent = 0
        let formData = new FormData()
        formData.append('nid_front', this.nid_f)
        formData.append('nid_back', this.nid_b)
        formData.append('nid', this.nid)

        formData.append('blood_group', this.bg)
        formData.append('birth_day', this.bd)
        formData.append('bags', this.bags)
        formData.append('thana', this.parent_tha)

        this.axios.post("bloodbank/add", formData, {
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


    onNidFChange(e) {
      this.nid_f = e.target.files[0]
    },
    onNidBChange(e) {
      this.nid_b = e.target.files[0]
    },

  },
  mounted() {
    this.getDis()
  }
}
</script>

<style scoped>

</style>