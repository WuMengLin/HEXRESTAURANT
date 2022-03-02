<template>
  <div>
    <Alert/>
    
      <Header></Header>
      <router-view></router-view>
      <Footer></Footer>

  </div>
</template>

<script>
import Header from './Header';
import Footer from './Footer';
import Alert from './AlertMessage';

export default {
  components:{
    Header,Footer,Alert
  }
}
</script>

<style lang="css">
/*--Shop Start--*/
.btn-w1{
  border-width:1px;
}
.btn-cart{
  background-color:transparent;
  position: relative;
}

.btn-cart .badge{
  position: absolute;
  top:-1px;
  right:-1px;
}

.dropdown-menu-right{
  right:0;
  left:auto;
}
/*--Shop End--*/

.form-control{
  border-width:2px;
}

.header-carousel-item{
  height:550px;
}

.bg-cover{
  background-size:cover;
  background-position:center center;
}
.carousel-caption{
  background-color:rgba(0,0,0,.6);
  
}

@media (min-width: 768px) { 
  .text-md-dark{
    color:#333;
  }
}
</style>