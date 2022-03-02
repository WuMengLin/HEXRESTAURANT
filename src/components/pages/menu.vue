<template>
  <div class="hello">
  <ul class="nav">
  <li class="nav-item">
    <router-link class="nav-link" to="/page">child 1</router-link>
  </li>
  <li class="nav-item">
    <router-link class="nav-link" to="/page/child2">child 2</router-link>
  </li>
  <li class="nav-item">
     <router-link class="nav-link" to="/page/child/">child 3</router-link>
  </li>
  <li class="nav-item">
     <a href="#" class="nav-link" @click.prevent="updatePath">切換到指定頁面</a>
  </li>
  <li class="nav-item">
     <a href="#" class="nav-link" @click.prevent="beforePath">回到上一頁</a>
  </li>
  <li class="nav-item">
     <a href="#" class="nav-link" @click.prevent="afterPath">去到下一頁</a>
  </li>
</ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      http: process.env.HTTP_PATH,
      tesy: process.env.NODE_ENV,
    }
  },
  methods:{
      updatePath(){
          this.$router.push('/page/child2');
      },
      beforePath(){
          this.$router.back();
      },
      afterPath(){
          this.$router.forward();
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
