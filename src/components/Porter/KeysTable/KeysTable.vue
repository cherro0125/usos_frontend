<template>
    <v-container>
        <v-data-table
                hide-default-footer
                :dark="$vuetify.theme.dark"
                :headers="headers"
                :items="roomKeys"
                class="elevation-1"
        ></v-data-table>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        data() {
            return {
                headers: [
                    { text: "roomNumber", value: "roomNumber" },
                    { text: "owner", value: "owner" },
                ]
            };
        },
        computed: mapGetters(['roomKeys']),
        async created() {
            await this.getAllKeys(/*localStorage.getItem("userId")*/);
        },
        methods: {
            ...mapActions(["getAllKeys"])
        }
    };
    // export default {
    //     name: "KeysTable.vue"
    // }
</script>

<style scoped>

</style>
