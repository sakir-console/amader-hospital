<template>
  <section class="section section-blogs">
    <div class="container-fluid">

      <div class="section-header text-center aos" data-aos="fade-up">
        <h2> {{$t('hlth_blg_Ttl')}} </h2>
        <p class="sub-title"> {{$t('hlth_blg_subTtl')}}  </p>
      </div>

      <div class="row blog-grid-row aos" data-aos="fade-up">
        <div v-for="(blog,index) in blogs.data" :key="blog.id" class="col-md-6 col-lg-3 col-sm-12">

          <div class="blog grid-blog">
            <div class="blog-image">
              <a v-bind:href=viewBlogUrl+blog.id><img class="img-fluid" :src="blog.thumb" alt="Post Image"></a>
            </div>
            <div class="blog-content">
              <ul class="entry-meta meta-item">
                <li>
                  <div class="post-author">
                    <a href="#">
                      <span>{{blog.name}}</span></a>
                  </div>
                </li>
                <li><i class="far fa-clock"></i> {{ this.getTime(blog.tstamp)}}</li>
              </ul>
              <h3 class="blog-title"><a v-bind:href=viewBlogUrl+blog.id>{{blog.title}}</a></h3>
              <p class="mb-0">{{blog.text}}...</p>
            </div>
          </div>

        </div>

      </div>
      <div class="view-all text-center aos" data-aos="fade-up">
        <router-link :to="{name:'blog'}" class="btn btn-primary"> {{$t('see_more')}} </router-link>
      </div>
    </div>
  </section>


</template>

<script>
export default {
name: "Health-blog",
  data() {
    return {
      viewBlogUrl:'/view-blog?blog=',
      page: 1,
      id: '',
      title: '',
      blogs:[]
    }
  },
  methods: {
    viewBlogs(cat=0) {

      this.axios.get("blog?page="+this.page)
          .then(response => {
            console.log((response.data))
            this.blogs = response.data
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },


  },
  mounted() {
    this.viewBlogs()
  }
}
</script>

<style scoped>

</style>