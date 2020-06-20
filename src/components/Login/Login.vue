<template>
    <v-content>
        <v-container>
            <v-row justify="center">
                <v-col cols="8">
                    <v-form @submit.prevent="signin()">
                        <v-card class="signin-card pa-8">
                            <v-card-title class="justify-center signin-card-title">
                                <h2>Log in</h2>
                            </v-card-title>
                            <v-card-text>
                                <v-text-field
                                        type="text"
                                        required
                                        v-model="credentials.username"
                                        placeholder="Login"
                                ></v-text-field>
                                <v-text-field
                                        type="password"
                                        required
                                        v-model="credentials.password"
                                        placeholder="Password"
                                ></v-text-field>
                            </v-card-text>
                            <v-card-actions class="justify-center">
                                <v-btn type="submit">Log In</v-btn>
                                <FacebookLogin label-txt="LOGIN BY FACEBOOK"
                                               event-to-do="LOGIN" @loginHandle="loginHandleFunc"/>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import FacebookLogin from "../Facebook/FacebookLogin";

export default {
    data() {
        return {
            credentials: {
                username: "",
                password: ""
            }
        };
    },
    computed: mapGetters(["isLoggedIn"]),
    components: {
        FacebookLogin
    },
    methods: {
        ...mapActions(["login"]),
        loginHandleFunc(){
            if (this.isLoggedIn) {
                this.$notify({
                    group: "foo",
                    type: "success",
                    title: "Login successfull"
                });
                this.$router.push("/news");
            } else {
                this.$notify({
                    group: "foo",
                    type: "error",
                    title: "Login failed"
                });
            }
        },
        async signin() {
            await this.login(this.credentials);
            if (this.isLoggedIn) {
                this.$notify({
                    group: "foo",
                    type: "success",
                    title: "Login successfull"
                });
                this.$router.push("/news");
            } else
                this.$notify({
                    group: "foo",
                    type: "error",
                    title: "Login failed"
                });
        }
    }
};
</script>

<style scoped>
</style>
