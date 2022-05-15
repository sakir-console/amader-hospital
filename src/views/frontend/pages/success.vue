<template>
  <div class="breadcrumb-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-8 col-12">

          <h2 class="breadcrumb-title">Booking Success</h2>
        </div>

      </div>
    </div>
  </div>

  <div class="content success-page-cont">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-6">

          <div class="card success-card">
            <div class="card-body">
              <div class="success-cont">
                <i class="fas fa-check"></i>
                <h3>Appointment booked Successfully!</h3>

                <router-link :to="{name:'Home'}"><div class="btn btn-primary view-inv-btn">Back to Home</div></router-link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
name: "success"
}
</script>

<style scoped>

</style>