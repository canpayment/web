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
  
  <hr/>
  <h4>銀行口座</h4>
  <at-button type="primary" size="large" icon="icon-eye" @click="getBankAccount">銀行口座確認</at-button>

  <h4>銀行口座登録</h4>
  <at-input v-model="bank.branchCode" placeholder="支店番号" type="number">
    <template slot="prepend">
      <span>支店番号</span>
    </template>
  </at-input>
  <at-input v-model="bank.company" placeholder="銀行名">
    <template slot="prepend">
      <span>銀行名</span>
    </template>
  </at-input>
  <at-input v-model="bank.companyCode" placeholder="銀行コード" type="number">
    <template slot="prepend">
      <span>銀行コード</span>
    </template>
  </at-input>
  <at-input v-model="bank.name" placeholder="名前">
    <template slot="prepend">
      <span>名前</span>
    </template>
  </at-input>
  <at-input v-model="bank.number" placeholder="口座番号" type="number">
    <template slot="prepend">
      <span>口座番号</span>
    </template>
  </at-input>
  <at-select v-model="bank.type" style="width:100px">
  <at-option value="1">普通</at-option>
  <at-option value="2">定期</at-option>
  <at-option value="4">預金</at-option>
</at-select>

  <at-button type="primary" size="large" icon="icon-credit-card" @click="regBank">銀行登録</at-button>

  <h4>JPY出金</h4>
  <at-input v-model="withdrawAmt" placeholder="出金額" type="number">
    <template slot="append">
      <span>JPY</span>
    </template>
    </at-input>
  <at-button type="primary" size="large" icon="icon-icon-log-out" @click="requestJpyWithdrawal">出金</at-button>
</div>
</template>

<script>
const canpay=require("./canpay")

export default {
  data(){
    return {
      card:{number:"",cvc:"",expiry:{month:1,year:2020}},
      depAmt:"",
      depToken:"",
      bank:{
        branchCode:"",
        company:"",
        companyCode:"",
        name:"",
        number:"",
        type:""},
      withdrawAmt:0
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
    },getBankAccount(){
      canpay.getBankAccount().then(result=>{
        this.$router.push("/address/"+encodeURIComponent(JSON.stringify(result)))
      }).catch(e=>alert(e))
    },
    regBank(){
      canpay.updateBankAccount(this.bank).then(result=>{
        this.$router.push("/address/"+encodeURIComponent(JSON.stringify(result)))
      }).catch(e=>alert(e))
    },
    requestJpyWithdrawal(){
      canpay.requestJpyWithdrawal(this.withdrawAmt).then(result=>{
        this.$router.push("/address/"+encodeURIComponent(JSON.stringify(result)))
      }).catch(e=>alert(e))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
