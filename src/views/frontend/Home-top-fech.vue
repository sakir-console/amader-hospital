<template>
  <section class="section home-tile-section">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-9 m-auto">
          <div class="section-header text-center aos" data-aos="fade-up">
            <h2>{{$t('which_ser')}}</h2>
          </div>
          <div class="row">
            <div class="col-lg-4 mb-3 aos" data-aos="fade-up">
              <div class="card text-center doctor-book-card">
                <img :src="this.asset_url+'frontend/assets/img/doctors/doctor-07.jpg'" alt="" class="img-fluid">
                <div class="doctor-book-card-content tile-card-content-1">
                  <div>
                    <h3 class="card-title mb-0">{{$t('spec_drs')}}</h3>
                    <router-link :to="{name:'doctors'}" class="btn book-btn1 px-3 py-2 mt-3 btn-one-light"
                                 tabindex="0">{{$t('apmnt')}}</router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 mb-3 aos" data-aos="fade-up">
              <div class="card text-center doctor-book-card">
                <img :src="this.asset_url+'frontend/assets/img/img-amb.jpg'" alt="" class="img-fluid">
                <div class="doctor-book-card-content tile-card-content-1">
                  <div>
                    <h3 class="card-title mb-0">{{$t('ambulance_service')}}</h3>
                    <router-link :to="{name:'ambulance'}" class="btn book-btn1 px-3 py-2 mt-3 btn-one-light" tabindex="0">{{$t('find')}}</router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 mb-3 aos" data-aos="fade-up">
              <div class="card text-center doctor-book-card">
                <img :src="this.asset_url+'frontend/assets/img/lab-image.jpg'" alt="" class="img-fluid">
                <div class="doctor-book-card-content tile-card-content-1">
                  <div>
                    <h3 class="card-title mb-0">{{$t('bld_ser')}}</h3>
                    <router-link :to="{name:'blood'}" class="btn book-btn1 px-3 py-2 mt-3 btn-one-light"
                                 tabindex="0">{{$t('find')}}</router-link>
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
name: "Home-top-fech"
}
</script>

<style scoped>

</style>