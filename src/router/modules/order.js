import Layout from '@/layout'

const orderRouter = {
  path: '/order',
  component: Layout,
  redirect: '/order/index',
  alwaysShow: true, // will always show the root menu
  name: 'order',
  meta: {
    title: 'order',
    icon: 'chart',
    roles: ['admin', 'employee', 'employe'] // you can set roles in root nav
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/order/index'),
      name: 'orderguide',
      meta: {
        title: 'orderguide',
        icon: 'example',
        roles: ['employer', 'employee'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'takerorder',
      component: () => import('@/views/order/takerorder'),
      name: 'takerorder',
      meta: {
        title: '接单',
        icon: 'example',
        roles: ['employer', 'employee'] // or you can only set roles in sub nav
      }
    }
  ]
}

export default orderRouter
