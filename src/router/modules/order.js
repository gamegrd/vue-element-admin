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
    roles: ['admin', 'employer'] // you can set roles in root nav
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/order/index'),
      name: 'orderguide',
      meta: {
        title: 'orderguide',
        icon: 'example',
        roles: ['employer'] // or you can only set roles in sub nav
      }
    }
  ]
}

export default orderRouter
