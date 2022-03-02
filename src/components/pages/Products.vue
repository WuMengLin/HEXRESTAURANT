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
          <i class="fas fa-star-christmas fa-spin"></i> -->
          <button class="btn btn-primary btn-sm mt-4" @click.prevent="openModal(true)">建立新產品</button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">分類</th>
                    <th>產品名稱</th>
                    <th width="120">原價</th>
                    <th width="120">售價</th>
                    <th width="100">是否啟用</th>
                    <th width="80">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in products" :key="item.id">
                    <td>{{item.category}}</td>
                    <td>{{item.title}}</td>
                    <td class="text-tight">{{item.origin_price | currency}}</td>
                    <td class="text-tight">{{item.price | currency}}</td>
                    <td>
                        <span v-if="item.is_enabled" class="text-auccess">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <div class="btn-group">
                          <button class="btn btn-outline-primary btn-sm" @click.prevent="openModal(false,item)">編輯</button>
                          <button class="btn btn-outline-danger btn-sm" @click.prevent="openDelProductModal(item)">刪除</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination :pagination="pagination" @sendPage="getProducts"></Pagination>
        <!-- <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{'disabled':!pagination.has_pre}" @click.prevent="getProducts(pagination.current_page-1)">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active':pagination.current_page==page}" @click.prevent="getProducts(page)"><a class="page-link" href="#">{{page}}</a></li>
    <li class="page-item" :class="{'disabled':!pagination.has_next}" @click.prevent="getProducts(pagination.current_page+1)">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav> -->
        <!-- Modal Start -->
            <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>新增產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="image">輸入圖片網址</label>
              <input type="text" class="form-control" id="image"
                placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
            </div>
            <div class="form-group">
              <label for="customFile">或 上傳圖片
                <i class="fas fa-spinner fa-spin" v-if="status.fileUpLoading"></i>
              </label>
              <input type="file" id="customFile" class="form-control"
                ref="files" @change="uploadFile">
            </div>
            <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
              class="img-fluid" alt="" :src="tempProduct.imageUrl">
          </div>
          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title"
                placeholder="請輸入標題" v-model="tempProduct.title">
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">分類</label>
                <input type="text" class="form-control" id="category"
                  placeholder="請輸入分類" v-model="tempProduct.category">
              </div>
              <div class="form-group col-md-6">
                <label for="price">單位</label>
                <input type="unit" class="form-control" id="unit"
                  placeholder="請輸入單位" v-model="tempProduct.unit">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
              <label for="origin_price">原價</label>
                <input type="number" class="form-control" id="origin_price"
                  placeholder="請輸入原價" v-model="tempProduct.origin_price">
              </div>
              <div class="form-group col-md-6">
                <label for="price">售價</label>
                <input type="number" class="form-control" id="price"
                  placeholder="請輸入售價" v-model="tempProduct.price">
              </div>
            </div>
            <hr>

            <div class="form-group">
              <label for="description">產品描述</label>
              <textarea type="text" class="form-control" id="description"
                placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
            </div>
            <div class="form-group">
              <label for="content">說明內容</label>
              <textarea type="text" class="form-control" id="content"
                placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click.prevent="updateProduct">確認</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>刪除產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger" @click.prevent="delProduct">確認刪除</button>
      </div>
    </div>
  </div>
</div>
        <!-- Modal End -->
    </div>
</template>

<script>
/* global $ */
import $ from 'jquery';
import Pagination from '../Pagination';//載入分頁元件

export default {
  components:{
    Pagination,
  },
  data(){
    return{
      products:[],
      tempProduct:{},
      isNew:false,
      isLoading:false,
      pagination:{},
      status:{
        fileUpLoading:false,
      },
      testProduct:{
        "title": "[賣]動物園造型衣服3",
        "category": "衣服2",
        "origin_price": 100,
        "price": 300,
        "unit": "個",
        "image": "test.testtest",
        "description": "Sit down please 名設計師設計",
        "content": "這是內容",
      },
    };
  },
  methods: {
      getProducts(page=1){//page預設帶入為1
        const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
        const vm=this;
        vm.isLoading=true;
        this.$http.get(api)
            .then((response)=>{
            console.log('取得產品',response.data);
            vm.isLoading=false;
            vm.products=response.data.products;
            vm.pagination=response.data.pagination;
        });
        
      },
      openDelProductModal(item){
        $('#delProductModal').modal('show');
        this.tempProduct=Object.assign({},item);
      },
      delProduct(){
        const vm=this;
        let api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        let httpMethods='delete';
        
        this.$http[httpMethods](api).then((response)=>{
            console.log('刪除訊息',response.data);
            if(response.data.success){
              $('#delProductModal').modal('hide');
              this.getProducts();
            }else{
              this.getProducts();
              console.log('刪除失敗');
            }      
        });
      },
      openModal(isNew,item){
          $('#productModal').modal('show');
          if(isNew){
            this.tempProduct={};
            this.isNew=true;
          }else{
            this.tempProduct=Object.assign({},item);//物件傳參考特性，所以以Object.assign({},item)來阻絕同步
            this.isNew=false;
          }
      },
      updateProduct(){
        let api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
        let httpMethods='post';
        const vm=this;  

        if(!vm.isNew){
          api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
          httpMethods='put';
        }

        //檢查登入狀態
        const checkapi = `${process.env.APIPATH}/api/user/check`;
        this.$http.post(checkapi).then((response) => {
            console.log('登入狀態驗證',response.data.success,response.data.message);
        });

        //新增產品
        this.$http[httpMethods](api,{ data: vm.tempProduct }).then((response)=>{
            console.log('上傳訊息',response.data);
            if(response.data.success){
              $('#productModal').modal('hide');
              this.getProducts();
            }else{
              this.getProducts();
              console.log('新增失敗');
            }      
        });
      },
      uploadFile(){
        console.log(this);
        const uploadFile=this.$refs.files.files[0];
        const vm=this;
        const formData = new FormData();
        formData.append('file-to-upload', uploadFile);
        const url=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
        vm.status.fileUpLoading=true;
        this.$http.post(url,formData,{
          headers:{
            'Content-Type':'multipart/form-data',
          }
        }).then((response)=>{
          console.log(response.data);
          vm.status.fileUpLoading=false;
          if(response.data.success){
            //vm.tempProduct.imageUrl=response.data.imageUrl;
            vm.$set(vm.tempProduct,'imageUrl',response.data.imageUrl);
          }else{
            this.$bus.$emit('message:push',response.data.message,'danger');
          }
        });
      }
  },
  created(){
      this.getProducts();
  }
}
</script>