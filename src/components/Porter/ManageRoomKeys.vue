<template>
    <v-container>
        <h2 class="pl-5">RoomKeys</h2>
        <KeysTable></KeysTable>
    </v-container>
</template>

<script>
    import KeysTable from "./KeysTable/KeysTable";

    export default {
        data() {

            return {};
        },
        components: { KeysTable }
    };
</script>

<style scoped>

</style>