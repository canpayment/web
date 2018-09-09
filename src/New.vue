<template>
<div>
  <h1>Login / Register</h1>
  <p>
    <at-input v-model="login.email" placeholder="E-mail"></at-input>
    <at-input v-show="login.register" v-model="login.screenName" placeholder="screen name"></at-input>
    <at-input v-model="login.password" type="password" placeholder="Password"></at-input>
  </p>
  <p>
    <at-button v-show="!login.register" size="large" @click="logIn">Log in</at-button>
    <at-button v-show="login.register" size="large" @click="register">Register</at-button>
  
    <at-button type="primary" v-show="!login.register" @click="login.register=true">Register</at-button>
    <at-button type="primary" v-show="login.register" @click="login.register=false">Log in</at-button>
  </p>
  
</div>
</template>

<script>
const canpay=require("./canpay")
export default{
  data(){
    return {
      login:{
        register:false,
        email:"",
        password:"",
        screenName:""
      }
    }
  },
  methods:{
    logIn(){
      canpay.logIn(this.login.email,this.login.password).then(result=>{
        if(result){
          this.$router.replace("/home")
        }
      }).catch(e=>alert(e))
    },
    register(){
      canpay.register(this.login.email,this.login.screenName,this.login.password).then(result=>{
        if(result){
          this.$router.replace("/home")
        }
      }).catch(e=>alert(e))
    }
  }
}

</script>
<style scoped>
.at-input{
    margin:10px;
}
.at-btn{
    margin:15px 0;
    width:100%;
    display:block;
}
p{
    margin:10px;
    position:relative;
}
</style>
