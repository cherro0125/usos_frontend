<template>
  <v-row justify="center">
    <v-dialog v-model="showAddDefinedGroup" persistent max-width="800">
      <v-card class="pa-12">
        <v-card-title class="headline justify-center">Add new group in this course</v-card-title>
        <v-text-field v-model="name" label="Name"></v-text-field>
        <div v-if="emptyName" class="red--text" style="font-size:0.8em">Can not be empty</div>
        <v-textarea
          v-model="description"
          name="input-7-1"
          auto-grow
          row-height="5vh"
          label="Description"
        ></v-textarea>
        <v-card-actions class="justify-center">
          <v-btn text @click="$emit('update:showAddDefinedGroup', false)">Cancel</v-btn>
          <v-btn text @click="addDefinedGroup">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      description: "",
      emptyName: false
    };
  },
  props: ["showAddDefinedGroup"],
  methods: {
    addDefinedGroup() {
      if (this.name == "") {
        this.emptyName = true;
      } else {
        this.emptyName = false;
      }
      if (!this.emptyName) {
        const data = {
          name: this.name,
          description: this.description
        };
        this.name = "";
        this.description = "";
        this.$emit("addDefinedGroup", data);
        this.$emit("update:showAddDefinedGroup", false);
      }
    }
  }
};
</script>