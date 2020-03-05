import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../home/home.module').then(m => m.HomePageModule)
          },
          {
            path: 'search-vendor',
            loadChildren: () =>
                import('../search-vendor/search-vendor.module').then(m => m.SearchVendorPageModule)
          },
          {
            path: 'introduction',
            loadChildren: () => import('../introduction/introduction.module').then( m => m.IntroductionPageModule)
          },
          {
            path: 'join-us',
            loadChildren: () => import('../join-us/join-us.module').then( m => m.JoinUsPageModule)
          }
        ]
      },
      {
        path: 'order',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../order/order.module').then(m => m.OrderPageModule)
          }
        ]
      },
      {
        path: 'me',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../me/me.module').then(m => m.MePageModule)
          },
          {
            path: 'setting',
            loadChildren: () => import('../setting/setting.module').then( m => m.SettingPageModule)
          },
          {
            path: 'signup',
            loadChildren: () => import('../signup/signup.module').then( m => m.SignupPageModule)
          },
          {
            path: 'login',
            loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
          },
          {
            path: 'personal-info',
            loadChildren: () => import('../personal-info/personal-info.module').then( m => m.PersonalInfoPageModule)
          },
          {
            path: 'point',
            loadChildren: () => import('../point/point.module').then( m => m.PointPageModule)
          },
          {
            path: 'vendor-center',
            children: [
              {
                path: '',
                loadChildren: () => import('../vendor-center/vendor-center.module').then( m => m.VendorCenterPageModule)
              },
              {
                path: 'vendor-order',
                loadChildren: () => import('../vendor-order/vendor-order.module').then( m => m.VendorOrderPageModule)
              },
              {
                path: 'vendor-service',
                loadChildren: () => import('../vendor-service/vendor-service.module').then( m => m.VendorServicePageModule)
              },
              {
                path: 'vendor-service-add',
                loadChildren: () => import('../vendor-service-add/vendor-service-add.module').then( m => m.VendorServiceAddPageModule)
              },
              {
                path: 'vendor-service-update',
                loadChildren: () => import('../vendor-service-update/vendor-service-update.module')
                    .then( m => m.VendorServiceUpdatePageModule)
              },
              {
                path: 'vendor-privacy',
                loadChildren: () => import('../vendor-privacy/vendor-privacy.module').then( m => m.VendorPrivacyPageModule)
              },
              {
                path: 'vendor-order-detail',
                loadChildren: () => import('../vendor-order-detail/vendor-order-detail.module').then( m => m.VendorOrderDetailPageModule)
              }
            ]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
