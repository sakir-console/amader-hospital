<template>

  <div>
    <div class="breadcrumb-bar">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-md-12 col-12">

            <h2 class="breadcrumb-title">My Appointment list</h2>

          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="row">

          <patSidebar></patSidebar>

          <div class="col-md-7 col-lg-8 col-xl-9">

            <div class="row">
              <div class="col-md-12">
                <h4 class="mb-4">Patients Appointment</h4>
                <div class="appointment-tab">


                  <div class="tab-content">

                    <div class="tab-pane show active" id="upcoming-appointments">
                      <div class="card card-table mb-0">
                        <div class="card-body">
                          <div class="table-responsive">
                            <table class="table table-hover table-center mb-0">
                              <thead>
                              <tr>
                                <th>Doctor </th>
                                <th>Status</th>
                                <th>Appoint date</th>
                                <th>Serial</th>
                                <th>Schedule start</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="(appointment,index) in appointments.data" :key="appointment.id" :value="appointment.id">
                                <td>
                                  <a  v-bind:href=appointmentUrl+appointment.uid>
                                  <h2 class="table-avatar" style="
    color: #20c0f3;
">
                                    {{appointment.doctor}}

                                  </h2>
                                  </a>
                                </td>
                                <td>{{parseInt(appointment.status)?'Completed':'Pending'}}</td>
                                <td>{{appointment.a_date}}</td>
                                <td>{{appointment.serial}}</td>
                                <td class="text-left">{{formatSchTime(appointment.sch_start)}}</td>

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
            <div>
              <ul class="pagination mb-4">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1">Pages:</a>
                </li>
                <li v-for="index in appointments['maxPage']" :key="index" :class="[(page == index) ? 'active':'']">
                  <a style="color: white;font-weight: 900;" class="page-link" href="#" @click="nextPage(index)">{{ index }}</a>
                </li>

              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import patSidebar from "@/components/frontend/patSidebar";
export default {
  name: "patAppointments",
  components: {patSidebar},
  data() {
    return {
      appointmentUrl:'/appointment?doc=',
      page: 1,
      id: '',
      name: '',
      appointments: []
    }
  },
  methods: {
    //   FETCH request - AH

    appointmentsView() {

      this.loading = true;

      //request - AH
      this.axios.get("appointment/"+this.page)
          .then(response => {
            this.loading = false;
            this.appointments=response.data
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
    },
    nextPage(pg) {
      this.page = pg
      this.appointmentsView()
    },
  },
  mounted() {
    this.appointmentsView()
  }
}
</script>

<style scoped>

</style>