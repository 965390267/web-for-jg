var baseurl='http://taoliyuan.bigbigstudy.com/';
var headermixin = {
    data:{
        login_dialog:false,//登录弹窗
        regist_dialog:false,//注册弹窗
        login_mobile:'',//登录账号
        login_password:'',//登录密码
        regist_mobile:'',//注册手机号
        regist_inputcode:'',//输入验证码
        regist_password:'',//注册密码
        codebase64:'',
        login_code:'',
       
    },
    computed: {     
       
    },
    methods: {

        changecode(){
               this.getcodepic()
        },
        getcodepic(){
            var that=this;
            axios.get(baseurl + 'cloud/user/verifyCode',{
                headers: {
                    'Content-Type':'application/octet-stream;charset=gb2312'
                  },
                  responseType: 'blob'
              })
            .then(function (response) {
                const blob = new Blob([response.data])
                that.codebase64= URL.createObjectURL(blob)
 
    
            }).catch()
        },
        openlogin(){
            this.login_dialog=true;
            this.getcodepic()
        },
        openregist(){
             this.regist_dialog=true;
            
        },
        closelogin(){
            this.login_dialog=false;
        },
        closeregist(){
            this.regist_dialog=false;
        },
        sendcode(){
            var that=this;
            axios.get(baseurl + 'cloud/user/createRegisterAuthCode', {
                params: {
             phone:that.regist_mobile
                }
            })
            .then(function (response) {
            //    alert()
            }).catch()
        },
        login(){
          var that=this;
          axios.post(baseurl + 'cloud/user/login', {
              params: {
                username:that.login_mobile,
                password:that.login_password,
                code:that.login_code
              }
          })
          .then(function (response) {
         console.log(response);
         
          }).catch()
          
        },
        regist(){
            var that=this;
            axios.post(baseurl + 'cloud/user/register', {
                params: {
                  phone :that.regist_mobile,
                  password:that.regist_password,
                  code:that.regist_inputcode
                }
            })
            .then(function (response) {
           console.log(response);
           
            }).catch()
            
            console.log(this.regist_mobile,this.regist_inputcode,this.regist_password);
        }
    },
    mounted() {
       
    },
    beforeDestroy() {
        clearInterval(this.counttimer);
    },
  }


