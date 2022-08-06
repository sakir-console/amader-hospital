<template>

  <section class="looking-section-five">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-header section-header-five text-center aos" data-aos="fade-up">
            <h2 class="title-five">Data Center</h2>
          </div>
        </div>
      </div>
      <div class="looking-bg-five">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-6 d-flex aos" data-aos="fade-up">
            <div class="looking-grid-five looking-grid-blue w-100">
              <div class="looking-icon-five">
                <i class="fas fa-life-ring"></i>
              </div>
              <div class="looking-info-five">
                <a href="">Blood Pressure</a>
                <p>Preventative health screenings services provided by demographic.</p>
                <h3>TK. 2321</h3>
              </div>

              <div class="looking-info-btn">

                <a @click="comming" class="btn btn-five">Enroll Now <i class="feather-arrow-right ms-1"></i></a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 d-flex aos" data-aos="fade-up">
            <div class="looking-grid-five looking-grid-green w-100">
              <div class="looking-icon-five">
                <i class="fas fa-tablets"></i>
              </div>
              <div class="looking-info-five">
                <a href="pharmacy-search.html">Brain Cancer</a>
                <p>This primary tumor domain was obtained from the Medical Centre.</p>
                <h3>TK. 1321</h3>
              </div>
              <div class="looking-info-btn">
                <a @click="comming" class="btn btn-five">Enroll Now <i class="feather-arrow-right ms-1"></i></a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 d-flex aos" data-aos="fade-up">
            <div class="looking-grid-five looking-grid-orange w-100">
              <div class="looking-icon-five">
                <i class="fas fa-vial"></i>
              </div>
              <div class="looking-info-five">
                <a href="#">Breast Cancer</a>
                <p>This repo store raw data which collect from various ways of Breast Cancer.</p>
                <h3>TK. 3321</h3>
              </div>
              <div class="looking-info-btn">
                <a @click="comming" class="btn btn-five">Enroll Now <i class="feather-arrow-right ms-1"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="looking-bg-five">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-6 d-flex aos" data-aos="fade-up">
            <div class="looking-grid-five looking-grid-blue w-100">
              <div class="looking-icon-five">
                <i class="fas fa-database"></i>
              </div>
              <div class="looking-info-five">
                <a href="">Contagious Diseases</a>
                <p>Tycho database was named after the Danish nobleman Tycho Brahe</p>
                <h3>TK. 4121</h3>
              </div>

              <div class="looking-info-btn">

                <a @click="comming" class="btn btn-five">Enroll Now <i class="feather-arrow-right ms-1"></i></a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 d-flex aos" data-aos="fade-up">
            <div class="looking-grid-five looking-grid-green w-100">
              <div class="looking-icon-five">
                <i class="fas fa-diagnoses"></i>
              </div>
              <div class="looking-info-five">
                <a href="">Diabetic Raw Data</a>
                <p>This repo store raw data which collect from various ways Medical Centre.</p>
                <h3>TK. 1821</h3>
              </div>
              <div class="looking-info-btn">
                <a @click="comming" class="btn btn-five">Enroll Now <i class="feather-arrow-right ms-1"></i></a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 d-flex aos" data-aos="fade-up">
            <div class="looking-grid-five looking-grid-orange w-100">
              <div class="looking-icon-five">
                <i class="fas fa-eye"></i>
              </div>
              <div class="looking-info-five">
                <a href="#">Eye Diseases</a>
                <p>This repo store raw data which collect from various ways of Eye Diseases.</p>
                <h3>TK. 2120</h3>
              </div>
              <div class="looking-info-btn">
                <a @click="comming" class="btn btn-five">Enroll Now <i class="feather-arrow-right ms-1"></i></a>
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
name: "dataLab",
  methods: {
     comming(){
       this.toast("Data center is under development.", "", "danger")
     }
  }
}
</script>

<style scoped>

</style>