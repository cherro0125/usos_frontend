<template>
    <div>
        <v-btn @click="logInWithFacebook">Link Facebook to account</v-btn>
    </div>
</template>
<script>
export default {
    name:"FacebookLogin",
    methods: {
        async logInWithFacebook() {
            window.FB.login(function(response) {
                if (response.authResponse) {
                    console.log(response);
                    //Send request to endpoint with access_token and user id
                } else {
                    alert("User cancelled login or did not fully authorize.");
                }
            });
            return false;
        },
        async initFacebook() {
            window.fbAsyncInit = function() {
                window.FB.init({
                    appId: "1102872210113542",
                    cookie: false,
                    version: "v13.0"
                });
            };
        },
        async loadFacebookSDK(d, s, id) {
            var js,
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
    async mounted(){
        await this.loadFacebookSDK(document, "script", "facebook-jssdk");
        await this.initFacebook();
    }
};
</script>
<style>
</style>
