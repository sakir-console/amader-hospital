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
            <a href="">{{$t('apmnt')}}</a>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="d-flex justify-content-around" data-aos="fade-up" data-aos-duration="700">

            <div class="col-lg-4 mx-1 mb-3 aos profile-widget">
              <div class="doc-img">
                <a href="doctor-profile.html">
                  <img class="img-fluid" alt="User Image" src="frontend/assets/img/doctors/doctor-01.jpg">
                </a>
                <a href="javascript:void(0)" class="fav-btn">
                  <i class="far fa-bookmark"></i>
                </a>
              </div>
              <div class="pro-content">
                <h3 class="title">
                  <a href="doctor-profile.html">Ruby Perrin</a>
                  <i class="fas fa-check-circle verified"></i>
                </h3>
                <p class="speciality">MDS - Periodontology and Oral Implantology, BDS</p>
                <div class="rating">
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <span class="d-inline-block average-rating">(17)</span>
                </div>
                <ul class="available-info">
                  <li>
                    <i class="fas fa-map-marker-alt"></i> Florida, USA
                  </li>
                  <li>
                    <i class="far fa-clock"></i> Available on Fri, 22 Mar
                  </li>
                  <li>
                    <i class="far fa-money-bill-alt"></i> ৳ 105
                    <i class="fas fa-info-circle" data-bs-toggle="tooltip" title="Lorem Ipsum"></i>
                  </li>
                </ul>
                <div class="row row-sm">
                  <div class="col-6">
                    <a href="doctor-profile.html" class="btn view-btn">{{$t('view_prf')}}</a>
                  </div>
                  <div class="col-6">
                    <a href="booking.html" class="btn book-btn">{{$t('apmnt')}}</a>
                  </div>
                </div>
              </div>
            </div>


            <div class="col-lg-4 mx-1 mb-3 aos profile-widget">
              <div class="doc-img">
                <a href="doctor-profile.html">
                  <img class="img-fluid" alt="User Image" src="frontend/assets/img/doctors/doctor-02.jpg">
                </a>
                <a href="javascript:void(0)" class="fav-btn">
                  <i class="far fa-bookmark"></i>
                </a>
              </div>
              <div class="pro-content">
                <h3 class="title">
                  <a href="doctor-profile.html">Darren Elder</a>
                  <i class="fas fa-check-circle verified"></i>
                </h3>
                <p class="speciality">BDS, MDS - Oral & Maxillofacial Surgery</p>
                <div class="rating">
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star"></i>
                  <span class="d-inline-block average-rating">(35)</span>
                </div>
                <ul class="available-info">
                  <li>
                    <i class="fas fa-map-marker-alt"></i> Newyork, USA
                  </li>
                  <li>
                    <i class="far fa-clock"></i> Available on Fri, 22 Mar
                  </li>
                  <li>
                    <i class="far fa-money-bill-alt"></i> ৳ 84
                    <i class="fas fa-info-circle" data-bs-toggle="tooltip" title="Lorem Ipsum"></i>
                  </li>
                </ul>
                <div class="row row-sm">
                  <div class="col-6">
                    <a href="doctor-profile.html" class="btn view-btn">{{$t('view_prf')}}</a>
                  </div>
                  <div class="col-6">
                    <a href="booking.html" class="btn book-btn">{{$t('apmnt')}}</a>
                  </div>
                </div>
              </div>
            </div>


            <div class="col-lg-4 mx-1 mb-3 aos profile-widget">
              <div class="doc-img">
                <a href="doctor-profile.html">
                  <img class="img-fluid" alt="User Image" src="frontend/assets/img/doctors/doctor-03.jpg">
                </a>
                <a href="javascript:void(0)" class="fav-btn">
                  <i class="far fa-bookmark"></i>
                </a>
              </div>
              <div class="pro-content">
                <h3 class="title">
                  <a href="doctor-profile.html">Deborah Angel</a>
                  <i class="fas fa-check-circle verified"></i>
                </h3>
                <p class="speciality">MBBS, MD - General Medicine, DNB - Cardiology</p>
                <div class="rating">
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star filled"></i>
                  <i class="fas fa-star"></i>
                  <span class="d-inline-block average-rating">(27)</span>
                </div>
                <ul class="available-info">
                  <li>
                    <i class="fas fa-map-marker-alt"></i> Georgia, USA
                  </li>
                  <li>
                    <i class="far fa-clock"></i> Available on Fri, 22 Mar
                  </li>
                  <li>
                    <i class="far fa-money-bill-alt"></i> $100 - $400
                    <i class="fas fa-info-circle" data-bs-toggle="tooltip" title="Lorem Ipsum"></i>
                  </li>
                </ul>
                <div class="row row-sm">
                  <div class="col-6">
                    <a href="doctor-profile.html" class="btn view-btn">{{$t('view_prf')}}</a>
                  </div>
                  <div class="col-6">
                    <a href="booking.html" class="btn book-btn">{{$t('apmnt')}}</a>
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
name: "Home-doctors"
}
</script>

<style scoped>

</style>