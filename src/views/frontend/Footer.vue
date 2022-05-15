<template>

  <footer class="footer">

    <div  data-aos="fade" class="footer-top">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-md-6">

            <div class="footer-widget footer-about">
              <div class="footer-logo">
                <img :src="this.asset_url+'frontend/assets/img/logo.png'" width="60%" alt="logo">
              </div>
              <div class="footer-about-content">
                <p>AmaderHospital. Largest healthcare site in Bnagladesh. </p>
                <div class="social-icon">
                  <ul>
                    <li>
                      <a href="#" target="_blank"><i class="fab fa-facebook-f"></i> </a>
                    </li>
                    <li>
                      <a href="#" target="_blank"><i class="fab fa-twitter"></i> </a>
                    </li>
                    <li>
                      <a href="#" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                    </li>
                    <li>
                      <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
                    </li>
                    <li>
                      <a href="#" target="_blank"><i class="fab fa-dribbble"></i> </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
          <div class="col-lg-3 col-md-6">

            <div class="footer-widget footer-menu">
              <h2 class="footer-title">For Patients</h2>
              <ul>
                <li><a href="">Search for Doctors</a></li>
                <li><a href="">Appointments</a></li>
                <li><a href="">Patient Dashboard</a></li>
              </ul>
            </div>

          </div>
          <div class="col-lg-3 col-md-6">

            <div class="footer-widget footer-menu">
              <h2 class="footer-title">For Doctors</h2>
              <ul>
                <li><a href="">About us</a></li>
                <li><a href="">Login</a></li>
                <li><a href="">Register</a></li>
              </ul>
            </div>

          </div>
          <div class="col-lg-3 col-md-6">

            <div class="footer-widget footer-contact">
              <h2 class="footer-title">Contact Us</h2>
              <div class="footer-contact-info">
                <div class="footer-address">
                  <span><i class="fas fa-map-marker-alt"></i></span>
                  <p> Dhaka,<br> Bangladesh </p>
                </div>
                <p>
                  <i class="fas fa-phone-alt"></i>
                  +8801874989834
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>


    <div class="footer-bottom">
      <div class="container-fluid">

        <div class="copyright">
          <div class="row">
            <div class="col-md-6 col-lg-6">
              <div class="copyright-text">
                <p class="mb-0">&copy; 2022 AmaderHospital. All rights reserved.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-6">

              <div class="copyright-menu">
                <ul class="policy-menu">
                  <li><a href="term-condition.html">Terms and Conditions</a></li>
                  <li><a href="privacy-policy.html">Policy</a></li>
                </ul>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

  </footer>

</template>

<script>
export default {
name: "Footer"
}
</script>

<style scoped>

</style>