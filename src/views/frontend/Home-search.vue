<template>
  <section class="section section-search">
    <div class="container-fluid">
      <div class="banner-wrapper">
        <div class="banner-header text-center aos" data-aos="fade-up" data-aos-duration="800">
          <h1>{{ $t('entry_title') }}</h1>
          <p>{{ $t('entry_subTitle') }}</p>
        </div>

        <div class="search-box text-center aos" data-aos="fade-up">
          <div class="about-content aos" data-aos="fade-up">

            <router-link :to="{name:'doctors'}">{{$t('apmnt')}}</router-link>
          </div>
        </div>

      </div>
    </div>
  </section>

</template>

<script>


export default {
  name: "Home-search",




}
</script>

<style scoped>

</style>