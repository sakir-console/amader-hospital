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
import ambulences from "@/views/frontend/pages/ambulences";
import blogs from "@/views/frontend/pages/blogs";
import viewBlog from "@/views/frontend/pages/viewBlog";
import blood from "@/views/frontend/pages/blood";
import patientDash from "@/views/frontend/pages/patient/patientDash";
import docDash from "@/views/frontend/pages/doctor/docDash";
import schedules from "@/views/frontend/pages/doctor/shedules";
import addBlood from "@/views/frontend/pages/addBlood";
import docAppointments from "@/views/frontend/pages/doctor/docAppointments";
import docEmergency from "@/views/frontend/pages/doctor/docEmergency";
import patAppointments from "@/views/frontend/pages/patient/patAppointments";
import ambulanceDash from "@/views/frontend/pages/ambulance/ambulanceDash";
import viewHospital from "@/views/frontend/pages/viewHospital";
import viewAmbulence from "@/views/frontend/pages/viewAmbulence";
import notifications from "@/views/frontend/pages/notifications";
import chat from "@/views/frontend/pages/chat";
import viewEmergency from "@/views/frontend/pages/viewEmergency";
import viewBloodReq from "@/views/frontend/pages/viewBloodReq";
import profile from "@/views/frontend/pages/profile";
import dataLab from "@/views/frontend/pages/dataLab";

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
    path: '/view-profile',
    name: 'view-profile',
    component: profile
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat
  },
  {
    path: '/data-lab',
    name: 'dataLab',
    component: dataLab
  },
  {
    path: '/doctors',
    name: 'doctors',
    component: doctors
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: notifications
  },
  {
    path: '/appointment',
    name: 'appointment',
    component: appointment,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/hospitals',
    name: 'hospitals',
    component: hospitals
  },
  {
    path: '/hospital',
    name: 'hospital',
    component: viewHospital
  },
  {
    path: '/ambu',
    name: 'ambu',
    component: viewAmbulence
  },
  {
    path: '/emergency',
    name: 'emergency',
    component: emergency,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/view-emergency',
    name: 'view-emergency',
    component: viewEmergency,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/blood',
    name: 'view-blood-request',
    component: viewBloodReq,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/patient-dash',
    name: 'patientDash',
    component: patientDash,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/doc-dash',
    name: 'doctorDash',
    component: docDash,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/ambulance-dash',
    name: 'ambulanceDash',
    component: ambulanceDash,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/doc-schedules',
    name: 'doctorSch',
    component: schedules,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/doc-appointments',
    name: 'doctorAppointments',
    component: docAppointments,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/my-appointments',
    name: 'patAppointments',
    component: patAppointments,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/doc-emergency',
    name: 'doctorEmergency',
    component: docEmergency,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/add-blood',
    name: 'addBlood',
    component: addBlood,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/ambulance',
    name: 'ambulance',
    component: ambulences
  },
  {
    path: '/blog',
    name: 'blog',
    component: blogs
  },
  {
    path: '/view-blog',
    name: 'viewBlog',
    component: viewBlog
  },

  {
    path: '/blood-bank',
    name: 'blood',
    component: blood
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
