<template>
<div class="container">
  <at-button type="primary" size="SXSlarge" icon="icon-chevron-left" circle @click="$router.go(-1)"></at-button>
  
  <at-radio v-model="currency" value="mona" label="mona">MONA</at-radio>
  <at-radio v-model="currency" value="xrp" label="xrp">XRP</at-radio>
  <at-radio v-model="currency" value="jpy" label="jpy">JPY</at-radio>
  
  <p class="demo-desc">金額</p>
  <div class="row no-gutter">
    <div class="col-md-4">
      <at-input v-model="amount"></at-input>
    </div>
  </div>
  <at-button type="primary" size="large" icon="icon-upload" @click="issue"></at-button>
</div>  
</template>

<script>
const canpay=require("./canpay")
export default {
  data(){
    return {
      currency:"mona",
      amount:0
    }
  },
  methods: {
    issue(){
      canpay.issueInvoice({currency:this.currency.toUpperCase(),amount:+this.amount}).then(res=>{
        this.$router.push("/address/"+res._id)
      }).catch(e=>alert(e))
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
