<template>
<div>
  <at-button type="primary" size="large" icon="icon-chevron-left" circle @click="$router.go(-1)"></at-button>
  <h4>クレジットカード登録</h4>
  <at-input v-model="card.number" placeholder="カード番号" type="number">
    <template slot="prepend">
      <span>カード番号</span>
    </template>
  </at-input>
  <at-input v-model="card.expiry.year" placeholder="年(西暦)" type="number">
    <template slot="prepend">
      <span>年</span>
    </template>
  </at-input>
  <at-input v-model="card.expiry.month" placeholder="月" type="number">
    <template slot="prepend">
      <span>月</span>
    </template>
  </at-input>
  <at-input v-model="card.cvc" placeholder="タグ" type="number">
    <template slot="prepend">
      <span>セキュリティコード</span>
    </template>
  </at-input>
  <at-button type="primary" size="large" icon="icon-credit-card" @click="regCC">クレジットカード登録</at-button>
  <h4>クレジットカード確認</h4>
  <at-button type="primary" size="large" icon="icon-eye" @click="getCard">クレジットカード確認</at-button>
  <h4>入金</h4>
  <at-input v-model="depToken" placeholder="Stripeトークン">
    <template slot="prepend">
      <span>tok_</span>
    </template>
  </at-input>
  <at-input v-model="depAmt" placeholder="入金額" type="number">
    <template slot="append">
      <span>JPY</span>
    </template>
    
  </at-input>
  <at-button type="primary" size="large" icon="icon-credit-card" @click="charge(depAmt,depToken)">クレジットカード入金</at-button>
  
</div>
</template>

<script>
const canpay=require("./canpay")

export default {
  data(){
    return {
      card:{number:"",cvc:"",expiry:{month:1,year:2020}},
      depAmt:"",
      depToken:""
    }
  },
  methods: {
    regCC(){
      canpay.registerCreditCard(this.card).then(result=>{
        this.$router.push("/address/"+encodeURIComponent(JSON.stringify(result)))
      }).catch(e=>alert(e))
    },charge(amount,token){
      canpay.chargeJpyViaCreditCard(amount, token).then(result=>{
        this.$router.push("/address/"+encodeURIComponent(JSON.stringify(result)))
      }).catch(e=>alert(e))
    },getCard(){
      canpay.getCreditCard().then(result=>{
        this.$router.push("/address/"+encodeURIComponent(JSON.stringify(result)))
      }).catch(e=>alert(e))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
