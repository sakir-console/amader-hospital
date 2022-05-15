<template>


  <section class="section section-specialities">
    <div class="container-fluid">

        <div class="col-md-9 m-auto">
          <div class="section-header text-center aos" data-aos="fade-up">
            <h2>{{$t('exp_drs')}} </h2>
            <p class="sub-title">{{$t('exp_mbbs')}}</p>
          </div>
          <div class="row text-center">

            <div class="col-lg-4  mb-3-auto ">
              <div class="speicality-img text-center">
                <img :src="this.asset_url+'frontend/assets/img/specialities/specialities-01.png'" class="img-fluid"
                     alt="Speciality">
                <span><i class="fa fa-circle" aria-hidden="true"></i></span>
              </div>
              <p>{{$t('t_dir')}}</p>
            </div>
            <div class="col-lg-4 mb-3 aos">
              <div class="speicality-img">
                <img :src="this.asset_url+'frontend/assets/img/specialities/specialities-02.png'" class="img-fluid"
                     alt="Speciality">
                <span><i class="fa fa-circle" aria-hidden="true"></i></span>
              </div>
              <p>{{$t('t_psy')}}</p>
            </div>
            <div class="col-lg-4 mb-3 aos">
              <div class="speicality-img">
                <img :src="this.asset_url+'frontend/assets/img/specialities/specialities-03.png'" class="img-fluid"
                     alt="Speciality">
                <span><i class="fa fa-circle" aria-hidden="true"></i></span>
              </div>
              <p>{{$t('t_sc')}}</p>
            </div>
            <div class="col-lg-4 mb-3 aos">
              <div class="speicality-img">
                <img :src="this.asset_url+'frontend/assets/img/specialities/specialities-04.png'" class="img-fluid"
                     alt="Speciality">
                <span><i class="fa fa-circle" aria-hidden="true"></i></span>
              </div>
              <p>{{$t('t_nu')}}</p>
            </div>
            <div class="col-lg-4 mb-3 aos">
              <div class="speicality-img">
                <img :src="this.asset_url+'frontend/assets/img/specialities/pt-dashboard-04.png'" class="img-fluid"
                     alt="Speciality">
                <span><i class="fa fa-circle" aria-hidden="true"></i></span>
              </div>
              <p>{{$t('t_se')}}</p>
            </div>
            <div class="col-lg-4 mb-3 aos">
              <div class="speicality-img">
                <img :src="this.asset_url+'frontend/assets/img/specialities/specialities-03.png'" class="img-fluid"
                     alt="Speciality">
                <span><i class="fa fa-circle" aria-hidden="true"></i></span>
              </div>
              <p>{{$t('t_psy')}}</p>
            </div>

          </div>
        </div>

    </div>
  </section>


</template>

<script>

export default {
name: "Home-Specialist"
}
</script>

<style scoped>

</style>