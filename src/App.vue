<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  // created(){
  //   console.log(process.env.APIPATH,process.env.CUSTOMPATH);
  //   this.$http.get(`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`)
  //     .then((response)=>{
  //       console.log(response);
  //     });
  // },
  methods: {
      logout(){
        const api=`${process.env.APIPATH}/logout`;
        const vm=this;
        this.$http.post(api)
            .then((response)=>{
            console.log('登出結果',response.data.success,response.data.message);
            if(response.data.success){
                vm.$router.push('/login');
            }
        });
      }
  },
}
</script>

<style lang="scss">
//@import "~bootstrap/scss/bootstrap";
@import "./assets/all";

// $color:black;
// body{
//   background-color:$color;
// }

// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
