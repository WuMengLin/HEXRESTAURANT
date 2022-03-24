<template>
  <div>
    <div class="container my-4">
      <div class="row">
        <div class="col-3">
          <div class="list-group sticky-top" style="top:20px">
            <a
              href="#"
              class="list-group-item list-group-item-action"
              :class="{'active':category==''}"
              @click.prevent="category = ''"
            >全部分類 All</a>
            <a
              href="#"
              class="list-group-item list-group-item-action"
              :class="{'active':category=='漢堡'}"
              @click.prevent="category = '漢堡'"
            >精選漢堡 Burger</a>
            <a
              href="#"
              class="list-group-item list-group-item-action"
              :class="{'active':category=='熱狗'}"
              @click.prevent="category = '熱狗'"
            >香脆熱狗 Hot dog</a>
            <a
              href="#"
              class="list-group-item list-group-item-action"
              :class="{'active':category=='點心'}"
              @click.prevent="category = '點心'"
            >特製點心 Dessert</a>
            <a
              href="#"
              class="list-group-item list-group-item-action"
              :class="{'active':category=='飲料'}"
              @click.prevent="category = '飲料'"
            >沁涼飲料 Drink</a>
          </div>
        </div>
        <div class="col-9">
          <div class="row">
            <div class="col-lg-4 mb-4" v-for="item in filterProducts" :key="item.id">
              <div class="card text-center h-100 border-0 box-shadow">
                <div
                  style="height: 150px; background-size: cover; background-position: center"
                  :style="{backgroundImage:`url(${item.imageUrl})`}"
                ></div>
                <div class="card-body">
                  <h5 class="card-title">{{item.title}}</h5>
                  <p class="card-text">{{item.description}}</p>
                </div>
                <div class="d-flex justify-content-end align-items-baseline px-4 mb-2">
                  <span class="text-muted">原價${{item.origin_price}}</span>
                  <h6 class="font-weight-bold ml-auto mb-0">NT${{item.price}} / {{item.unit}}</h6>
                </div>

                <div class="card-footer border-top-0 bg-white mb-2">
                  <div class="btn-group btn-group-sm">
                    <a
                      href="#"
                      class="btn btn-w1 btn-outline-primary"
                      @click.prevent="getProduct(item.id)"
                    >商品詳細頁</a>
                    <a
                      href="#"
                      class="btn btn-w1 btn-primary"
                      @click.prevent="addtoCart(item,item.id)"
                    >加入購物車</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Pagination :pagination="pagination" @sendPage="getProducts"></Pagination>
        </div>
      </div>
    </div>

    <!-- Modal ProductDetail -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold" id="exampleModalLabel">{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="PopPhoto mb-3" style="width: 100%; height: 200px;">
              <img :src="product.imageUrl" class="img-fluid" alt="">
            </div>
            
            <h4 class="font-weight-bold">立即選購精緻套餐</h4>
            <hr class="my-4">
            <div class="d-flex justify-content-end align-items-baseline mb-2">
                  <h5 class="text-muted">原價${{product.origin_price}}</h5>
                  <h3 class="font-weight-bold ml-auto mb-0">現在只要NT$ {{product.price}} / {{product.unit}}</h3>
                </div>
            <p class="text-muted">{{product.content}}</p>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
            </select>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click.prevent="addtoCart(product,product.id,product.num)">加到購物車</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from '../Pagination';//載入分頁元件

export default {
  components:{
    Pagination,
  },
  data() {
    return {
      category: "",
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
      }
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
        vm.product.num = 1;
        gtag("event", "view_item", {
          currency: "NTD",
          value: vm.product.price,
          items: [
            {
              item_id: vm.product.id,
              item_name: vm.product.title,
              affiliation: "HEXRESTAURANT",
              coupon: "no_coupon",
              currency: "NTD",
              discount: 0,
              index: 0,
              item_brand: "HEXRESTAURANT",
              item_category: vm.product.category,
              item_category2: "",
              item_category3: "",
              item_category4: "",
              item_category5: "",
              item_list_id: "",
              item_list_name: "",
              item_variant: "",
              location_id: "",
              price: vm.product.price,
              quantity: 1
            }
          ]
        });
      });
    },
    addtoCart(item, id, qty = 1) {
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
        this.$bus.$emit("updatacart:push");
        $("#productModal").modal("hide");
        gtag("event", "add_to_cart", {
          currency: "TWD",
          value: item.price * item.num,
          items: [
            {
              item_id: item.id,
              item_name: item.title,
              affiliation: "HEXRESTAURANT",
              coupon: "no_coupon",
              currency: "TWD",
              discount: 0,
              index: 0,
              item_brand: "HEXRESTAURANT",
              item_category: item.category,
              item_category2: "",
              item_category3: "",
              item_category4: "",
              item_category5: "",
              item_list_id: "",
              item_list_name: "",
              item_variant: "",
              location_id: "",
              price: item.price,
              quantity: item.num
            }
          ]
        });
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
    }
  },
  computed: {
    filterProducts() {
      const vm = this;
      if (vm.category) {
        return vm.products.filter(function(item, index, array) {
          return item.category === vm.category && item.is_enabled;
        });
      } else {
        return vm.products.filter(function(item, index, array) {
          return item.is_enabled;
        });
      }
    }
  },
  created() {
    this.getProducts();
    gtag('config', 'G-E7G6JH41FP', {
      page_title: 'HEXRESTAURANT - 商品頁',
      page_path: '/shop'
    });
  }
};
</script>

<style lang="css" scoped>
.box-shadow {
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.16);
  transition: box-shadow 0.3s;
}
.box-shadow:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.24);
}
.btn.disabled {
  pointer-events: none;
}
.PopPhoto{
    position: relative;
}
.PopPhoto Img {
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>