import store from '../store'
import createAuth0Client from '@auth0/auth0-spa-js'

let auth0Client

const getAuthClient = async () => {
  if (store.getters['main/authClient']) {
    return store.getters['main/authClient']
  }

  return await createAuth0Client({
    domain: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN,
    client_id: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
    redirect_uri: process.env.VUE_APP_DOMAINURL_REDIRECT
  })
}

export const signIn = async () => {
  store.dispatch('main/setAuthLoadingStatus', true)
  auth0Client = await getAuthClient()
  store.dispatch('main/setAuthClient', auth0Client)

  try {
    await auth0Client.loginWithPopup({})

    const userData = await auth0Client.getUser()
    localStorage.setItem('user', JSON.stringify(userData))
    store.dispatch('main/setUser', userData)
    store.dispatch('main/setUserAuthenticated', await auth0Client.isAuthenticated())
    store.dispatch('main/setAuthLoadingStatus', false)
  } catch (e) {
    console.error(e)
  }
}

export const signOut = async () => {
  return auth0Client.logout()
}

export const authGuard = async function(to, from, next) {
  store.dispatch('main/setAuthLoadingStatus', true)

  auth0Client = await getAuthClient()
  store.dispatch('main/setAuthClient', auth0Client)

  // console.log(await auth0Client.getTokenSilently())

  if (await auth0Client.isAuthenticated()) {
    console.log('User is authenticated')
    const userData = await auth0Client.getUser()
    store.dispatch('main/setUser', userData)
    store.dispatch('main/setAuthLoadingStatus', true)
    store.dispatch('main/setUserAuthenticated', false)
    return next()
  } else {
    console.log('User not authenticated >> redirect to login')
    store.dispatch('main/setUser', null)
    store.dispatch('main/setAuthLoadingStatus', false)
    store.dispatch('main/setUserAuthenticated', false)
    return next('/login')
  }
}
