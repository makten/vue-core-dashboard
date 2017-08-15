import { AUTH0_CONFIG } from './auth.variable';
import { Prop, Component } from 'vue-property-decorator';
import auth0 from 'auth0-js';
import Vue from 'vue';
import * as globals from '.././globals';



export default class AuthService extends Vue {

    authenticated: any = this.isAuthenticated()
    authNotifier: any = globals.eventBroadcaster;
    userProfile: any = {};


    auth0: any = new auth0.WebAuth({
        domain: AUTH0_CONFIG.domain,
        clientID: AUTH0_CONFIG.clientID,
        redirectUri: AUTH0_CONFIG.redirectUri,
        responseType: AUTH0_CONFIG.responseType,
        scope: AUTH0_CONFIG.scope
    });

    constructor() {
        super();      

        this.login = this.login.bind(this);
        this.setSession = this.setSession.bind(this);
        this.logout = this.logout.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }


    login() {

        this.auth0.authorize();

    }

    handleAuthentication() {

        let vm = this;

        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {

                this.auth0.client.userInfo(authResult.accessToken, function (err, user) {

                    localStorage.setItem('profile', JSON.stringify(user))
                                   
                    
                });

                this.setSession(authResult)
                this.authNotifier.$emit('changeRoute', '/vehicle/new')

            } else if (err) {
                console.log(err)
            }
        })
    }


    setSession(authResult) {
        console.log(authResult)

        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
        localStorage.setItem('access_token', authResult.accessToken)
        localStorage.setItem('id_token', authResult.idToken)
        localStorage.setItem('expires_at', expiresAt)

        this.authNotifier.$emit('authChange', { authenticated: true })
        window.location.reload();

    }

    logout() {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
        localStorage.removeItem('profile');
        this.userProfile = null

        // navigate to the home route        
        this.authNotifier.$emit('changeRoute', '/home')
        this.authNotifier.$emit('authChange', false)

        //Temporal solution for page freeze
        window.location.reload();

    }


    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
        return new Date().getTime() < expiresAt
    }
}