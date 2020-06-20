<template>
    <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
            <template v-slot:activator="{ on }">
                <v-btn color="indigo" dark v-on="on">
                    <span class="mr-2">Settings</span>
                    <v-icon>settings</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-list>
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-avatar color="indigo">
                                <v-icon dark>mdi-account-circle</v-icon>
                            </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{username}}</v-list-item-title>
                            <v-list-item-subtitle>{{role}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-list>
                    <v-list-item>
                        <v-list-item-action>
                            <v-switch v-model="theme" color="purple"></v-switch>
                        </v-list-item-action>
                        <v-list-item-title>Dark theme: {{theme ? 'on' : 'off'}}</v-list-item-title>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text @click="onCancel">Cancel</v-btn>
                    <v-btn color="primary" text @click="onSave">Save</v-btn>
                    <FacebookLogin v-show="!isFacebookAccountLinked" label-txt="LINK FACEBOOK ACCOUNT" event-to-do="LINK"/>
                   <v-btn text v-show="isFacebookAccountLinked" @click="onUnlink">UNLINK FACEBOOK ACCOUNT</v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
import FacebookLogin from "../Facebook/FacebookLogin";
import { mapGetters,mapActions } from "vuex";
export default {
    data() {
        return {
            theme: this.$vuetify.theme.dark,
            role: '',
            username: ''
        };
    },
    props: ["dropdownMenu"],
    components:{
        FacebookLogin
    },
    computed: {
        ...mapGetters(["isFacebookAccountLinked"]),
        menu: {
            get() {
                return this.dropdownMenu;
            },
            set(newValue) {
                this.$emit("update:dropdownMenu", newValue);
            }
        }
    },
    methods: {
        ...mapActions(['unlinkFromFacebook']),
        onSave() {
            this.menu = !this.menu;
            this.$vuetify.theme.dark = this.theme;
        },
        onCancel() {
            this.menu = !this.menu;
            this.theme = this.$vuetify.theme.dark;
        },
        onUnlink(){
            let userId = localStorage.getItem("userId");
            if(userId !== undefined){
                this.unlinkFromFacebook(userId);
            }
        }
    },
    watch: {
        menu() {
            if (!this.menu) this.theme = this.$vuetify.theme.dark;
        }
    },
    created() {
        this.role = localStorage.getItem("role");
        this.username = localStorage.getItem("username");
    }
};
</script>

<style scoped>
</style>
