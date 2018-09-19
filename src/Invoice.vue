<template>
<div class="container">
  <at-button type="primary" size="SXSlarge" icon="icon-chevron-left" circle @click="$router.go(-1)"></at-button>
  
 <p>
   <div class="col-md-12"><at-button type="warning" style="width:100%" @click="pay">決済</at-button></div>
        
      </p>
</div>  
</template>

<script>
const canpay=require("./canpay")
export default {
  data(){
    return {
      invoice:{}
    }
  },
  props:["id"], 
  methods: {
    pay(){
      canpay.payInvoice(this.id).then(res=>{
        alert(res.message)
      }).catch(e=>alert(e.message))
    },
    get(){
      canpay.getInvoice(this.id).then(res=>{
        this.invoice = res
      }).catch(e=>alert(e))
    }
  },
  mounted(){
    this.get()
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
  .currency{
      width:300px;
      display:inline-block;
      margin:5px;
  }
  .at-tabs{
      width:100%;
      height:100%;
      font-size:1em;
  }
  .at-tabs__body{
      font-size:1em;
  }
  .at-card__body a{
      margin:4px;
  }
</style>
