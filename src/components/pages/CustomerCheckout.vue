<template>
  <div class="container-fluid">
    <loading :active.sync="isLoading"></loading>
    <div class="mt-5 row justify-content-center">
      <div class="col-md-6 text-center">
        <h2>請確認您的訂單資訊</h2>
        <p class="text-muted">Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
      </div>
    </div>
    <div class="mb-5 row justify-content-center">
  <form class="col-md-6" @submit.prevent="payOrder">
    <table class="table">
      <thead>
        <th>品名</th>
        <th>數量</th>
        <th>單價</th>
      </thead>
      <tbody>
        <tr v-for="item in order.products" :key="item.id">
          <td class="align-middle">{{ item.product.title }}</td>
          <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
          <td class="align-middle text-right">{{ item.final_total }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" class="text-right">總計</td>
          <td class="text-right">{{ order.total }}</td>
        </tr>
      </tfoot>
    </table>

    <table class="table">
      <tbody>
        <tr>
          <th width="100">Email</th>
          <td>{{ order.user.email }}</td>
        </tr>
        <tr>
          <th>姓名</th>
          <td>{{ order.user.name }}</td>
        </tr>
        <tr>
          <th>收件人電話</th>
          <td>{{ order.user.tel }}</td>
        </tr>
        <tr>
          <th>收件人地址</th>
          <td>{{ order.user.address }}</td>
        </tr>
        <tr>
          <th>付款狀態</th>
          <td>
            <span v-if="!order.is_paid">尚未付款</span>
            <span v-else class="text-success">付款完成</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-right" v-if="order.is_paid === false">
      <button class="btn btn-danger">確認付款去</button>
    </div>
  </form>
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      orderId:'',
      order: {
        user:{},
      },
      purchaseItem:[]
    }
  },
  methods: {
    getOrder(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log("取得訂單", response.data);
        vm.isLoading = false;
        if(response.data.success){
          vm.order=response.data.order
          for(let i=0;i<Object.keys(vm.order.products).length;i++){
            vm.purchaseItem.push(
              {
                item_id: vm.order.products[Object.keys(vm.order.products)[i]].product.id,
                item_name: vm.order.products[Object.keys(vm.order.products)[i]].product.title,
                affiliation: "HEXRESTAURANT",
                coupon: "no_coupon",
                currency: "NTD",
                discount: 0,
                index: i,
                item_brand: "HEXRESTAURANT",
                item_category: vm.order.products[Object.keys(vm.order.products)[i]].product.category,
                item_category2: "",
                item_category3: "",
                item_category4: "",
                item_category5: "",
                item_list_id: "",
                item_list_name: "",
                item_variant: "",
                location_id: "",
                price: vm.order.products[Object.keys(vm.order.products)[i]].product.price,
                quantity: vm.order.products[Object.keys(vm.order.products)[i]].qty
              }
            )
          }
        }
      });
    },
    payOrder(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(api).then(response => {
        console.log("結帳付款", response.data);
        vm.isLoading = false;
        if(response.data.success){
          gtag("event", "purchase", {
            transaction_id: vm.order.id,
            affiliation: "HEXRESTAURANT",
            value: vm.order.total,
            tax: 0,
            shipping: "",
            currency: "NTD",
            coupon: "",
            items: vm.purchaseItem
          });
        }
      });
    }
  },
  created(){
      console.log(this.$route.params.orderId);
      this.orderId=this.$route.params.orderId;
      this.getOrder();
  }
};
</script>