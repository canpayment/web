<template>
<div class="container">
  <at-tabs style="height:100%;">
    <at-tab-pane label="ウォレット" name="wallet" icon="icon-credit-card" class="wallet">
      <div>
        <at-card class="currency" v-for="wallet in wallets">
          <h4 slot="title">{{wallet.currency}}</h4>
          <div slot="extra">{{wallet.amount}}</div>
          <div>
            
            <a @click="showAddress(wallet.address)" v-show="wallet.address">アドレス</a><a @click="send(wallet.currency)" v-show="wallet.address">送金</a><a @click="showAddress(wallet.secret)" v-show="wallet.secret">秘密鍵</a>
            <a @click="$router.push('/jpy')" v-show="wallet.currency==='JPY'">入出金</a>
          </div>
        </at-card>
        <at-card :loading="true" v-show="wallets.length<=0">
          <h4 slot="title"></h4>
          <div slot="extra"></div>
          <div>
            
          </div>
        </at-card>
        <at-button-group>
        <at-button @click="getWallet" icon="icon-refresh-cw">再取得</at-button>
        
        <at-button @click="addWallet" icon="icon-plus">ウォレット追加</at-button>
        
        <at-button @click="$router.push('/issueInvoice')" icon="icon-file-text">請求を作成</at-button>
        </at-button-group>
      </div>
    </at-tab-pane>
    <at-tab-pane label="QRコード" name="qr" icon="icon-maximize" style="height:100%;">
      <div class="qrWrap">
        <video class="qr" ref="qrVideo" v-show="qrEnabled"></video>
        <div class="getPermission" @click="getCamera" v-show="!qrEnabled">
          <div class="float">
            <i class="icon icon-unlock"></i>
            ここをタップして許可
          </div>
        </div>
      </div>
    </at-tab-pane>
    <at-tab-pane label="設定" name="setting" icon="icon-settings">
      <p>
          <div class="col-md-12"><at-button type="warning" style="width:100%" @click="logout">ログアウト</at-button></div>
        
      </p>
    </at-tab-pane>
  </at-tabs>
  
</div>  
</template>

<script>
const canpay=require("./canpay")

const monaR=/M[a-zA-Z0-9]{33,36}/
const xrpR=/r[a-zA-Z0-9]{33,36}/
const invR=/[a-f0-9]{24}/
export default {
  data(){
    return {
      wallets:[],
      qrEnabled:false
    }
  },
  methods: {
    getWallet(){
      canpay.getWallet("").then(result=>{
        this.wallets=result
      }).catch(e=>alert(e))
      
    },
    addWallet(){
      Promise.all([canpay.createWallet("mona")/*,canpay.createWallet("jpy")*/,canpay.createWallet("xrp")]).then(()=>{
        this.getWallet()
      })
      
    },
    showAddress(addr){
      this.$router.push("/address/"+addr)
    },
    send(cur){
      this.$router.push("/send/"+cur)
    },
    getCamera(){
      const Instascan = require('instascan');
      let scanner = new Instascan.Scanner({ video: this.$refs.qrVideo });
      scanner.addListener('scan', (content)=>{
        if(monaR.test(content)){
          this.$router.push("/send/MONA/?address="+monaR.exec(content)[0])
          
        }else if(xrpR.exec(content)){
          this.$router.push("/send/XRP/?address="+xrpR.exec(content)[0])
        }else if(invR.exec(content)){
          this.$router.push("/invoice/"+invR.exec(content)[0])
        }else{
          //do nothing
        }
      });
      scanner.addListener('active', ()=>{
        this.qrEnabled=true
      });
      scanner.addListener('inactive', ()=>{
        this.qrEnabled=true
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
    },
    logout(){
      canpay.accessToken=""
      canpay.refreshToken=""
      location.hash="/new"
    }
  },
  mounted(){
    this.getWallet()
  }
}
</script>

<style lang="scss" scoped>
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

.at-card__body a{
    margin:4px;
}
.qrWrap{
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    bottom:0;
    .getPermission,video{
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        bottom:0;
        background-color:#ddd;
        .float{
            width: 150px;
            height: 100px;
            position: absolute;
            top: 50%;
            margin-top: -50px;
            left: 50%;
            margin-left: -75px;
            text-align: center;
            i{
                display:block;
                font-size:60px;
            }
        }
    }
}
.wallet{
    padding:5px;
}
</style>
