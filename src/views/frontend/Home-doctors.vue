<template>
  <section class="section section-doctor">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4">
          <div class="section-header aos" data-aos="fade-up">
            <h2> {{$t('apmnt')}}</h2>
            <p>{{$t('home_apmnt_ttl')}}</p>
          </div>
          <div class="about-content aos" data-aos="fade-up">
            <p>{{$t('home_apmnt_Subttl')}}</p>
            <router-link :to="{name:'doctors'}">{{$t('apmnt')}}</router-link>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="d-flex justify-content-around" data-aos="fade-up" data-aos-duration="700">

            <div v-for="(doctor,index) in doctors.data" :key="doctor.id" class="col-lg-4 mx-1 mb-3 aos profile-widget">
              <div class="doc-img">
                <a href="#">
                  <img :src="this.getPP(doctor)" class="img-fluid" alt="User Image" style="width: 200px;height: 150px;">
                </a>
                <a href="#" class="fav-btn">
                  <i class="far fa-bookmark"></i>
                </a>
              </div>
              <div class="pro-content">
                <h3 class="title">
                  <a v-bind:href=appointmentUrl+doctor.uid>{{ doctor.name }}</a>
                  <i class="fas fa-check-circle verified"></i>
                </h3>
                <p class="speciality" style="min-height: 10px;"> {{doctor.qualification}}</p>
                <div class="rating">
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>

                </div>
                <ul class="available-info">

                  <li>
                    @{{ doctor.username }}
                  </li>
                  <li>
                  <i class="fas fa-money-bill"></i>Fee: ৳{{doctor.fee}}
                   <i class="far fa-money-bill-alt"></i>Follow-up fee: ৳{{doctor.follow_up_fee}}
                  </li>
                </ul>
                <div class="row row-sm">
                  <div class="col-6">
                    <a href="#" class="btn view-btn"><i style="color: green;font-size: 18px;" class="fas fa-check-circle verified"></i>. Verified</a>
                  </div>
                  <div class="col-6">
                    <a v-bind:href=appointmentUrl+doctor.uid class="btn book-btn">{{$t('apmnt')}}</a>
                  </div>
                </div>
              </div>
            </div>






          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
export default {
name: "Home-doctors",
  data() {
    return {
      appointmentUrl:'/appointment?doc=',
      loading: false,
      page: 1,
      NoData:false,

      doctors: []

    }
  },
  methods: {

    // viewTopDocs FETCH request - AH
    viewTopDocs() {
      this.loading = true
      this.axios.get("sitedata/top")
          .then(response => {
            this.loading = false
            if(response.data.data.length!==0){this.NoData=false}else{this.NoData=true}
            console.log((response.data))
            this.doctors = response.data
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },

  },
  mounted() {
    this.viewTopDocs()

  }
}
</script>

<style scoped>

</style>