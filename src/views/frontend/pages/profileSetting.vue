<template>

    <div>
      <div class="breadcrumb-bar">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-md-12 col-12">

              <h2 class="breadcrumb-title">My Profile</h2>
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

                  <form @submit.prevent="updateProfile">
                    <div class="row form-row">
                      <div class="col-12 col-md-12">
                        <div class="form-group">
                          <div class="change-avatar">


                            <div class="upload-img">
                              <div class="">
                                Uploading: {{ uploadPercent }} %
                                <br>
                                <span><i class="fa fa-upload"></i> Change Avater</span>
                                <input type="file" ref="photo" name="avatar" accept=".png, .jpg, .jpeg" @change="onAvatarChange"/>
                              </div>
                              <small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>Full Name</label>
                          <input v-model="name" type="text" class="form-control">
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>Username</label>
                          <input v-model="username" type="text" class="form-control">
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>Date of Birth</label>

                            <input v-model="birth" type="date" class="form-control">

                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>Blood Group</label>
                          <select v-model="bg" class="form-select form-control">
                            <option value="A-">A-</option>
                            <option value="A+">A+</option>
                            <option value="B-">B-</option>
                            <option value="C-">C-</option>
                            <option value="AB-">AB-</option>
                            <option value="AB+">AB+</option>
                            <option value="O-">O-</option>
                            <option value="O+">O+</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>Gender</label>
                          <select v-model="gender" class="form-select form-control">
                            <option value="male">Male</option>
                            <option value="female">Female</option>

                          </select>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>Email ID</label>
                          <input v-model="email" type="email" class="form-control" >
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>Mobile</label>
                          <input v-model="phone" type="text" class="form-control">
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>NID</label>
                          <input v-model="nid" type="number" class="form-control">
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                          <label>Address</label>
                          <input v-model="addr" type="text" class="form-control">
                        </div>
                      </div>

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
                      <button type="submit" class="btn btn-primary submit-btn">Save Changes</button>
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
name: "profileSetting",
  components: {Sidebar},

data() {
  return {
    name:'',
    avatar:'',
    username:'',
    email:'',
    phone:'',
    birth:'',
    gender:'',
    bg:'',
    addr: '',
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

  updateProfile(){
    if(this.$refs.photo){
      this.showUploadProgress = true
      this.processingUpload = true
      this.uploadPercent = 0
      let formData = new FormData()
      formData.append('photo', this.avatar)
      formData.append('nid_front', this.nid_f)
      formData.append('nid_back', this.nid_b)
      formData.append('name', this.name)
      formData.append('username', this.username)
      formData.append('email', this.email)
      formData.append('phone', this.phone)
      formData.append('birth', this.birth)
      formData.append('gender', this.gender)
      formData.append('blood_group', this.bg)
      formData.append('addr', this.addr)
      formData.append('nid', this.nid)
      formData.append('thana', this.parent_tha)

      this.axios.post("user/update", formData, {
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

  onAvatarChange(e) {
    this.avatar = e.target.files[0]
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