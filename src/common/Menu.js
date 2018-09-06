/**
 * 菜单配置
 */
const menuList = [
  {
    title: '首页',
    icon: 'home',
    key: '/home'
  },
  {
    title: '用户管理',
    icon: 'user',
    key: '/user'
  },
  {
    title: '设备管理',
    icon: 'desktop',
    key: '/device',
    children: [
      {
        title: '设备列表',
        key: '/device/list'
      },
      {
        title: '设备分布',
        key: '/device/distribution'
      },
      {
        title: '设备版本',
        key: '/device/version'
      }
    ]
  },
  {
    title: '权限设置',
    key: '/permission'
  }
];
export default menuList;
