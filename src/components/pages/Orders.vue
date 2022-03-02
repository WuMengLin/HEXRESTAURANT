<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <!-- **讀取效果**
          <i class="fas fa-spinner fa-spin"></i>
          <i class="fas fa-circle-notch fa-spin"></i>
          <i class="fas fa-sync fa-spin"></i>
          <i class="fas fa-cog fa-spin"></i>
          <i class="fas fa-spinner fa-pulse"></i>
      <i class="fas fa-star-christmas fa-spin"></i>-->
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="40">#</th>
          <th width="180">成立時間</th>
          <th width="210">訂單編號</th>
          <th>電子信箱</th>
          <th>付款日期</th>
          <th width="120">訂單頁面</th>
          <th width="120">編輯訂單</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in orders" :key="item.id">
          <td>{{item.num}}</td>
          <td>{{formatTime(item.create_at)}}</td>
          <td>{{item.id}}</td>
          <td>{{item.user.email}}</td>
          <td v-if="item.paid_date">{{formatTime(item.paid_date)}}</td>
          <td v-else>尚未付款</td>
          <td>
            <button
              v-if="item.is_paid"
              class="btn btn-outline-secondary btn-sm"
              @click.prevent="payOrder(item.id)"
            >查詢訂單</button>
            <button v-else class="btn btn-primary btn-sm" @click.prevent="payOrder(item.id)">進入訂單</button>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click.prevent="openModal(item)">編輯訂單</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal Start -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>編輯訂單</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">訂單成立日</label>
                  <input type="text" class="form-control" id="title" v-model="tempCoupon.create_at">
                </div>

                <div class="form-group form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                    v-model.number="tempCoupon.is_paid"
                  >
                  <label class="form-check-label" for="exampleCheck1">付款狀態</label>
                </div>

                <div class="form-group">
                  <label for="percent">留言</label>
                  <input
                    type="text"
                    class="form-control"
                    id="percent"
                    placeholder
                    v-model="tempCoupon.message"
                  >
                </div>

                <!-- <div class="form-group">
                  <form class="col-md-10 mx-auto">
                    <table class="table">
                      <thead>
                        <th>品名</th>
                        <th>數量</th>
                        <th>單價</th>
                      </thead>
                      <tbody>
                        <tr v-for="item in tempCoupon.products" :key="item.id">
                          <td class="align-middle">{{ item.product.title }}</td>
                          <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                          <td class="align-middle text-right">{{ item.final_total }}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="2" class="text-right">總計</td>
                          <td class="text-right">{{ tempCoupon.total }}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </form>
                </div> -->

                <div class="form-group">
                  <label for="date">總價</label>
                  <input
                    type="text"
                    class="form-control"
                    id="date"
                    placeholder="請輸入到期日"
                    v-model="tempCoupon.total"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="updateOrder">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal End -->
    <Pagination :pagination="pagination" @sendPage="getOrders"></Pagination>
  </div>
</template>

<script>
/* global $ */
import $ from "jquery";
import Pagination from "../Pagination"; //載入分頁元件

export default {
  components: {
    Pagination
  },
  data() {
    return {
      isNew:false,
      pagination: {},
      tempCoupon: {
        create_at: "",
        is_paid: false,
        message: "",
        payment_method: "",
        products: [],
        total: 100,
        user: {
          address: "kaohsiung",
          email: "test@gmail.com",
          name: "test",
          tel: "0912346768"
        }
      },
      orders: [],
      isLoading: false
    };
  },
  methods: {
    getOrders(page = 1) {
      //page預設帶入為1
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log("取得訂單", response.data);
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(item) {
      $("#orderModal").modal("show");
      this.tempCoupon = Object.assign({}, item); //物件傳參考特性，所以以Object.assign({},item)來阻絕同步
      //this.tempCoupon.due_date=this.formatTime(this.tempCoupon.due_date);
      this.tempCoupon.create_at = this.formatTime(this.tempCoupon.create_at);
      this.isNew = false;
    },

    updateOrder() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/admin/order/${vm.tempCoupon.id}`;
      let httpMethods = "put";

      // if(!vm.isNew){
      //   api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      //   httpMethods='put';
      // }

      //到期日時間轉換date to timestamp
      // console.log('date',vm.tempCoupon.due_date);
      // var myDate=vm.tempCoupon.due_date;
      // myDate=myDate.split("-");
      // var newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[0];
      // newDate=new Date(newDate).getTime()
      // vm.tempCoupon.due_date=Math.floor(newDate / 1000);
      // console.log('date',vm.tempCoupon.due_date);
      //到期日時間轉換date to timestamp
      
      //取得現在時間
      // const dateTime = Date.now();
      // console.log(newDate);
      // vm.tempCoupon.due_date = Math.floor(vm.tempCoupon.due_date / 1000);

      //檢查登入狀態
      // const checkapi = `${process.env.APIPATH}/api/user/check`;
      // this.$http.post(checkapi).then((response) => {
      //     console.log('登入狀態驗證',response.data.success,response.data.message);
      //     if(response.data.success){
      //       this.$bus.$emit('message:push','登入驗證成功','success');
      //     }else{
      //       this.$bus.$emit('message:push','登入驗證失敗','danger');
      //     }
      // });

      //格式換回timesTamp
      this.tempCoupon.create_at = this.timesTamp(this.tempCoupon.create_at);

      // if(!this.tempCoupon.is_paid){
      //   this.tempCoupon.paid_date='';
      // }

      //修改訂單
      this.$http[httpMethods](api, { data: vm.tempCoupon }).then(response => {
        console.log("上傳訊息", response.data);
        if (response.data.success) {
          $("#orderModal").modal("hide");
          this.getOrders();
          this.$bus.$emit("message:push", response.data.message, "success");
        } else {
          this.getOrders();
          this.$bus.$emit("message:push", response.data.message, "danger");
          console.log("新增失敗");
        }
      });
    },
    payOrder(id) {
      //page預設帶入為1
      const vm = this;
      vm.$router.push(`/customer_checkout/${id}`);
    },
    formatTime: function(newDate) {
      var dates = new Date(newDate * 1000);
      var year = dates.getFullYear();
      var month = dates.getMonth() + 1;
      var date = dates.getDate();
      var hours = dates.getHours();
      var minutes = dates.getMinutes();
      var seconds = dates.getSeconds();
      return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
    },
    timesTamp: function(myDate){
      myDate=myDate.split("-");
      var newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[0];
      console.log(myDate[1],myDate[2],myDate[0]);
      newDate=new Date(newDate).getTime()
      return Math.floor(newDate / 1000)
      // console.log('newDate',newDate)
      // console.log('1549805731',this.formatTime('1549805731'),Math.floor(newDate / 1000));
      // console.log('1549892131',this.formatTime('1549892131'));
    }
  },
  created() {
    this.getOrders();
    //this.timesTamp('2019/2/11 21:35:31');
  }
};
</script>