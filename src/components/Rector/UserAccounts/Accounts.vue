<template>
  <v-container>
    <h2 class="ml-2 mb-5">User list</h2>
    <v-data-table :headers="headers" :items="users" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat class="pa-2">
          <v-select v-model="roleSelect" class="mr-8 mt-4" label="role" :items="roles"></v-select>
          <v-btn color="primary" dark class="mb-2" to="/rector/accounts/create">Register new user</v-btn>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Edit user data</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.firstName" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.lastName" label="Surname"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.username" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.dateOfBirth" label="date of birth"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.phoneNumber" label="phone number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.city" label="city"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.street" label="street"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.streetNumber" label="street number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.houseNumber" label="house number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.zipCode" label="zip code"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="deleteDialog" max-width="500px">
            <v-card class="pa-6">
              <v-card-title class="justify-center">Are you sure want to delete this user</v-card-title>
              <v-card-actions class="justify-center">
                <v-btn @click="deleteDialog = false">No</v-btn>
                <v-btn @click="confirmDeletion">Yes</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
/* eslint-disable */
export default {
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      headers: [
        { text: "name", value: "firstName", sortable: false },
        { text: "surname", value: "lastName", sortable: false },
        { text: "email", value: "username", sortable: false },
        { text: "role", value: "role", sortable: false },
        { text: "date of birth", value: "dateOfBirth", sortable: false },
        { text: "phone number", value: "phoneNumber", sortable: false },
        { text: "city", value: "city", sortable: false },
        { text: "street", value: "street", sortable: false },
        { text: "street number", value: "streetNumber", sortable: false },
        { text: "house number", value: "houseNumber", sortable: false },
        { text: "zip code", value: "zipCode", sortable: false },
        { text: "actions", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        role: "STUDENT",
        username: "",
        dateOfBirth: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        city: "",
        street: "",
        streetNumber: "",
        houseNumber: "",
        zipCode: ""
      },
      defaultItem: {
        role: "STUDENT",
        username: "",
        dateOfBirth: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        city: "",
        street: "",
        streetNumber: "",
        houseNumber: "",
        zipCode: ""
      },
      roles: ["STUDENT", "DEAN", "LECTURER"],
      roleSelect: "",
      indexToDelete: ''
    };
  },

  computed: {
    ...mapGetters(["users"])
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    async roleSelect() {
      await this.getUsers(this.roleSelect);
    }
  },
  async created() {
    this.roleSelect = "STUDENT";
    await this.getUsers(this.roleSelect);
  },
  methods: {
    ...mapActions(["getUsers", "deleteUser"]),
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.indexToDelete = this.users.indexOf(item);
      this.deleteDialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    async confirmDeletion() {
      const id = this.users[this.indexToDelete].id;
      await this.deleteUser(id);
      await this.getUsers(this.roleSelect);
      this.deleteDialog = false;
    }
  }
};
</script>

<style scoped>
</style>