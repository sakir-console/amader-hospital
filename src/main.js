import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './locales/i18n'
import AOS from "aos";
import axios from "axios";

// import the library
import { createToast } from 'mosha-vue-toastify';
// import the styling for the toast
import 'mosha-vue-toastify/dist/style.css'

const app = createApp(App);

app.AOS = new AOS.init({ disable: "phone" , duration:400
    });

//const asset_url='';

const asset_url = '/themes/default/';
const toastBar = (title,des,type) => {
    createToast({
        title: title,
        description: des
    },{
        type: type, // 'info', 'danger', 'warning', 'success', 'default'
        timeout: 5000,
        showCloseButton: true,
        showIcon: true,
        position: 'top-right', // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'
        transition: 'bounce', //'bounce', 'zoom', 'slide'
        hideProgressBar: false,
        swipeClose: true,
        //toastBackgroundColor: '#fafafa',
        onClose: null
    })
    return { toastBar }
}

const Location = {};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
}
let MyLat='', MyLng='';
function showPosition(position) {
    Location.lat = position.coords.latitude;
    Location.lng =  position.coords.longitude;
    console.log('Found loc:', Location);
    MyLat=Location.lat
    MyLng=Location.lng
}

// 02:24 PM, 04-Jan-2022


const dateFormat = (num) => {
    const date = new Date(num * 1000);
    const [day, month, date_int, year] = date.toDateString().split(' ');
    let [h, min, s] = date.toTimeString().split(' ')[0].split(':');
    let am_pm = 'AM';
    if(h > 12){
        h-=12;
        am_pm = 'PM';
    }
    let str = `${h}:${min} ${am_pm} ${day}, ${month} ${year}`;
    return str
}
const formHelper= (data)=>{
    const FD=new FormData();
    for(let k in data){
        FD.append(k,data[k])
    }
    return FD;
}

const getDP = user => {
    if(user.photo){
        return user.photo;
    }

    if(localStorage.getItem('is_dr')){
        return asset_url + '/frontend/assets/img/dr_'+user.gender+'.png';
    }
    return asset_url + '/frontend/assets/img/usr1.jpg';
}


const getPP = user => {
    if(user.photo){
        return user.photo;
    }

    if(user.gender){
        return asset_url + '/frontend/assets/img/dr_'+user.gender+'.png';
    }
    return asset_url + '/frontend/assets/img/doct.png';
}



const token = localStorage.getItem('token');
const headers ={}
if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    console.log(headers);
}
const instance = axios.create({
    baseURL: 'https://amaderhospital.com/api/',headers
});


app.config.globalProperties.axios=instance
app.config.globalProperties.pBody=formHelper
app.config.globalProperties.getDP=getDP
app.config.globalProperties.getPP=getPP
app.config.globalProperties.getTime=dateFormat

app.config.globalProperties.toast=toastBar
app.config.globalProperties.asset_url=asset_url
app.config.globalProperties.currentLocation=Location
app.use(router).use(i18n).mount('#app')
