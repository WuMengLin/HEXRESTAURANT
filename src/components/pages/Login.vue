<template>
  <div>
    <form class="form-signin" @submit.prevent="signin">
      
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" v-model="user.username">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" v-model="user.password">
      <div data-v-767e4b7c="" class="checkbox mb-3"><label data-v-767e4b7c="" class="text-secondary">
        預設值為測試用帳號，請登入瀏覽後台。
      </label></div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">© 2017-2018</p>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
        user:{
            username: 'leo80625@gmail.com',
            password: '1234567'
        },
    }
  },
  created(){
  },
  methods: {
      signin(){
        const api=`${process.env.APIPATH}/admin/signin`;
        const vm=this;
        this.$http.post(api,this.user)
            .then((response)=>{
            console.log('登入結果',response.data.success,response.data.message);
            if(response.data.success){
              const token = response.data.token;
              const expired = response.data.expired;
              console.log(token, expired);
              document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
              vm.$router.push('/admin/products');
            }
        });
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
