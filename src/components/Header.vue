<template>
  <div>
    <div class="bg-secondary py-1">
      <div class="container text-right">
        <i class="fab fa-facebook-square text-white"></i>
        <i class="fab fa-twitter-square text-white"></i>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand font-weight-bold" href="#" to="/">GA4-RESTAURANT</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" href="#" to="/">HOME</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" href="#" to="/shop">SHOP</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" href="#" to="/about">ABOUT</router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link class="nav-link" href="#" to="/support">SUPPORT</router-link>
            </li>-->
            <li class="nav-item">
              <router-link class="nav-link" href="#" to="/checkout">CHECKOUT</router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link class="nav-link" href="#" to="admin/orders">PAYORDER</router-link>
            </li> -->
            <!--<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
            </li>-->
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <button
              type="button"
              class="btn btn btn-outline-light mr-1"
              data-toggle="modal"
              data-target="#loginModal"
              v-if="!uid"
            >登入</button>

            <div class="text-light mr-2" v-else>
              <dir class="m-0">親愛的 訪客先生 , 您好</dir>
              <!-- <dir class="m-0 text-warning">請重新登入以操作後台</dir> -->
            </div>
            
            <button type="button" class="btn btn btn-light mr-1" @click="logout">登出</button>
            <!-- <router-link href="#" to="/login" class="btn btn btn-outline-light mr-1">登入</router-link> -->
            <router-link href="#" to="/admin/products" class="btn btn-warning">BACKSTAGE</router-link>
            <!--       <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>-->
            <div class="dropdown">
              <button
                class="btn btn-cart text-white"
                type="button"
                id="dropdownMenuButton"
                data-flip="false"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-shopping-cart fa-2x"></i>
                <span class="badge badge-danger">{{cart.carts.length}}</span>
              </button>
              <div class="dropdown-menu dropdown-menu-right" style="min-width:300px;">
                <div class="px-4 py-3">
                  <h6>已選擇商品</h6>
                  <table class="table table-sm">
                    <tbody>
                      <tr v-for="(item,index) in cart.carts" :key="index">
                        <td class="align-middle text-center">
                          <a href="#" class="text-muted" @click.prevent="removeCartItem(item.id)">
                            <i class="fas fa-trash-alt"></i>
                          </a>
                        </td>
                        <td
                          class="align-middle text-overflow"
                          style="max-width:80px;"
                        >{{item.product.title}}</td>
                        <td class="align-middle">{{item.qty}} {{item.product.unit}}</td>
                        <td class="align-middle text-right">NT${{item.product.price}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <router-link class="btn btn-primary btn-block" href="#" to="/checkout">結帳去</router-link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </nav>

    <header>
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div
            class="carousel-item active header-carousel-item bg-cover"
            style="background-image: url(https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)"
          >
            <div class="carousel-caption d-none d-md-block py-4">
              <div class="container">
                <h3>一個人，田野間的輕鬆美味</h3>
                <p>城小中假上問，洲元化究變快歡專，臺正機上色從多空放我。來來中的來落行間我海府子成隨上事女，的石在朋經以定空他；級病期他，會性前集一於得當院應對分！意斯能己水成神錢。城小中假上問，洲元化究變快歡專，臺正機上色從多空放我。</p>
              </div>
            </div>
          </div>

          <div
            class="carousel-item header-carousel-item bg-cover"
            style="background-image: url(https://images.unsplash.com/photo-1495461199391-8c39ab674295?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)"
          >
            <div class="carousel-caption d-none d-md-block py-4">
              <div class="container">
                <h3>無與倫比的夢幻饗宴</h3>
                <p>城小中假上問，洲元化究變快歡專，臺正機上色從多空放我。來來中的來落行間我海府子成隨上事女，的石在朋經以定空他；級病期他，會性前集一於得當院應對分！意斯能己水成神錢。城小中假上問，洲元化究變快歡專，臺正機上色從多空放我。</p>
              </div>
            </div>
          </div>

          <div
            class="carousel-item header-carousel-item bg-cover"
            style="background-image: url(https://images.unsplash.com/photo-1490731727228-d56f39758d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)"
          >
            <div class="carousel-caption d-none d-md-block py-4">
              <div class="container">
                <h3>午後的愜意點心時光</h3>
                <p>城小中假上問，洲元化究變快歡專，臺正機上色從多空放我。來來中的來落行間我海府子成隨上事女，的石在朋經以定空他；級病期他，會性前集一於得當院應對分！意斯能己水成神錢。城小中假上問，洲元化究變快歡專，臺正機上色從多空放我。</p>
              </div>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </header>

    <!-- Modal Login -->
    <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">登入服務</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  v-model="user.username"
                >
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">密碼</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  v-model="user.password"
                >
              </div>
              <div class="form-group">
                <small data-v-3819cf97="" id="emailHelp" class="form-text text-muted">預設值為測試用帳號，請登入瀏覽後台。</small>
                <!-- <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">記住帳號</label> -->
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <!-- <a
              href
              data-dismiss="modal"
              class="mr-auto"
              data-toggle="modal"
              data-target="#registerModal"
            >還沒有帳號？</a>-->
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="signin">登入</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      uid: "",
      user: {
        username: "leo80625@gmail.com",
        password: "1234567"
      },
      products: [],
      product: {},
      coupon_code: "",
      cart: {
        carts: []
      },
      ststus: {
        loadingItem: ""
      },
      isLoading: false,
      pagination: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      viewCartItem:[]
    };
  },
  methods: {
    getProducts(page = 1) {
      //page預設帶入為1
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log("取得產品", response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    getProduct(id) {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/product/${id}`;
      const vm = this;
      vm.ststus.loadingItem = id;
      this.$http.get(api).then(response => {
        console.log("取得單一產品", response.data);
        vm.ststus.loadingItem = "";
        vm.product = response.data.product;
        $("#productModal").modal("show");
      });
    },
    getCarts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log("更新 Navbar 購物車列表", response.data);
        vm.isLoading = false;
        vm.cart = response.data.data;
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.ststus.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(api, { data: cart }).then(response => {
        console.log("加入購物車", response.data);
        vm.ststus.loadingItem = "";
        this.getCarts();
      });
    },
    removeCartItem(id) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/cart/${id}`;
      vm.ststus.loadingItem = id;
      this.$http.delete(api).then(response => {
        console.log("刪除購物車項目", response.data);
        this.getCarts();
      });
    },
    addCouponCode() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code
      };
      this.$http.post(api, { data: coupon }).then(response => {
        console.log("新增優惠券", response.data);
        this.getCarts();
      });
    },
    ceateOrder() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(api, { data: order }).then(response => {
            console.log("建立訂單", response.data);
            if (response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            }
          });
        } else {
          console.log("欄位不完整");
        }
      });
    },
    signin() {
      const api = `${process.env.APIPATH}/admin/signin`;
      const vm = this;
      this.$http.post(api, this.user).then(response => {
        console.log(
          "登入結果",
          response.data.success,
          response.data.message,
          response.data
        );
        if (response.data.success) {
          const token = response.data.token;
          const expired = response.data.expired;
          console.log(token, expired);
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
          vm.uid = response.data.uid;
          $("#loginModal").modal("hide");
        }
      });
    },
    logout() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then(response => {
        console.log("登出結果", response.data.success, response.data.message);
        if (response.data.success) {
          vm.uid = "";
        }
      });
    }
  },
  created() {
    const vm = this;

    /*當商品加入購物車時更新購物車列表*/
    vm.$bus.$on("updatacart:push", () => {
      vm.getCarts();
    });

    /*進入頁面時取得購物車列表*/
    this.getCarts();

    /*進入頁面時檢查登入狀態*/
    const checkapi = `${process.env.APIPATH}/api/user/check`;
    this.$http.post(checkapi).then(response => {
      console.log("登入狀態驗證", response.data.success, response.data.message);
      if (response.data.success) {
        this.uid = "已登入";
      } else {
      }
    });
  }
};
</script>

<style lang="css" scoped>
.btn:focus {
  outline-offset: none;
  box-shadow: none;
}
.btn {
  border-width: 2px;
}
.navbar-brand {
  background-color: #343a40;
  box-shadow: none;
}
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>