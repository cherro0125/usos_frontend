<template>
    <v-btn :text="eventToDo !== 'LOGIN'" @click="logInWithFacebook">{{labelTxt}}</v-btn>
</template>
<script>
import {mapActions,mapGetters} from "vuex";

export default {
    name: "FacebookLogin",
    props: ["labelTxt", "eventToDo"],
    methods: {
        ...mapActions(['linkToFacebook', 'loginUsingFacebook']),
        async logInWithFacebook() {
            await window.FB.login((response) => {
                if (response.authResponse) {

                    let usrId = localStorage.getItem('userId');
                    if (this.eventToDo === 'LINK' && usrId !== undefined) {

                        this.linkToFacebook({
                            facebookUserId: response.authResponse.userID,
                            accessToken: response.authResponse.accessToken,
                            userId: usrId
                        });
                    }


                    if (this.eventToDo === "LOGIN") {
                         this.loginUsingFacebook({
                            facebookUserId: response.authResponse.userID,
                            accessToken: response.authResponse.accessToken
                        }).then(() => {
                             this.$emit("loginHandle");
                         });

                    }


                } else {
                    alert("User cancelled login or did not fully authorize.");
                }
            });
            return false;
        },
        async initFacebook() {
            window.fbAsyncInit = () => {
                window.FB.init({
                    appId: "1102872210113542",
                    cookie: false,
                    version: "v13.0"
                });
            };
        },
        async loadFacebookSDK(d, s, id) {
            let js,
                    fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    },
    computed: mapGetters(["isLoggedIn"]),
    async mounted() {
        await this.loadFacebookSDK(document, "script", "facebook-jssdk");
        await this.initFacebook();
    }
};
</script>
<style>
</style>
