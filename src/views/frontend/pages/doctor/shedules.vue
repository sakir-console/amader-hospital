<template>

  <div>
    <div class="breadcrumb-bar">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-md-12 col-12">

            <h2 class="breadcrumb-title">Doctor dashboard</h2>

          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="row">

          <docSidebar></docSidebar>

          <div class="col-md-7 col-lg-8 col-xl-9">
            <div class="row">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Schedule Timings</h4>
                    <div class="profile-box">
                      <div class="row">

                        <label>Add new Schedule</label>
                        <div class="col-lg-2">

                          <div v-if="errors.length!=0" class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Error!</strong>
                            <li style="text-transform: capitalize;" v-for="(error,index) in errors.fields">{{ index }}: {{ error }} </li>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                          </div>
                          <div class="form-group">

                            <label>Start time</label>
                            <input v-model="start_time" type="time" class="form-control"
                                   placeholder="Enter start time">


                          </div>
                        </div>
                        <div class="col-lg-2">
                          <div class="form-group">
                            <label>End time</label>
                            <input v-model="end_time" type="time" class="form-control"
                                   placeholder="Enter End time">
                          </div>
                        </div>
                        <div class="col-lg-2">
                          <div class="form-group">
                            <label>Date</label>
                            <select v-model="date" class="select form-control select2-hidden-accessible" data-select2-id="1" tabindex="-1" aria-hidden="true">

                              <option value="sat">Saturday</option>
                              <option value="sun">Sunday</option>
                              <option value="mon">Monday</option>
                              <option value="tue">Tuesday</option>
                              <option value="wed">Wednesday</option>
                              <option value="thu">Thursday</option>
                              <option value="fri">Friday</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-lg-2">

                            <button @click="addSchedule" type="button" class="btn btn-warning" style="margin-bottom: 2px;margin-top: 35px;">Add</button>

                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="card schedule-widget mb-0">


                            <div class="tab-content schedule-cont">


                              <div id="slot_time" class="tab-pane fade show active">


                                <div class="doc-times">

                                  <div v-for="(schedule,index) in schedules.data" :key="schedule.id" :value="schedule.id"  class="doc-slot-list">
                                    {{getDay(parseInt(schedule.day))}}<br>
                                    {{formatSchTime(schedule.start_time)}} - {{formatSchTime(schedule.end_time)}}
                                    <a @click="removeSchedule(schedule.id)" class="delete_schedule">
                                      <i class="fa fa-times"></i>
                                    </a>
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


        </div>
      </div>
    </div>
  </div>


</template>

<script>
import docSidebar from "@/components/frontend/docSidebar";

export default {
  name: "schedules",
  components: {docSidebar},
  data() {
    return {
      errors:[],
      page: 1,
      id: '',
      name: '',
      start_time: '',
      end_time: '',
      date:'',
      sch_id: '',
      schedules: []
    }
  },
  methods: {
    //   FETCH request - AH
    viewSchedules() {
      this.loading = true
      this.axios.get("doctor/schedules/" + localStorage.getItem("user") + "/0")
          .then(response => {
            this.loading = false
            console.log((response.data))
            this.schedules = response.data
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },
    addSchedule() {
      // locations request - AH
      this.axios.post("doctor/schedule", this.pBody({
        "start":this.strToSchTime(this.start_time),
        "end":this.strToSchTime(this.end_time),
        "day":this.date
      })).then(response => {
        console.log((response.data))
        this.viewSchedules()
        if (response.data.success == true) {
          this.toast(response.data.message, "", "success")
        } else {
          this.errors=response.data
          this.toast(response.data.error, "", "danger")
        }

      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },


    removeSchedule(id) {
      // locations request - AH
      this.axios.post("doctor/unschedule", this.pBody({
        "id":id
      })).then(response => {
        console.log((response.data))

        if (response.data.success == true) {
          this.toast(response.data.message, "", "success")
          this.viewSchedules()
        } else {
          this.toast(response.data.error, "", "danger")
        }

      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },

    strToSchTime(str){
      str = str.split(':');
      if(str.length !== 2){
        return;
      }
      const [h, min] = str.map(i=>parseInt(i));
      return h * 60 + min;
    },
    getDay(num) {
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
    },
  },
  mounted() {
    this.viewSchedules()
  }
}
</script>

<style scoped>

</style>