<template>
    <v-container>
        <v-data-table
                hide-default-footer
                :dark="$vuetify.theme.dark"
                :headers="headers"
                :items="rooms"
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
        computed: mapGetters(['roomNumbers']),
        async created() {
            await this.getRoomNumbers(localStorage.getItem("userId"));
        },
        methods: {
            ...mapActions(["getRoomNumbers"])
        }
    };
    // export default {
    //     name: "KeysTable.vue"
    // }
</script>

<style scoped>

</style>