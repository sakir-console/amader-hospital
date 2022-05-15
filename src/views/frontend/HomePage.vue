<template>
<div>

     <HomeSearch></HomeSearch>

     <HomeTopFech></HomeTopFech>

     <HomeSpecialist></HomeSpecialist>

     <HomeDoctors></HomeDoctors>

     <HomeFeatures></HomeFeatures>

     <HealthBlog></HealthBlog>

</div>
</template>

<script>
import HomeSpecialist from "@/views/frontend/Home-Specialist";
import HomeFeatures from "@/views/frontend/Home-features";
import HealthBlog from "@/views/frontend/Health-blog";
import HomeDoctors from "@/views/frontend/Home-doctors";
import HomeTopFech from "@/views/frontend/Home-top-fech";
import HomeSearch from "@/views/frontend/Home-search";
export default {
name: "HomePage",
  components: {HomeSearch, HomeTopFech, HomeDoctors, HealthBlog, HomeFeatures, HomeSpecialist}
}
</script>

<style scoped>

</style>