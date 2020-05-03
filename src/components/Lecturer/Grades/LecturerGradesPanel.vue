<template>
    <v-container>
        <v-form @submit.prevent="showGradesTable()">
            <v-card class="pa-10">
                <v-select label="select subject"></v-select>
                <v-select label="select group"></v-select>
                <v-card-actions class="justify-center">
                    <v-btn type="submit">Show grades table</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        showGradesTable() {
            this.$router.push("/lecturer/grades/subject/group");
        }
    }
}
</script>

<style scoped>

</style>