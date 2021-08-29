import store from '../store';
import createAuth0Client from '@auth0/auth0-spa-js';


let auth0Client;


export const signIn = async () => {

    store.dispatch('setAuthLoadingStatus', true);
    
    try {
        await auth0Client.loginWithPopup({});

        let userData = await auth0Client.getUser();
        localStorage.setItem('user', JSON.stringify(userData));
        store.dispatch('setUser', userData);
        store.dispatch('setUserAuthenticated', await auth0Client.isAuthenticated());
        store.dispatch('setAuthLoadingStatus', false);
        
    } catch(e) {
        console.error(e);
    }
}

export const signOut = async () => {
    return auth0Client.logout();
}


export const authGuard = async function(to, from, next) {
    
    store.dispatch('setAuthLoadingStatus', true);
    auth0Client = await createAuth0Client({
        domain: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN,
        client_id: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
        redirect_uri: process.env.VUE_APP_DOMAINURL_REDIRECT,
    });
    
    if(await auth0Client.isAuthenticated()) {

        console.log("User is authenticated");
        let userData = await auth0Client.getUser();
        store.dispatch('setUser', userData);
        store.dispatch('setUserAuthenticated', true);
        store.dispatch('setAuthLoadingStatus', false);
        return next();
    } else {
        console.log("User not authenticated >> redirect to login");
        store.dispatch('setUser', null);
        store.dispatch('setUserAuthenticated', false);
        store.dispatch('setAuthLoadingStatus', false);
        return next("/login");
    }

}