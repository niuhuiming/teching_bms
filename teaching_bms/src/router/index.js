import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

import Layout from '@/views/layout'

// 静态路由
export const constantRouterMap = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
        meta: {
            title: '404'
        }
    }
]

// 需要权限的路由
export const asyncRouterMap = [
    {
        path: '/home',
        component: Layout,
        redirect: '/home/index',
        children: [
            {
                path: '/home/index',
                name: 'home',
                component: () => import('@/views/home'),
                meta: {
                    title: '首页',
                    icon: 'el-icon-s-home',
                    roles: ['admin', 'user']
                }
            }
        ]
    },
    
    // {
    //     path: '/menu-one',
    //     component: Layout,
    //     redirect: '/menu-one/menu-one-children',
    //     meta: {
    //         title: '菜单一',
    //         icon: 'el-icon-s-operation',
    //     },
    //     children: [
    //         {
    //             path: '/menu-one/menu-one-children',
    //             name: 'menu-one-children',
    //             component: () => import('@/views/menu-one/menu-one-children'),
    //             meta: {
    //                 title: '子菜单一',
    //                 icon: 'el-icon-operation',
    //                 roles: ['admin']
    //             }
    //         },
    //         {
    //             path: '/menu-one/menu-one-children-two',
    //             name: 'menu-one-children-two',
    //             component: () => import('@/views/menu-one/menu-one-children-two'),
    //             meta: {
    //                 title: '子菜单二',
    //                 icon: 'el-icon-operation',
    //                 roles: ['admin']
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/menu-two',
    //     component: Layout,
    //     redirect: '/menu-two/menu-two-children',
    //     meta: {
    //         title: '菜单二',
    //         icon: 'el-icon-connection',
    //     },
    //     children: [
    //         {
    //             path: '/menu-two/menu-two-children',
    //             name: 'menu-two-children',
    //             component: () => import('@/views/menu-two/menu-two-children'),
    //             meta: {
    //                 title: '子菜单一',
    //                 icon: 'el-icon-connection',
    //                 roles: ['admin']
    //             }
    //         },
    //         {
    //             path: '/menu-two/menu-two-children-two',
    //             name: 'menu-two-children-two',
    //             component: () => import('@/views/menu-two/menu-two-children-two'),
    //             meta: {
    //                 title: '子菜单二',
    //                 icon: 'el-icon-connection',
    //                 roles: ['admin']
    //             }
    //         },
    //     ]
    // },
    // {
    //     path: '/menu-three',
    //     component: Layout,
    //     redirect: '/menu-three/menu-three-children',
    //     meta: {
    //         title: '菜单三',
    //         icon: 'el-icon-connection',
    //     },
    //     children: [
    //         {
    //             path: '/menu-three/menu-three-children',
    //             name: 'menu-three-children',
    //             component: () => import('@/views/menu-three/menu-three-children'),
    //             meta: {
    //                 title: '子菜单一',
    //                 icon: 'el-icon-connection',
    //                 roles: ['admin']
    //             }
    //         },
    //         {
    //             path: '/menu-three/menu-three-children-two',
    //             name: 'menu-three-children-two',
    //             component: () => import('@/views/menu-three/menu-three-children-two'),
    //             meta: {
    //                 title: '子菜单二',
    //                 icon: 'el-icon-connection',
    //                 roles: ['admin']
    //             },
    //             children: [
    //                 {
    //                     path: '/menu-three/menu-three-children-other',
    //                     name: 'menu-three-children-other',
    //                     component: () => import('@/views/menu-three/menu-three-children-other'),
    //                     meta: {
    //                         title: '三级菜单一',
    //                         icon: 'el-icon-connection',
    //                         roles: ['admin']
    //                     },
    //                 },
    //                 {
    //                     path: '/menu-three/menu-three-children-other2',
    //                     name: 'menu-three-children-other2',
    //                     component: () => import('@/views/menu-three/menu-three-children-other2'),
    //                     meta: {
    //                         title: '三级菜单二',
    //                         icon: 'el-icon-connection',
    //                         roles: ['admin']
    //                     },
    //                 }
    //             ]
    //         },
    //     ]
    // },
    // {
    //     path: '/other',
    //     component: Layout,
    //     redirect: '/other/index',
    //     children: [
    //         {
    //             path: '/other/index',
    //             name: 'other',
    //             component: () => import('@/views/other'),
    //             meta: {
    //                 title: '其他',
    //                 icon: 'el-icon-eleme',
    //                 roles: ['admin', 'user']
    //             }
    //         }
    //     ]
    // },
    {
        path: '/admin/staff',
        component: Layout,
        children: [
            {
                path: '/admin/staff',
                name: 'admin_staff',
                component: () => import('@/views/admin/Staff'),
                meta: {
                    title: '人员管理',
                    icon: 'el-icon-eleme',
                    roles: ['admin']
                }
            }
        ]
    },
    {
        path: '/admin/policy',
        component: Layout,
        children: [
            {
                path: '/admin/policy',
                name: 'admin_policy',
                component: () => import('@/views/admin/Policy'),
                meta: {
                    title: '政策文件管理',
                    icon: 'el-icon-eleme',
                    roles: ['admin']
                }
            }
        ]
    },
    {
        path: '/admin/metting',
        component: Layout,
        children: [
            {
                path: '/admin/metting',
                name: 'admin_meeting',
                component: () => import('@/views/admin/Meeting'),
                meta: {
                    title: '会议管理',
                    icon: 'el-icon-eleme',
                    roles: ['admin']
                }
            }
        ]
    },
    {
        path: '/user/meeting',
        component: Layout,
        children: [
            {
                path: '/user/meeting',
                name: 'meeting',
                component: () => import('@/views/user/Meeting'),
                meta: {
                    title: '会议资料提交',
                    icon: 'el-icon-eleme',
                    roles: ['user']
                }
            }
        ]
    },
    {
        path: '/user/policy',
        component: Layout,
        children: [
            {
                path: '/user/policy',
                name: 'policy',
                component: () => import('@/views/user/Policy'),
                meta: {
                    title: '查看政策',
                    icon: 'el-icon-eleme',
                    roles: ['user']
                }
            }
        ]
    },
    // 以下是重复性内容
    {
        path: '/user/final',
        component: Layout,
        children: [
            {
                path: '/user/final',
                name: 'final',
                component: () => import('@/views/user/Final'),
                meta: {
                    title: '期末教学文件提交',
                    icon: 'el-icon-eleme',
                    roles: ['user']
                }
            }
        ]
    },
    {
        path: '/admin/final',
        component: Layout,
        children: [
            {
                path: '/admin/final',
                name: 'admin_final',
                component: () => import('@/views/admin/Final'),
                meta: {
                    title: '期末教学文件管理',
                    icon: 'el-icon-eleme',
                    roles: ['admin']
                }
            }
        ]
    },
    {
        path: '/user/endreport',
        component: Layout,
        children: [
            {
                path: '/user/endreport',
                name: 'endreport',
                component: () => import('@/views/user/Endreport'),
                meta: {
                    title: '年终工作报告提交',
                    icon: 'el-icon-eleme',
                    roles: ['user']
                }
            }
        ]
    },
    {
        path: '/admin/endreport',
        component: Layout,
        children: [
            {
                path: '/admin/endreport',
                name: 'admin_endreport',
                component: () => import('@/views/admin/Endreport'),
                meta: {
                    title: '年终工作报告管理',
                    icon: 'el-icon-eleme',
                    roles: ['admin']
                }
            }
        ]
    },
    {
        path: '/admin/notice',
        component: Layout,
        children: [
            {
                path: '/admin/notice',
                name: 'admin_notice',
                component: () => import('@/views/admin/Notice'),
                meta: {
                    title: '通知公告管理',
                    icon: 'el-icon-eleme',
                    roles: ['admin']
                }
            }
        ]
    },
    {
        path: '/user/notice',
        component: Layout,
        children: [
            {
                path: '/user/notice',
                name: 'notice',
                component: () => import('@/views/user/Notice'),
                meta: {
                    title: '通知公告',
                    icon: 'el-icon-eleme',
                    roles: ['user']
                }
            }
        ]
    },
    {
        path: '/admin/check',
        component: Layout,
        children: [
            {
                path: '/admin/check',
                name: 'admin_check',
                component: () => import('@/views/admin/Check'),
                meta: {
                    title: '教学检查管理',
                    icon: 'el-icon-eleme',
                    roles: ['admin']
                }
            }
        ]
    },
    {
        path: '/user/check',
        component: Layout,
        children: [
            {
                path: '/user/check',
                name: 'check',
                component: () => import('@/views/user/Check'),
                meta: {
                    title: '教学检查',
                    icon: 'el-icon-eleme',
                    roles: ['user']
                }
            }
        ]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

const router = new VueRouter({
    routes: constantRouterMap
})
export default router
