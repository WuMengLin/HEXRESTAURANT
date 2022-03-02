<template>
  <div class="hello">
    <h1>child 3</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  // created(){
  //     console.log(this.$route.params.id);
  //     const id=this.$route.params.id;
  //     this.$http.get(`https://randomuser.me/api/?seed=${id}`)
  //     .then((response)=>{
  //       console.log(response);
  //     });
  // }
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
