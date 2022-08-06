<template>

  <div class="breadcrumb-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-8 col-12">

          <h2 class="breadcrumb-title">Doctor Appointment</h2>
        </div>

      </div>
    </div>
  </div>


  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="doctor-widget">
                <div class="doc-info-left">
                  <div class="doctor-img">
                    <img :src="this.getPP(doctor)" style="

" class="img-fluid" alt="Hospital Image">
                  </div>
                  <div class="doc-info-cont">
                    <h4 class="doc-name">{{ doctor.name }}</h4>


                    <div class="rating">
                      <span class="d-inline-block average-rating">({{ doctor.name }})</span>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star"></i>
                    </div>
                    <div class="clinic-details">
                      <px class="doc-location"><i class="fa fa-book-medical"> Specialist: </i> {{ doctor.sector }}</px>
                    </div>
                    <div class="clinic-details">
                      <a class="btn btn-white call-btn">
                        <i class="fas fa-clinic-medical"></i>
                        Hospitals:
                      </a>

                      <span v-for="(hospital,index) in doc_hospitals" :key="hospital.id" style="padding: 6px;border: 1px dotted #2af7ff;margin-left: 12px;">

<a v-bind:href=hospitalUrl+hospital.id>
                        {{ hospital.name }}
</a>
                      </span>

                    </div>

                  </div>
                </div>
                <div class="doc-info-right">
                  <div class="clini-infos">
                    <ul>
                      <li><i class="fa fa-notes-medical"></i> Qualifications: {{ doctor.qualification }}</li>
                      <li><i class="fa fa-notes-medical"></i> Reg. No: {{ doctor.reg_no }}</li>
                      <li><i class="fa fa-notes-medical"></i>Dr. Code: {{ doctor.doctor_code }}</li>
                      <li><i class="fa fa-notes-medical"></i>Fee: ৳{{ doctor.fee }}</li>
                      <li><i class="fa fa-notes-medical"></i>Follow up fee: ৳{{ doctor.follow_up_fee }}</li>
                    </ul>
                  </div>


                </div>
              </div>
            </div>
          </div>

          <div class="card booking-schedule schedule-widget">

            <div class="schedule-header">
              <div class="row">
                <div class="col-md-12">

                  <div class="day-slot">
                      Time Schedule
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

                          <div v-if="errors.length!=0" class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Error!</strong>
                            <li style="text-transform: capitalize;" v-for="(error,index) in errors.fields">{{ index }}: {{ error }} </li>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                          </div>
                          <div class=" form-group form-focus" style="width: 34%;">
                            <input v-model="date" type="date" class="form-control floating" style="height: 60px">
                            <label class="focus-label">Select Date</label></div>
                          <div v-for="(schedule,index) in schedules.data" :key="schedule.id" :value="schedule.id" class="form-check-inline visits">
                            <label class="visit-btns">
                              <input v-model="sch_id" type="radio" class="form-check-input" :value="schedule.id">
                              <span class="visit-rsn" data-bs-toggle="tooltip" title="Select to Appointment">{{getDay(parseInt(schedule.day))}}
                                <br>{{formatSchTime(schedule.start_time)}}-{{formatSchTime(schedule.end_time)}}</span>
                            </label>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>


          <div class="submit-section proceed-btn text-end">
            <a @click="newAppointment" href="#" class="btn btn-primary submit-btn">Confirm Appointment</a>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>

let urlParams = new URLSearchParams(window.location.search);
export default {
  name: "appointment",
  data() {
    return {
      errors:[],
      hospitalUrl:'/hospital?id=',
      loading: false,
      page: 1,
      spec:'',
      sch_id:'',
      date:'',
      doctor:[],
      doc_hospitals:[],
      schedules: []

    }
  },
  methods: {


    viewDoctor() {
      this.loading = true
      this.axios.get("doctor/profile/" + urlParams.get('doc'))
          .then(response => {
            this.loading = false
            console.log((response.data))
            this.doctor = response.data.info
            this.doc_hospitals = response.data.hospitals
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },


    //  FETCH request - AH
    viewSchedules() {
      this.loading = true
      this.axios.get("doctor/schedules/"+urlParams.get('doc')+"/0")
          .then(response => {
            this.loading = false
            console.log((response.data))
            this.schedules = response.data
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },
    newAppointment() {
      // locations request - AH
      this.axios.post("appointment/new", this.pBody({
        "doctor":urlParams.get('doc'),
        "schedule":this.sch_id,
        "date":this.date
      })).then(response => {
        console.log((response.data))

        if (response.data.success == true) {
          this.toast(response.data.message, "", "success")
          setTimeout(function(){
            window.location.href = '/success';
          }, 3000);
        } else {
          this.errors=response.data
          this.toast(response.data.error, "", "danger")
        }

      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },

    getDay(num){
      switch (num) {
        case 1:
          return "Sunday";
          break;
        case 2:
          return "Monday";
          break;
        case 3:
          return "Tuesday";
          break;
        case 4:
          return "Wednesday";
          break;
        case 5:
          return "Thursday";
          break;
        case 6:
          return "Friday";
          break;
        case 0:
          return "Saturday";
      }
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
    this.viewSchedules()
    this.viewDoctor()

  }
}
</script>

<style scoped>

</style>