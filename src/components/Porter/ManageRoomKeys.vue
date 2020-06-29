<template>
    <v-container>
        <h2 class="pl-5">Keys management</h2>
        <v-container>
            <v-form @submit.prevent="showKeysTable()">
                <v-card class="pa-10">
                    <v-select v-model="keyView" :items="keyViews" label="select key view"></v-select>
                    <v-card-actions class="justify-center">
                        <v-btn type="submit" :disabled="!keyView">Show keys table</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-container>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            keyViews: ['all keys', 'all available keys', 'all given keys'],
            keyView: ""
        };
    },
    computed: mapGetters(["courseData"]),
    methods: {
        ...mapActions(["getCourseData"]),
        showKeysTable() {
            const keyViewRoute = this.keyView.replaceAll(' ', '_')
            this.$router.push(`/porter/keys/${keyViewRoute}`);
        }
    }
};
</script>

<style scoped>

</style>
