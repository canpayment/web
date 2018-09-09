<template>
<div>
  <at-button type="primary" size="large" icon="icon-chevron-left" circle @click="$router.go(-1)"></at-button>
  <img alt="QRcode" :src="qr"/>
  <p>
    <at-input :value="address" readonly></at-input>
  </p>
</div>  
</template>

<script>
import QRCode from 'qrcode'
export default {
  data(){
    return {
      qr:""
    }
  },
  props:["address"],
  methods: {
    
    showAddress(addr){
      this.$router.push("/address/"+addr)
    },
    send(cur){
      this.$router.push("/send/"+cur)
    }
  },
  mounted(){
    QRCode.toDataURL(this.address).then(url=>{
      this.qr=url
    })
  }
}
</script>

<style lang="scss">
img{
    width:100%;
    max-width:300px;
    display:block;
}
</style>
