import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Propertys from './views/Propertys.vue'
import Property from './views/Property.vue'
import PostsManager from './components/PostsManager.vue'
import Auth from '@okta/okta-vue'

Vue.use(Router)

Vue.use(Auth, {
  issuer: 'https://dev-309369.okta.com/oauth2/default',
  client_id: '0oau2byf7m9CuumrC356',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/yaTuLLave',
      component:Home
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/posts-manager',
      name: 'PostsManager',
      component: PostsManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Propertys',
      name: 'Propertys',
      component: Propertys,
      props:true
    },
    {
      path: '/Propertys/:id',
      name: 'Property',
      component: Property,
      props:true
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router