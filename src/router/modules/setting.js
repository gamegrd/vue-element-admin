
import Layout from '@/layout'

const settingRouter = {
  path: '/setting',
  component: Layout,
  redirect: '/setting/index',
  alwaysShow: true, // will always show the root menu
  name: 'setting',
  meta: {
    title: 'setting',
    icon: 'edit',
    roles: ['admin', 'employer'] // you can set roles in root nav
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/setting/index'),
      name: 'brokerage',
      meta: {
        title: 'brokerage',
        icon: 'money',
        roles: ['employer'] // or you can only set roles in sub nav
      }
    }
  ]
}

export default settingRouter
