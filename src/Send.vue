<template>
<div class="container">
  <at-button type="primary" size="large" icon="icon-chevron-left" circle @click="$router.go(-1)"></at-button>
  
  <at-input v-model="sendAddress" placeholder="アドレス">
    <template slot="prepend">
      <span>アドレス</span>
    </template>
  </at-input>

  <at-input v-model="tag" placeholder="タグ" type="number" v-show="currency.toLowerCase()==='xrp'">
    <template slot="prepend">
      <span>タグ</span>
    </template>
  </at-input>
  <at-input v-model="sendAmount" placeholder="タグ" type="number" step="0.000000001">
    <template slot="prepend">
      <span>数量</span>
    </template>
  </at-input>
  
  <at-button type="primary" size="large" icon="icon-upload" @click="send"></at-button>
</div>  
</template>

<script>
const canpay=require("./canpay")
export default {
  data(){
    return {
      sendAddress:"",
      sendAmount:0,
      tag:0
    }
  },
  props:["currency"],
  methods: {
    
    send(){
      const obj={currency:this.currency,amount:this.sendAmount,to:this.sendAddress}
      if(this.currency.toLowerCase()==="xrp"){
        obj.tag=this.tag
      }
      canpay.transfer(obj).then(res=>{
        
      }).catch(e=>alert(e))
    }
  },
  mounted(){
    if(this.$route.query.address){
      this.sendAddress=this.$route.query.address
    }
  }
}
</script>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .number{
      margin:10px;
  }
  
</style>
