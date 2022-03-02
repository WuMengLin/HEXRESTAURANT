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
      <button class="btn btn-primary btn-sm mt-4" @click.prevent="openModal(true)">新增優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="180">到期日</th>
          <th width="120">優惠券</th>
          <th >優惠券標號</th>
          <th width="100">是否啟用</th>
          <th width="60">折數</th>
          <th width="100">優惠碼</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" :key="item.id">
          <td>{{formatTime(item.due_date)}}</td>
          <td>{{item.title}}</td>
          <td>{{item.id}}</td>
          <td v-if="item.is_enabled">啟用中</td>
          <td v-else>待啟用</td>
          <td>{{item.percent / 10}}折</td>
          <td>{{item.code}}</td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click.prevent="openModal(false,item)"

              >編輯</button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click.prevent="delCoupon(item)"
              >刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination="pagination" @sendPage="getOrders"></Pagination>

<!-- Modal Start -->
            <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>編輯優惠券</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title"
                placeholder="請輸入標題" v-model="tempCoupon.title">
            </div>

            <div class="form-group">
              <label for="code">優惠碼</label>
              <input type="text" class="form-control" id="code"
                placeholder="請輸入優惠碼" v-model="tempCoupon.code">
            </div>

            <div class="form-group">
              <label for="percent">折數(0-100)</label>
              <input type="text" class="form-control" id="percent"
                placeholder="請輸入折數" v-model="tempCoupon.percent">
            </div>

            <div class="form-group">
              <label for="date">到期日</label>
              <input type="date" class="form-control" id="date"
                placeholder="請輸入到期日" v-model="tempCoupon.due_date">
            </div>

            <hr>

            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click.prevent="updateCoupon">確認</button>
      </div>
    </div>
  </div>
</div>
        <!-- Modal End -->
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
      pagination:{},
      coupons: [],
      isLoading: false,
      isNew:false,
      tempCoupon:{},
    }
  },
  methods: {
    //?page=${page}
    getOrders(page = 1) {
      //page預設帶入為1
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log("取得優惠券列表", response.data);
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
        vm.pagination=response.data.pagination;
      });
    },

    openModal(isNew,item){
          $('#couponModal').modal('show');
          if(isNew){
            this.tempCoupon={};
            this.isNew=true;
          }else{
            this.tempCoupon=Object.assign({},item);//物件傳參考特性，所以以Object.assign({},item)來阻絕同步
            this.tempCoupon.due_date=this.formatTime(this.tempCoupon.due_date);
            this.isNew=false;
          }
      },
      
    updateCoupon(){
      let api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
        let httpMethods='post';
        const vm=this;

        if(!vm.isNew){
          api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
          httpMethods='put';
        }

        //到期日時間轉換date to timestamp
        console.log('date',vm.tempCoupon.due_date);
        var myDate=vm.tempCoupon.due_date;
        myDate=myDate.split("-");
        var newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[0];
        newDate=new Date(newDate).getTime()
        vm.tempCoupon.due_date=Math.floor(newDate / 1000);
        console.log('date',vm.tempCoupon.due_date);

        //取得現在時間
        // const dateTime = Date.now();
        // console.log(newDate);
        // vm.tempCoupon.due_date = Math.floor(vm.tempCoupon.due_date / 1000);

        //檢查登入狀態
        const checkapi = `${process.env.APIPATH}/api/user/check`;
        this.$http.post(checkapi).then((response) => {
            console.log('登入狀態驗證',response.data.success,response.data.message);
            if(response.data.success){
              this.$bus.$emit('message:push','登入驗證成功','success');
            }else{
              this.$bus.$emit('message:push','登入驗證失敗','danger');
            }
        });

        //新增修改優惠券
        this.$http[httpMethods](api,{ data: vm.tempCoupon }).then((response)=>{
            console.log('上傳訊息',response.data);
            if(response.data.success){
              $('#couponModal').modal('hide');
              this.getOrders();
              this.$bus.$emit('message:push',response.data.message,'success');
            }else{
              this.getOrders();
              this.$bus.$emit('message:push',response.data.message,'danger');
              console.log('新增失敗');
            }      
        });
    },
    delCoupon(item){
      this.tempCoupon=Object.assign({},item);
      const vm=this;
        let api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        let httpMethods='delete';
        
        this.$http[httpMethods](api).then((response)=>{
            console.log('刪除訊息',response.data);
            if(response.data.success){
              this.getOrders();
            }else{
              this.getOrders();
              console.log('刪除失敗');
            }      
        });
    },

    formatTime: function(newDate) {
      var dates = new Date(newDate * 1000);
      var year = dates.getFullYear();
      var month = dates.getMonth() + 1;
      var date = dates.getDate() + 1;
      var hours = dates.getHours();
      var minutes = dates.getMinutes();
      var seconds = dates.getSeconds();
      return `${year}-${month}-${date}`;
      //return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
    }
  },
  created() {
    this.getOrders();
  }
};
</script>