<template>
  <section class="section section-features">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5 features-img aos" data-aos="fade-up">
          <img :src="this.asset_url+'frontend/assets/img/features/feature.png'" class="img-fluid" alt="Feature">
        </div>
        <div class="col-md-7">
          <div class="section-header aos" data-aos="fade-up">
            <h2 class="mt-2">{{$t('hm_apmnt')}}</h2>
            <p> {{$t('hm_apmnt_sub')}} </p>
          </div>
          <div class="features-slider d-flex justify-content-between aos" data-aos="fade-up">

            <div class="feature-item  text-center">
              <img :src="this.asset_url+'frontend/assets/img/features/feature-01.jpg'" class="img-fluid" alt="Feature">
              <p>Medical</p>
            </div>


            <div class="feature-item  text-center">
              <img :src="this.asset_url+'frontend/assets/img/features/feature-02.jpg'" class="img-fluid" alt="Feature">
              <p>Laboratory</p>
            </div>


            <div class="feature-item  text-center">
              <img :src="this.asset_url+'frontend/assets/img/features/feature-03.jpg'" class="img-fluid" alt="Feature">
              <p>ICU</p>
            </div>


            <div class="feature-item  text-center">
              <img :src="this.asset_url+'frontend/assets/img/features/feature-04.jpg'" class="img-fluid" alt="Feature">
              <p>Laboratory</p>
            </div>


            <div class="feature-item mx-2 text-center">
              <img :src="this.asset_url+'frontend/assets/img/features/feature-05.jpg'" class="img-fluid" alt="Feature">
              <p>Operation</p>
            </div>



          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
export default {
name: "Home-features"
}
</script>

<style scoped>

</style>