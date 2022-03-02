<template>
  <div>
    
    <Navbar/>
    <Alert/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>

        <main class="col-md-9 ml-sm-auto col-lg-10" style="padding:80px 70px">
          <router-view></router-view>
        </main>
      </div>
    </div>

    
  </div>
</template>

<script>
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Alert from './AlertMessage';

export default {
  components:{
    Navbar,Sidebar,Alert
  },
  created(){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${token}`;
  }
}
</script>

<style lang="scss">

</style>