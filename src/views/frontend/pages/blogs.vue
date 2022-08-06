<template>
  <div class="breadcrumb-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-8 col-12">

          <h2 class="breadcrumb-title">Health blog</h2>
        </div>

      </div>
    </div>
  </div>


  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-12">
          <div class="row blog-grid-row">
            <div v-for="(blog,index) in blogs.data" :key="blog.id" class="col-md-6 col-sm-12">

              <div class="blog grid-blog">
                <div class="blog-image">
                  <a v-bind:href=viewBlogUrl+blog.id><img class="img-fluid" :src="blog.thumb" alt="Post Image"></a>
                </div>
                <div class="blog-content">
                  <ul class="entry-meta meta-item">
                    <li>

                    </li>
                    <li><i class="far fa-clock"></i> {{ this.getTime(blog.tstamp)}}</li>
                  </ul>
                  <h3 class="blog-title"><a v-bind:href=viewBlogUrl+blog.id>{{blog.title}}</a></h3>
                  <p class="mb-0">{{blog.text}} ......</p>
                </div>
              </div>

            </div>

          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="blog-pagination">
                <div class="pagination-tab mt-md-5 d-flex justify-content-center">
                  <div>
                    <ul class="pagination mb-4">
                      <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1">Pages:</a>
                      </li>
                      <li v-for="index in blogs['maxPage']" :key="index" :class="[(page == index) ? 'active':'']">
                        <a class="page-link" href="#" @click="nextPage(index)">{{ index }}</a>
                      </li>

                    </ul>
                  </div>
                </div>
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
                  <a href="#" @click="viewBlogs(category.id)">{{category.title}} <span>({{category.blog_count}})</span></a></li>

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
name: "blogs",
  data() {
    return {
      viewBlogUrl:'/view-blog?blog=',
      page: 1,
      id: '',
      title: '',
      cat:0,
      categories: [],
      blogs:[]
    }
  },
  methods: {
    viewBlogs(cat=0) {
      if(urlParams.get('cat')){
        this.cat = urlParams.get('cat')
      }else{this.cat = cat}
      this.axios.get("blog?cat="+this.cat+"&page="+this.page)
          .then(response => {
            console.log((response.data))
            this.blogs = response.data
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
    this.viewBlogs()
  }
}
</script>

<style scoped>

</style>