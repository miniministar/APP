import router from '@/router';
import useStore from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false }); // 进度环显示/隐藏

// 白名单路由
const whiteList = ['/auth-redirect'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const { user, permission } = useStore();
  let hasToken = user.token;
  // http://10.0.50.10:32200/#/login?redirect=/401
  let uri = encodeURIComponent(`http://10.0.50.10:32201/#/?redirect=${to.path}`);
  const query = to.query;
  if(query && query.token ) {
    hasToken =  <string>query.token;
    user.activeSetToken(hasToken);
    delete query.token;
    delete query.redirect;
  }else if(query && query.logout) {
    uri += "&logout="+query.logout;
  }


  if (hasToken) {
    // 登录成功，跳转到首页
    if (to.path === '/login') {
      window.open(`http://10.0.50.10:32200/#/login?redirect=${uri}`, '_self');
      NProgress.done();
    } else {
      const hasGetUserInfo = user.roles.length > 0;
      if (hasGetUserInfo) {
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name as any }) : next('/401');
        } else {
          next();
        }
      } else {
        try {
          await user.getUserInfo();
          const roles = user.roles;
          const accessRoutes: any = await permission.generateRoutes(roles);
          accessRoutes.forEach((route: any) => {
            router.addRoute(route);
          });
          next({ ...to, replace: true });
        } catch (error) {
          // 移除 token 并跳转登录页
          await user.resetToken();
          window.open(`http://10.0.50.10:32200/#/login?redirect=${uri}`, '_self');
          NProgress.done();
        }
      }
    }
  } else {
    // 未登录可以访问白名单页面(登录页面)
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      window.open(`http://10.0.50.10:32200/#/login?redirect=${uri}`, '_self');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
