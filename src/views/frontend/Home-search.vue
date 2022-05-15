<template>
  <section class="section section-search">
    <div class="container-fluid">
      <div class="banner-wrapper">
        <div class="banner-header text-center aos" data-aos="fade-up" data-aos-duration="800">
          <h1>{{ $t('entry_title') }}</h1>
          <p>{{ $t('entry_subTitle') }}</p>
        </div>

        <div class="search-box aos" data-aos="fade-up">
          <form action="">
            <div class="form-group search-location">
              <input type="text" class="form-control" :placeholder="$t('ent_location')">
              <span class="form-text">{{ $t('slct_location') }}</span>
            </div>
            <div class="form-group search-info">
              <input type="text" class="form-control" :placeholder="$t('ser_name')">
              <span class="form-text">Ex : Shahid sayed nazrul medical college etc</span>
            </div>
            <button type="submit" class="btn btn-primary search-btn mt-0"><i class="fas fa-search"></i>
              <span>Search</span></button>
          </form>
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