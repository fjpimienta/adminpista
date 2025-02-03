import { Route } from '@angular/router';
import { AdminLayoutComponent } from '@layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@layout/auth-layout/auth-layout.component';
import { AuthGuard } from '@core/guard/auth.guard';
import { Page403Component } from './sessions/page403/page403.component';
import { Page404Component } from './sessions/page404/page404.component';
import { Page500Component } from './sessions/page500/page500.component';

export const APP_ROUTE: Route[] = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      // Admin menu start
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../modules/admin/dashboard/dashboard.routes').then(
            (m) => m.DASHBOARD_ROUTE
          ),
        data: {
          role: ['ADMIN'],
        },
      },
      // Admin menu end
      // employee menu start
      {
        path: 'emp_dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../modules/employee/dashboard/dashboard.routes').then(
            (m) => m.DASHBOARD_ROUTE
          ),
        data: {
          role: ['ADMIN', 'EMPLOYEE'],
        },
      },
      // employee menu end
      {
        path: 'utilities',
        loadChildren: () =>
          import('./utilities/utilities.routes').then((m) => m.UTILITIES_ROUTE),
        data: {
          role: ['ADMIN'],
        },
      },
      {
        path: '403',
        component: Page403Component,
      },
      {
        path: '404',
        component: Page404Component,
      },
      {
        path: '500',
        component: Page500Component,
      },
    ],
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./sessions/sessions.routes').then((m) => m.SESSION_ROUTE),
  },
  { path: '**', redirectTo: '404' },
];
