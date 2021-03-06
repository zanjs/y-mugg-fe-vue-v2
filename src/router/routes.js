import Home from '@/components/layout/Home'
import Index from '@/components/views/Index'

const Chart = () => import('@/components/views/Chart')
const NotFound = () => import('@/components/pages/NotFound')
const Register = () => import('@/components/pages/Register')
const E404 = () => import('@/components/pages/E404')
const Icon = () => import('@/components/pages/Icon')
const Login = () => import('@/components/pages/Login')
const Table = () => import('@/components/views/Table')
const UserInfo = () => import('@/components/views/UserInfo')
const List = () => import('@/components/views/List')
const Product = () => import('@/components/views/Product')
const Wareroom = () => import('@/components/views/Wareroom')
const Inventory = () => import('@/components/views/Inventory.vue')
const Sale = () => import('@/components/views/Sale')
const Transport = () => import('@/components/views/Transport')
const Statistics = () => import('@/components/views/Statistics')
const Filter = () => import('@/components/pages/Filter')
const Lock = () => import('@/components/layout/base/Lock')

const routes = [
  {
    path: '/',
    name: '首页',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/chart',
        name: 'chart',
        component: Chart,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/list',
        name: 'list',
        component: List,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/product',
        name: '产品',
        component: Product,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/wareroom',
        name: '仓库',
        component: Wareroom,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/inventory',
        name: '库存',
        component: Inventory,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/sale',
        name: '销量',
        component: Sale,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/transport',
        name: '托运',
        component: Transport,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/statistics',
        name: '统计',
        component: Statistics,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: UserInfo,
        icon: 'icon-addpeople_fill',
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/table',
        name: 'table',
        component: Table,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/icon',
        name: 'icon',
        component: Icon,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/filter',
        name: 'filter',
        component: Filter,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/notFound',
        name: 'notFound',
        component: NotFound,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/error404',
    name: 'error404',
    component: E404
  },
  {
    path: '/lock',
    name: 'lock',
    component: Lock
  },
  {
    path: '*',
    redirect: '/notFound'
  }

]

export default routes
