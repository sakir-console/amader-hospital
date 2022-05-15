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
                        <a class="nav-link active" href="#pat_medicalrecords" data-bs-toggle="tab">Add Emergency
                          Post</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#pat_prescription" data-bs-toggle="tab">My Emergency post</a>
                      </li>
                    </ul>
                  </nav>


                  <div class="tab-content pt-0">

                    <div id="pat_medicalrecords" class="tab-pane fade show active">

                      <div class="card card-table mb-0">
                        <div class="card-body">
                          <div class="modal-dialog modal-dialog-centered modal-lg" role="document"
                               style="max-width: 900px;">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">Add Emergency medical</h5>

                              </div>
                              <form id="medical_records_form" enctype="multipart/form-data">
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
                                          <option value="male">Male</option>
                                          <option value="female">Female</option>
                                          <option value="custom">Custom</option>
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
                                        <label>Phone number</label>
                                        <input v-model="phone" type="number" name="description" class="form-control"
                                               placeholder="Enter Phone number">
                                      </div>
                                    </div>
                                  </div>


                                  <div class="row">
                                    <div class="col-12 col-md-4">
                                      <div class="form-group">
                                        <label>Blood group</label>
                                        <input v-model="bg" type="text" name="description" class="form-control"
                                               placeholder="Enter Blood group">
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
                                                  placeholder="Enter name here.."></textarea>
                                      </div>
                                    </div>
                                  </div>




                                  <br>
                                  <div class="upload-img">
                                    Uploading: {{ uploadPercent }} %
                                    <br>
                                  </div>


                                  <div class="row">
                                    <div class="col-12 col-md-4">
                                      <div class="form-group">
                                        <label>Upload Image 1</label>
                                        <div class="upload-medical-recordsx">
                                          <input  ref="photo" name="img1" accept=".png, .jpg, .jpeg"
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


                                  <div class="text-center mt-4">
                                    <div class="submit-section text-center">
                                      <button type="submit" id="medical_btn" class="btn btn-primary submit-btn">Submit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>


                    <div class="tab-pane fade" id="pat_prescription">
                      <div class="card card-table mb-0">
                        <div class="card-body">
                          <div class="table-responsive">
                            <table class="table table-hover table-center mb-0">
                              <thead>
                              <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Accepted</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <td>1</td>
                                <td>11 Nov 2019 <span class="d-block text-info">10.00 AM</span></td>
                                <td>Prescription</td>
                                <td>
                                  <h2 class="table-avatar">

                                    <a href="doctor-profile.html">Dr. Ruby Perrin <span>Dental</span></a>
                                  </h2>
                                </td>
                                <td>
                                  <div class="table-action">
                                    <a href="javascript:void(0);" class="btn btn-sm bg-info-light">
                                      <i class="far fa-eye"></i> View
                                    </a>
                                    <a href="javascript:void(0);" class="btn btn-sm bg-success-light">
                                      <i class="fas fa-print"></i> Print
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
      name: '',
      age: '',
      gender: '',
      phone: '',
      emr_symptom: '',
      history: '',
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
      histories: []

    }
  },
  methods: {

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
        formData.append('phone', this.phone)
        formData.append('symptoms', this.symptoms)
        formData.append('history', this.history)
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
          } else {
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

    getHistories() {
      // Sectors request - AH
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
    this.getSymptoms()
  }
}
</script>

<style scoped>

</style>