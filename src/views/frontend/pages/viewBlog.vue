<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-12">


          <div class="blog-view">
            <div class="blog blog-single-post">
              <div class="blog-image">
                <a href=""><img alt="" :src="blog.thumb" class="img-fluid"></a>
              </div>
              <h3 class="blog-title">{{blog.title}}</h3>
              <div class="blog-info clearfix">
                <div class="post-left">
                  <ul>
                    <li><i class="far fa-user"></i>{{blog.name}}</li>
                    <li><i class="far fa-calendar"></i>{{ this.getTime(blog.tstamp)}}</li>
                  </ul>
                </div>
              </div>
              <div class="blog-content">
               {{blog.text}}
              </div>
            </div>
            <div class="card blog-share clearfix">
              <div class="card-header">
                <h4 class="card-title">Share the post</h4>
              </div>
              <div class="card-body">
                <ul class="social-share">
                  <li><a href="#" title="Facebook"><i class="fab fa-facebook"></i></a></li>
                  <li><a href="#" title="Twitter"><i class="fab fa-twitter"></i></a></li>
                  <li><a href="#" title="Linkedin"><i class="fab fa-linkedin"></i></a></li>
                  <li><a href="#" title="Google Plus"><i class="fab fa-google-plus"></i></a></li>
                  <li><a href="#" title="Youtube"><i class="fab fa-youtube"></i></a></li>
                </ul>
              </div>
            </div>



          </div>


        </div>

        <div class="col-lg-4 col-md-12 sidebar-right theiaStickySidebar">


          <div class="card category-widget">
            <div class="card-header">
              <h4 class="card-title">Health Blog Categories</h4>
            </div>
            <div class="card-body">
              <ul class="categories">
                <li v-for="(category,index) in categories.data" :key="category.id">
                  <a  v-bind:href=blogUrl+category.id>{{ category.title }}
                    <span>({{ category.blog_count }})</span></a></li>

              </ul>
            </div>
          </div>


        </div>

      </div>
    </div>
  </div>

</template>

<script>
let urlParams = new URLSearchParams(window.location.search);

export default {
  name: "viewBlog",
  data() {
    return {
      blogUrl:'/blog?cat=',
      page: 1,
      id: '',
      title: '',
      cat: 0,
      categories: [],
      blog: []
    }
  },
  methods: {
    viewBlog() {

      this.axios.get("blog/"+urlParams.get("blog"))
          .then(response => {
            console.log((response.data))
            this.blog = response.data.data

          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },
    // Blog cats FETCH request - AH
    viewCats() {
      this.axios.get("blog/cats")
          .then(response => {
            console.log((response.data))
            this.categories = response.data
          }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },

    nextPage(pg) {
      this.page = pg
      this.viewBlogs()
    },
  },
  mounted() {
    this.viewCats()
    this.viewBlog()
  }
}
</script>

<style scoped>

</style>