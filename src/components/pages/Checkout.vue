<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container pb-4">
      <div class="py-5 text-center">
        <h2>Checkout form</h2>
        <p
          class="lead"
        >Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
      </div>

      <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Your cart</span>
            <span class="badge badge-secondary badge-pill">{{cart.carts.length}}</span>
          </h4>
          <ul class="list-group mb-3">
            <li
              class="list-group-item d-flex justify-content-between lh-condensed"
              v-for="(item,index) in cart.carts"
              :key="index"
            >
              <div>
                <h6 class="my-0">{{item.product.title}}</h6>
                <small
                  class="text-muted text-overflow d-block"
                  style="max-width:120px;"
                >{{item.product.description}}</small>
                <small class="text-overflow d-block text-danger" v-if="item.coupon">已套用優惠券</small>
              </div>
              <span class="text-muted">${{item.product.price}}</span>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm align-self-center"
                style="height:33px;"
                @click.prevent="removeCartItem(item.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </li>

            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="font-weight-bold my-0">應付金額</h6>
                <small
                  class="text-muted text-overflow d-block"
                  style="max-width:120px;"
                  v-if="cart.total !== cart.final_total"
                >原價{{ cart.total }}</small>
              </div>
              <span class="text-muted font-weight-bold">${{ cart.final_total }}</span>
            </li>
          </ul>

          <form class="card p-2">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Promo code ( testCode )"
                v-model="coupon_code"
              >
              <div class="input-group-append">
                <button
                  type="submit"
                  class="btn btn-secondary"
                  @click.prevent="addCouponCode"
                >Redeem</button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-8 order-md-1">
          <h4 class="mb-3">Billing address</h4>
          <!--<form class="needs-validation" novalidate>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">First name</label>
                <input type="text" class="form-control" id="firstName" placeholder value required>
                <div class="invalid-feedback">Valid first name is required.</div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="lastName">Last name</label>
                <input type="text" class="form-control" id="lastName" placeholder value required>
                <div class="invalid-feedback">Valid last name is required.</div>
              </div>
            </div>

            <div class="mb-3">
              <label for="username">Username</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">@</span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Username"
                  required
                >
                <div class="invalid-feedback" style="width: 100%;">Your username is required.</div>
              </div>
            </div>

            <div class="mb-3">
              <label for="email">Email
                <span class="text-muted">(Optional)</span>
              </label>
              <input type="email" class="form-control" id="email" placeholder="you@example.com">
              <div class="invalid-feedback">Please enter a valid email address for shipping updates.</div>
            </div>

            <div class="mb-3">
              <label for="address">Address</label>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="1234 Main St"
                required
              >
              <div class="invalid-feedback">Please enter your shipping address.</div>
            </div>

            <div class="mb-3">
              <label for="address2">Address 2
                <span class="text-muted">(Optional)</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="address2"
                placeholder="Apartment or suite"
              >
            </div>

            <div class="row">
              <div class="col-md-5 mb-3">
                <label for="country">Country</label>
                <select class="custom-select d-block w-100" id="country" required>
                  <option value>Choose...</option>
                  <option>United States</option>
                </select>
                <div class="invalid-feedback">Please select a valid country.</div>
              </div>
              <div class="col-md-4 mb-3">
                <label for="state">State</label>
                <select class="custom-select d-block w-100" id="state" required>
                  <option value>Choose...</option>
                  <option>California</option>
                </select>
                <div class="invalid-feedback">Please provide a valid state.</div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="zip">Zip</label>
                <input type="text" class="form-control" id="zip" placeholder required>
                <div class="invalid-feedback">Zip code required.</div>
              </div>
            </div>
            <hr class="mb-4">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="same-address">
              <label
                class="custom-control-label"
                for="same-address"
              >Shipping address is the same as my billing address</label>
            </div>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="save-info">
              <label
                class="custom-control-label"
                for="save-info"
              >Save this information for next time</label>
            </div>
            <hr class="mb-4">

            <h4 class="mb-3">Payment</h4>

            <div class="d-block my-3">
              <div class="custom-control custom-radio">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  class="custom-control-input"
                  checked
                  required
                >
                <label class="custom-control-label" for="credit">Credit card</label>
              </div>
              <div class="custom-control custom-radio">
                <input
                  id="debit"
                  name="paymentMethod"
                  type="radio"
                  class="custom-control-input"
                  required
                >
                <label class="custom-control-label" for="debit">Debit card</label>
              </div>
              <div class="custom-control custom-radio">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  class="custom-control-input"
                  required
                >
                <label class="custom-control-label" for="paypal">Paypal</label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="cc-name">Name on card</label>
                <input type="text" class="form-control" id="cc-name" placeholder required>
                <small class="text-muted">Full name as displayed on card</small>
                <div class="invalid-feedback">Name on card is required</div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="cc-number">Credit card number</label>
                <input type="text" class="form-control" id="cc-number" placeholder required>
                <div class="invalid-feedback">Credit card number is required</div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 mb-3">
                <label for="cc-expiration">Expiration</label>
                <input type="text" class="form-control" id="cc-expiration" placeholder required>
                <div class="invalid-feedback">Expiration date required</div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="cc-expiration">CVV</label>
                <input type="text" class="form-control" id="cc-cvv" placeholder required>
                <div class="invalid-feedback">Security code required</div>
              </div>
            </div>
            <hr class="mb-4">
            <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
          </form>-->
          <form class="needs-validation" @submit.prevent="ceateOrder">
            <div class="form-group">
              <label for="useremail">Email</label>
              <input
                type="email"
                class="form-control"
                :class="{'is-invalid':errors.has('email')}"
                name="email"
                id="useremail"
                v-model="form.user.email"
                v-validate="'required|email'"
                placeholder="請輸入 Email"
              >
              <span class="text-danger">{{errors.first('email')}}</span>
            </div>

            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input
                type="text"
                class="form-control"
                :class="{'is-invalid':errors.has('name')}"
                name="name"
                id="username"
                v-model="form.user.name"
                v-validate="'required'"
                placeholder="輸入姓名"
              >
              <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
            </div>

            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input
                type="tel"
                class="form-control"
                :class="{'is-invalid':errors.has('tel')}"
                name="tel"
                id="usertel"
                v-model="form.user.tel"
                v-validate="'required'"
                placeholder="請輸入電話"
              >
              <span class="text-danger" v-if="errors.has('tel')">電話欄位不得留空</span>
            </div>

            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input
                type="address"
                class="form-control"
                :class="{'is-invalid':errors.has('address')}"
                name="address"
                id="useraddress"
                v-model="form.user.address"
                v-validate="'required'"
                placeholder="請輸入地址"
              >
              <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>

            <div class="form-group">
              <label for="useraddress">留言</label>
              <textarea name id class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-primary btn-lg btn-block">送出訂單</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupon_code: "",
      cart: {
        carts: []
      },
      ststus: {
        loadingItem: ""
      },
      isLoading: false,
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  methods: {
    getCarts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log("取得 結帳頁 購物車列表", response.data);
        vm.isLoading = false;
        vm.cart = response.data.data;
      });
    },
    addCouponCode() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code
      };
      this.$http.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          this.$bus.$emit("message:push", response.data.message, "success");
        } else {
          this.$bus.$emit("message:push", response.data.message, "danger");
        }
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
    ceateOrder() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(api, { data: order }).then(response => {
            console.log("建立訂單", response.data);
            if(response.data.success){
              //更新 Navbar 購物車列表
              this.$bus.$emit("updatacart:push");
              vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            }
          });
        }else{
          console.log("欄位不完整");
        }
      });
    }
  },
  created() {
    /*進入頁面時取得購物車列表*/
    this.getCarts();
  }
};
</script>

<style scoped>
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
