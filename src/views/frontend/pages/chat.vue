<template>



  <div class="breadcrumb-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-8 col-12">

          <h2 class="breadcrumb-title">Emergency chat</h2>
        </div>

      </div>
    </div>
  </div>


  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="chat-window">

            <div class="chat-cont-left">
              <div class="chat-header">
                <span>Emergency details</span>
                <a href="javascript:void(0)" class="chat-compose">
                  <i class="material-icons">control_point</i>
                </a>
              </div>
              <div class="chat-users-list">
                <div class="chat-scroll">

                  <a href="" class="media d-flex read-chat active">

                    <div class="media-body flex-grow-1">
                      <div>
                        <div class="user-name">Details: </div>

                      </div>

                    </div>
                    {{emergency_view.details}}
                  </a>
                  <a href="" class="media d-flex read-chat">

                    <div class="infu bg-warning">
                      <i class="feather-info"></i>
                    </div>
                    <div class="media-body flex-grow-1x">
                      <div>
                        <div class="user-last-chat">Sx: {{emergency_view.symptoms}}</div>
                        <div class="user-last-chat">Hx: {{emergency_view.previous}}</div>
                      </div>

                    </div>
                  </a>
                  <a href="" class="media d-flex read-chat active">

                    <div class="infu bg-purple">
                      <i class="feather-trending-up"></i>
                    </div>
                    <div class="media-body flex-grow-1">
                      <div>
                        <div class="user-name">Body Temp: {{emergency_view.body_temp}}</div>
                        <div class="user-last-chat">Blood pressure: {{emergency_view.blood_pressure}} </div>
                      </div>
                      <div>
                        <div class="last-chat-time block">SG : {{emergency_view.sugar_level}}</div>
                        <div class="last-chat-time block">BG : {{emergency_view.blood_group}}</div>
                      </div>
                    </div>
                  </a>
                  <a href="" class="media d-flex">

                    <div class="infu bg-primary">
                      <i class="feather-user-check"></i>
                    </div>

                    <div class="media-body flex-grow-1">
                      <div>
                        <div class="user-name">Emergency: {{emergency_view.name}}</div>

                        <div class="user-last-chat">Age: {{emergency_view.age}}</div>
                      </div>
                      <div>
                        <div class="last-chat-time block">Gender</div>
                        <div class="badge badge-success rounded-pill">{{emergency_view.gender}}</div>
                      </div>
                    </div>
                  </a>

                </div>
              </div>
            </div>


            <div class="chat-cont-right">
              <div class="chat-header">
                <a id="back_user_list" href="" class="back-user-list">
                  <i class="material-icons">chevron_left</i>
                </a>
                <div class="media d-flex">
                  <div class="media-img-wrap flex-shrink-0">
                    <div class="avatar avatar-online">
                      <img :src="this.asset_url+'/frontend/assets/img/doc.webp'" alt="User Image" class="avatar-img rounded-circle">
                    </div>
                  </div>
                  <div class="media-body flex-grow-1">
                    <div class="user-name">{{user!=emergency_view.accepted?emergency_view.doctor_name:emergency_view.submitted_by}}</div>

                    <div class="msg-typing">

                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  </div>
                </div>
                <div class="chat-options">
                  <a href="" data-bs-toggle="modal" data-bs-target="#voice_call">
                    <i class="material-icons">local_phone</i>
                  </a>
                  <a href="" data-bs-toggle="modal" data-bs-target="#video_call">
                    <i class="material-icons">videocam</i>
                  </a>
                  <a href="">
                    <i class="material-icons">more_vert</i>
                  </a>
                </div>
              </div>
              <div class="chat-body">
                <div class="chat-scroll">
                  <ul class="list-unstyled">


                    <div v-for="(msg,index) in msg_list" :key="msg.id" :value="msg.id">
                    <li :class="user==msg.uid?`media d-flex sent`:`media d-flex received`">
                      <div v-if="user!=msg.uid" class="avatar flex-shrink-0">
                        <img :src="this.asset_url+'/frontend/assets/img/doc.webp'" alt="" class="avatar-img rounded-circle">
                      </div>
                      <div class="media-body flex-grow-1">
                        <div class="msg-box">
                          <div>
                            <p>{{msg.msg}}</p>
                            <ul class="chat-msg-info">
                              <li>
                                <div class="chat-time">
                                  <span>{{this.getTime(msg.tstamp)}}</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                   </div>



                  </ul>
                </div>
              </div>
              <div class="chat-footer">
                <div class="input-group">
<!--                  <div class="btn-file btn">
                    <i class="fa fa-paperclip"></i>
                    <input type="file">
                  </div>-->
                  <div class="btn-file btn">
                    <i class="fa fa-text-height"></i>

                  </div>
                  <textarea v-model="message" type="text" class="input-msg-send form-control" placeholder="Type something"></textarea>
                  <button @click="newMsg" type="button" class="btn msg-send-btn" style="
    min-width: 57px;
    height: 58px;
"><i class="fab fa-telegram-plane"></i></button>
                </div>
              </div>
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
name: "chat",
  data() {
    return {
      user:localStorage.getItem('user'),
      page: 1,
      name:'',
      loading: false,
      NoData:false,
      errors:[],
      message:'',
      emergency_view:[],

      result: false,
      msg: '',

      msg_list: [],

    }
  },
  methods: {
    conversation() {
      if(this.loading) return
      this.loading = true;

      //View Conversation
      this.axios.get("/emergencychat/"+urlParams.get('echat')+"/0/"+this.page)
          .then(response => {
            console.log('Msg fnc called')
            this.loading = false;

            this.msg_list=response.data.data.reverse()
            setInterval(this.conversation,3000);

            if (response.data.data.length !== 0) {
              this.NoData = false
            } else {
              this.NoData = true
            }

          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },
    newMsg() {
      // locations request - AH
      this.axios.post("/emergencychat/send/"+urlParams.get('echat'), this.pBody({
        "message":this.message

      })).then(response => {
        console.log((response.data))

        if (response.data.success == true) {
          this.message=''
          this.conversation()
          console.log('Msg sent!')
        } else {
          this.errors=response.data
          this.toast(response.data.error, "", "danger")
        }

      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },

    viewEmergency() {

      this.loading = true;

      //request - AH
      this.axios.get("emergency/info/"+urlParams.get('echat'))
          .then(response => {
            this.loading = false;
            this.emergency_view=response.data.data

            console.log((response.data))

          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    },

  },
  mounted() {
    this.conversation()
    this.viewEmergency()

  }

}
</script>

<style scoped>
.chat-cont-right .chat-body .media:last-child {
  margin-bottom: 15px;
}
.infu{
  width: 55px;
  height: 57px;
  border-radius: 63%;
  background-color: #0de0fe;
  box-shadow: 0 10px 4pxrgba(0,0,0,.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 30px;
  /* margin: -1px auto; */
  margin-right: 18px;
}
</style>