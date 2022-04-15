import Vue from 'vue'
import VueRouter from 'vue-router'
//官方的元件

//import Home from '@/components/HelloWorld';
// import Page from '@/components/pages/page';
// import child from '@/components/pages/child';
// import child2 from '@/components/pages/child2';
// import child3 from '@/components/pages/child3';
// import Menu from '@/components/pages/menu';
import StoreWebsite from '@/components/StoreWebsite';
import Index from '@/components/pages/Index';
import Shop from '@/components/pages/Shop';
import About from '@/components/pages/About';
import Support from '@/components/pages/Support';
import Checkout from '@/components/pages/Checkout';

import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import Coupons from '@/components/pages/Coupons';
import CustomerOrder from '@/components/pages/CustomerOrder';
import CustomerCheckout from '@/components/pages/CustomerCheckout';

import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
//自訂的分頁元件

Vue.use(VueRouter);

export default new VueRouter({
    //mode: "history",
    linkExactActiveClass:'active',
    routes:[
        //阻止用戶進入未定義的路徑，並導向登入頁
        {
          path:'*',
          redirect:'/login'
        },
        // {
        //   name:'首頁',
        //   path:'/',
        //   component:Home,
        //   meta: { 
        //     requiresAuth: true,  //表示進入此頁面需驗證
        //   }
        // },
        // {
        //   name: '登入頁',
        //   path: '/login',
        //   component: Login,
        // },
        // {
        //   //name: '分頁',
        //   path: '/',
        //   component: Page,
        //   components: {
        //     default: Page,
        //     menu: Menu
        //   },
        //   children:[
        //       {
        //         name: '卡片 1',
        //         path: '',
        //         component: child,
        //       },
        //       {
        //         name: '卡片 2',
        //         path: 'child2',
        //         component: child2,
        //       },
        //       {
        //         name: '卡片 3',
        //         path: 'child/',
        //         component: child3,
        //       },
        //   ]
        // },
      {
        path: '/',
        component: StoreWebsite,
        children: [
          {
            path: '',
            name:'首頁',
            component: Index,
          },
          {
            path: '/shop',
            name:'商品頁',
            component: Shop,
          },
          {
            path: '/about',
            name:'關於我們',
            component: About,
          },
          {
            path: '/support',
            name:'註冊頁',
            component: Support,
          },
          {
            path: '/checkout',
            name:'結帳頁',
            component: Checkout,
          },
          {
            path: 'customer_checkout/:orderId',
            name:'付款頁',
            component: CustomerCheckout,
          },
        ]
      },
        {
          name: 'Dashboard',
          path: '/admin',
          component: Dashboard,
          children:[
            {
              name: 'Products',
              path: 'products',
              component:Products,
              meta: {requiresAuth: true},//表示進入此頁面需驗證
            },
            {
              path: 'coupons',
              component: Coupons,
              meta: { requiresAuth: true },//表示進入此頁面需驗證
            },
            {
              path: 'orders',
              component: Orders,
              meta: { requiresAuth: true },//表示進入此頁面需驗證
            },
          ]
        },
        {
          //name: 'Dashboard',
          path: '/',
          component: Dashboard,
          
          children:[
            {
              name: '登入頁',
              path: '/login',
              component: Login,
            },
            {
              name: 'CustomerOrder',
              path: 'customer_order',
              component: CustomerOrder,
            },

          ]
        },

    ]
});

