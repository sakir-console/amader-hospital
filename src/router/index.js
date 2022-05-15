import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import HomePage from "@/views/frontend/HomePage";
import login from "@/views/frontend/pages/login";
import myAccount from "@/views/frontend/pages/myAccount";
import notFound from "@/views/notFound";
import register from "@/views/frontend/pages/register";
import profileSetting from "@/views/frontend/pages/profileSetting";
import appDr from "@/views/frontend/pages/appDr";
import appAmb from "@/views/frontend/pages/appAmb";
import doctors from "@/views/frontend/pages/doctors";
import appointment from "@/views/frontend/pages/appointment";
import success from "@/views/frontend/pages/success";
import hospitals from "@/views/frontend/pages/hospitals";
import emergency from "@/views/frontend/pages/emergency";

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error'
  },
  {
    path: '/error',
    name: 'error',
    component: notFound
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/success',
    name: 'success',
    component: success
  },
  {
    path: '/doctors',
    name: 'doctors',
    component: doctors
  },
  {
    path: '/appointment',
    name: 'appointment',
    component: appointment
  },
  {
    path: '/hospitals',
    name: 'hospitals',
    component: hospitals
  },
  {
    path: '/emergency',
    name: 'emergency',
    component: emergency
  },









  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      loggedIn: true
    }

  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {
      loggedIn: true
    }

  },


  {
    path: '/my-account',
    name: 'myAccount',
    component: myAccount,
    meta: {
      requireAuth: true
    }

  },
  {
    path: '/profile',
    name: 'profile',
    component: profileSetting,
    meta: {
      requireAuth: true
    }

  },
  {
    path: '/apply-doctor',
    name: 'appDr',
    component: appDr,
    meta: {
      requireAuth: true
    }

  },
  {
    path: '/apply-ambulance',
    name: 'appAmb',
    component: appAmb,
    meta: {
      requireAuth: true
    }

  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  const token=localStorage.getItem('token')
  if (to.matched.some(record => record.meta.requireAuth)) {

    if (token==null) {
      next({name:'login'})
    } else {
      next()
    }
  }

  if (to.matched.some(record => record.meta.loggedIn)) {
    if (token==null) {
      next()
    } else {
      next({name:'myAccount'})
    }
  }else {
    next()
  }



});


export default router
