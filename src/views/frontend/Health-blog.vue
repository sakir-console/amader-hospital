<template>
  <section class="section section-blogs">
    <div class="container-fluid">

      <div class="section-header text-center aos" data-aos="fade-up">
        <h2> {{$t('hlth_blg_Ttl')}} </h2>
        <p class="sub-title"> {{$t('hlth_blg_subTtl')}}  </p>
      </div>

      <div class="row blog-grid-row aos" data-aos="fade-up">
        <div class="col-md-6 col-lg-3 col-sm-12">

          <div class="blog grid-blog">
            <div class="blog-image">
              <a href="blog-details.html"><img class="img-fluid" src="frontend/assets/img/blog/blog-01.jpg"
                                               alt="Post Image"></a>
            </div>
            <div class="blog-content">
              <ul class="entry-meta meta-item">
                <li>
                  <div class="post-author">
                    <a href="doctor-profile.html"><img :src="this.asset_url+'frontend/assets/img/doctors/doctor-thumb-01.jpg'"
                                                       alt="Post Author">
                      <span>Dr. Ruby Perrin</span></a>
                  </div>
                </li>
                <li><i class="far fa-clock"></i> 4 Dec 2019</li>
              </ul>
              <h3 class="blog-title"><a href="blog-details.html">মাইগ্রেন (Migraine) – যন্ত্রনাদায়ক ব্যথা
                থেকে মুক্তির উপায়</a></h3>
              <p class="mb-0">এটা কোন সাধারণ মাথা ব্যথা নয়, এক অসহ্য যন্ত্রনাদায়ক অনুভূতির নাম। যিনি এই
                সমস্যা মোকাবেলা করেন তিনিই...</p>
            </div>
          </div>

        </div>
        <div class="col-md-6 col-lg-3 col-sm-12">

          <div class="blog grid-blog">
            <div class="blog-image">
              <a href="blog-details.html"><img class="img-fluid" src="frontend/assets/img/blog/blog-02.jpg"
                                               alt="Post Image"></a>
            </div>
            <div class="blog-content">
              <ul class="entry-meta meta-item">
                <li>
                  <div class="post-author">
                    <a href="doctor-profile.html"><img :src="this.asset_url+'frontend/assets/img/doctors/doctor-thumb-02.jpg'"
                                                       alt="Post Author">
                      <span>Dr. Darren Elder</span></a>
                  </div>
                </li>
                <li><i class="far fa-clock"></i> 3 Dec 2019</li>
              </ul>
              <h3 class="blog-title"><a href="blog-details.html">অনলাইনে টেলি-মেডিসিন সেবা প্রদান করছে
                ফ্যামিলি কেয়ার হোমিওপ্যাথিক</a></h3>
              <p class="mb-0">অনলাইনে টেলি-মেডিসিন সেবা প্রদান করছে ফ্যামিলি কেয়ার হোমিওপ্যাথিক ক্লিনিক যা
                রোগীদের সেবা গ্রহণ পদ্ধতিকে আরও সহজ করছে..</p>
            </div>
          </div>

        </div>
        <div class="col-md-6 col-lg-3 col-sm-12">

          <div class="blog grid-blog">
            <div class="blog-image">
              <a href="blog-details.html"><img class="img-fluid" src="frontend/assets/img/blog/blog-03.jpg"
                                               alt="Post Image"></a>
            </div>
            <div class="blog-content">
              <ul class="entry-meta meta-item">
                <li>
                  <div class="post-author">
                    <a href="doctor-profile.html"><img :src="this.asset_url+'frontend/assets/img/doctors/doctor-thumb-03.jpg'"
                                                       alt="Post Author">
                      <span>Dr. Deborah Angel</span></a>
                  </div>
                </li>
                <li><i class="far fa-clock"></i> 3 Dec 2019</li>
              </ul>
              <h3 class="blog-title"><a href="blog-details.html">করোনাভাইরাস (কভিড-১৯) মোকাবেলাই ১০ টি
                পরামর্শ</a></h3>
              <p class="mb-0">করোনাভাইরাস (কভিড-১৯) মোকাবেলাই সি ডি সি (CDC- Centers for Disease Control,
                USA ) প্রদত্ত ১০ টি পরামর্শ...</p>
            </div>
          </div>

        </div>
        <div class="col-md-6 col-lg-3 col-sm-12">

          <div class="blog grid-blog">
            <div class="blog-image">
              <a href="blog-details.html"><img class="img-fluid" src="frontend/assets/img/blog/blog-04.jpg"
                                               alt="Post Image"></a>
            </div>
            <div class="blog-content">
              <ul class="entry-meta meta-item">
                <li>
                  <div class="post-author">
                    <a href="doctor-profile.html"><img :src="this.asset_url+'frontend/assets/img/doctors/doctor-thumb-04.jpg'"
                                                       alt="Post Author">
                      <span>Dr. Sofia Brient</span></a>
                  </div>
                </li>
                <li><i class="far fa-clock"></i> 2 Dec 2019</li>
              </ul>
              <h3 class="blog-title"><a href="blog-details.html">করোনা ভাইরাস(Coronavirus) ও রোগপ্রতিরোধ
                ক্ষমতা বৃদ্ধিতে করণীয়</a></h3>
              <p class="mb-0">বর্তমান সময়টা খুবই অপ্রত্যাশিত । গত ১০০ বছরের মধ্যে মানুষ এরকম পরিস্থিতির
                মধ্যে পড়েনি । আতঙ্কিত না...</p>
            </div>
          </div>

        </div>
      </div>
      <div class="view-all text-center aos" data-aos="fade-up">
        <a href="blog-list.html" class="btn btn-primary"> {{$t('see_more')}} </a>
      </div>
    </div>
  </section>


</template>

<script>
export default {
name: "Health-blog"
}
</script>

<style scoped>

</style>