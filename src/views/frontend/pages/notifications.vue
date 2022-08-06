<template>

  <div>
    <div class="breadcrumb-bar">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-md-12 col-12">

            <h2 class="breadcrumb-title">Notifications</h2>
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

                <div v-for="(notification,index) in notificationData.data" :key="notification.id" class="alert alert-info alert-dismissible fade show" role="alert">
                  <strong> <img :src="this.asset_url+'/frontend/assets/img/'+iconNotification(notification.source)"  style="width:40px;padding: 4px;" alt="Notification Image" width="140px">

                  </strong>
                  {{nameNotification(notification.source)}} <a :href=linkNotification(notification.source,notification.object_id) class="alert-link">View>></a>
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>










              </div>
            </div>

            <div>
              <ul class="pagination mb-4">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1">Pages:</a>
                </li>
                <li v-for="index in notificationData['maxPage']" :key="index" :class="[(page == index) ? 'active':'']">
                  <a style="color: white;font-weight: 600;color:#15558d" class="page-link" href="#"
                     @click="nextPage(index)">{{
                      index
                    }}</a>
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


import Sidebar from "@/components/frontend/sidebar";

export default {
  name: "notifications",
  components: {Sidebar},

  data() {
    return {
      errors:[],
      page:1,
      notificationData:[]
      //Notification stat


    }
  },
  methods: {




    readNotifications() {
      // Notification read request - AH
      this.axios.get("/notification/"+this.page)
          .then(response => {
            if (response.data.success == true) {
              console.log((response.data))
              this.notificationData = response.data
            } else {
              this.toast(response.data.error, "", "danger")
            }
          }).catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    notificationSeen() {
      $('#menu_close').click();
      // Notification request - AH
      this.axios.get("/notification/readall")
          .then(response => {
            if (response.data.success == true) {
              console.log((response.data))

            } else {
              this.toast(response.data.error, "", "danger")
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });


    },

    iconNotification(source){

      switch (source) {
        case 'blood_req':
          return 'blood-donation.png.'
          break;
        case 'blood_donated':
          return 'blood-transfusion.png'
          break;
        case 'doctor_req':
          return 'doctor.png'
          break;
        case 'emergency_req':
          return 'siren.png'
          break;
        case 'emergency_accepted':
          return 'accept.png'
          break;

        default:
          console.log(`Sorry, we are out of.`);
      }
    },

    linkNotification(source,obj){

      switch (source) {
        case 'blood_req':
          return 'blood?req='+obj
          break;
        case 'blood_donated':
          return 'blood?req='+obj
          break;
        case 'doctor_req':
          return 'https://admin.amaderhospital.com/doctor-list'
          break;
        case 'emergency_req':
          return 'view-emergency?id='+obj
          break;
        case 'emergency_accepted':
          return 'view-emergency?id='+obj
          break;

        default:
          console.log(`Sorry, we are out of.`);
      }
    },

    nameNotification(source){

      switch (source) {
        case 'blood_req':
          return 'You have new blood request.'
          break;
        case 'blood_donated':
          return 'A blood donor accepted your blood request!'
          break;
        case 'doctor_req':
          return 'Admin!! New Doctor request.'
          break;
        case 'emergency_req':
          return 'You have new Emergency request.'
          break;
        case 'emergency_accepted':
          return 'Your Emergency request has been accepted by a doctor'
          break;

        default:
          console.log(`Sorry, we are out of.`);
      }
    },



    nextPage(pg) {
      this.page = pg
      this.readNotifications()
    },

  },
  mounted() {

    this.readNotifications()
    this.notificationSeen()
  }
}
</script>

<style scoped>

</style>