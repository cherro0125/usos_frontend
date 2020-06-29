<template>
    <v-container>
        <h2 class="pl-5">{{keyView.charAt(0).toUpperCase() + keyView.slice(1)}}</h2>
        <div v-if="keyView === keyViews[0]">
            <v-data-table
                    hide-default-footer
                    :dark="$vuetify.theme.dark"
                    :headers="headersAllKeys"
                    :items="roomKeys"
                    class="elevation-1"
            >
                <template v-slot:item.owner="{ item }">
                    <span>{{item.owner != null ? item.owner.username : ""}}</span>
                </template>
            </v-data-table>
        </div>
        <div v-if="keyView === keyViews[1]">
            <template>
                <v-data-table
                        hide-default-footer
                        :dark="$vuetify.theme.dark"
                        :headers="headersTakeKeys"
                        :items="roomKeys"
                        class="elevation-1"
                        show-select
                        :single-select="singleSelect"
                        v-model="selectedKeys"
                        item-key="roomNumber"
                >
                    <template v-slot:top>
                        <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
                    </template>
                </v-data-table>
                <v-card class="pa-10">
                    <v-select v-if="selectedKeys.length !== 0"
                              v-model="userToGetKeys"
                              :options="allUsers"
                              :items="allUsers"
                              label="select user to receive keys"
                              item-text="username"
                              item-value="id"
                    />
                </v-card>
                <v-form @submit.prevent="getKeys()">
                    <v-card-actions class="justify-center">
                        <v-btn type="submit" :disabled="!selectedKeys || !userToGetKeys">Get keys</v-btn>
                    </v-card-actions>
                </v-form>
            </template>
        </div>
        <div v-if="keyView === keyViews[2]">
            <template>
                <v-data-table
                        hide-default-footer
                        :dark="$vuetify.theme.dark"
                        :headers="headersReturnKeys"
                        :items="roomKeys"
                        class="elevation-1"
                        show-select
                        :single-select="singleSelect"
                        v-model="selectedKeys"
                        item-key="roomNumber"
                >
                    <template v-slot:item.owner="{ item }">
                        <span>{{item.owner != null ? item.owner.username : ""}}</span>
                    </template>
                    <template v-slot:top>
                        <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
                    </template>
                </v-data-table>
                <v-form @submit.prevent="returnBackKeys()">
                    <v-card-actions class="justify-center">
                        <v-btn type="submit" :disabled="!selectedKeys">Return keys</v-btn>
                    </v-card-actions>
                </v-form>
            </template>
        </div>
    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    export default {
        data() {
            return {
                keyView: this.$route.params.keyView.replaceAll('_', ' '),
                keyViews: ['all keys', 'all available keys', 'all given keys'],
                headersAllKeys: [
                    {text: "room number", value: "roomNumber"},
                    {text: "owner", value: "owner"},
                ],
                headersTakeKeys: [
                    {text: "room number", value: "roomNumber"}
                ],
                headersReturnKeys: [
                    {text: "room number", value: "roomNumber"},
                    {text: "owner", value: "owner"}
                ],
                singleSelect: false,
                selectedKeys: [],
                userToGetKeys: ""
            };
        },
        computed: mapGetters(['roomKeys', 'allUsers']),
        async created() {
            let keyView = this.$route.params.keyView.replaceAll('_', ' ')
            let keyViews = ['all keys', 'all available keys', 'all given keys']

            if (keyView === keyViews[0]) {
                await this.getAllKeys();
            } else if (keyView === keyViews[1]) {
                await this.getAllAvailableKeys();
                await this.getAllUsers();
            } else if (keyView === keyViews[2]) {
                await this.getAllGivenKeys();
            }
        },
        methods: {
            ...mapActions(["getAllKeys", "getAllAvailableKeys", "getAllGivenKeys", "getAllUsers", "giveKeys", "returnKeys", "emptyRoomKeys"]),
            getKeys() {
                let dto = {
                    userId: "",
                    roomNumbers: []
                }

                let roomNumbers = this.selectedKeys.map(key => key['roomNumber']);

                dto.userId = this.userToGetKeys;
                dto.roomNumbers = roomNumbers

                console.log(dto)

                this.giveKeys(dto);

                this.emptyRoomKeys() // should clear data in table

                const keyViewRoute = this.keyViews[2].replaceAll(' ', '_')
                console.log(keyViewRoute)
                this.$router.push(`/porter/keys/${keyViewRoute}`);
            },
            returnBackKeys() {
                let dto = {
                    roomNumbers: []
                }

                dto.roomNumbers = this.selectedKeys.map(key => key['roomNumber']);

                console.log(dto)

                this.returnKeys(dto);

                this.emptyRoomKeys() // should clear data in table

                const keyViewRoute = this.keyViews[0].replaceAll(' ', '_')
                console.log(keyViewRoute)
                this.$router.push(`/porter/keys/${keyViewRoute}`);
            }
        }
    };
</script>

<style scoped>

</style>
