<template>
  <v-container>
    <h2 class="ml-2 mb-5">Group manager</h2>

    <v-expansion-panels accordion v-model="panelIndex">
      <v-toolbar flat class="pa-2">
        Degree Courses
        <v-spacer></v-spacer>
        <v-btn color="primary mr-5" dark @click.stop="showAddDegreeCourse = true">Add course</v-btn>
      </v-toolbar>
      <v-expansion-panel :disabled="true">
        <v-expansion-panel-header>
          <v-col cols="1">delete</v-col>
          <v-col cols="3">name</v-col>
          <v-col cols="2">fulltime</v-col>
          <v-col cols="2">number of semesters</v-col>
          <v-col cols="2">type</v-col>
        </v-expansion-panel-header>
      </v-expansion-panel>
      <v-expansion-panel v-for="(item,i) in degreeCourses" :key="i">
        <v-expansion-panel-header>
          <v-col cols="1"><v-btn icon color="red" @click.native.stop @click="deleteDegreeCourseRequest(item.id)"><v-icon>mdi-delete</v-icon></v-btn></v-col>
          <v-col cols="3">{{item.name}}</v-col>
          <v-col cols="2">{{item.isFullTimeStudies}}</v-col>
          <v-col cols="2">{{item.numberOfSemesters}}</v-col>
          <v-col cols="2">{{item.finalDegreeType}}</v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class="mb-5"><b>Description:</b> {{item.description}}</p>

          <template>
            <v-expansion-panels accordion v-model="groupIndex">
              <v-toolbar flat class="pa-2">
                Defined groups
                <v-spacer></v-spacer>
                <v-btn
                  color="primary mr-5"
                  dark
                  @click.stop="showAddDefinedGroup = true"
                >Add group in this course</v-btn>
              </v-toolbar>
              <v-expansion-panel :disabled="true">
                <v-expansion-panel-header>
                  <v-col cols="1">delete</v-col>
                  <v-col cols="3">name</v-col>
                  <v-col cols="2">description</v-col>
                </v-expansion-panel-header>
              </v-expansion-panel>
              <v-expansion-panel v-for="(item2,j) in definedGroups" :key="j">
                <v-expansion-panel-header>
                  <v-col cols="1"><v-btn icon color="red" @click.native.stop @click="deleteDefinedGroupRequest(item2.id)"><v-icon>mdi-delete</v-icon></v-btn></v-col>
                  <v-col cols="3">{{item2.name}}</v-col>
                  <v-col cols="2">{{item2.description}}</v-col>
                  
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <template>
                    <v-expansion-panels accordion>
                      <v-toolbar flat class="pa-2">
                        Assigned students
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary mr-5"
                          dark
                          @click.stop="showAddStudentToGroup = true"
                        >Assign students</v-btn>
                      </v-toolbar>
                      <v-expansion-panel :disabled="true">
                        <v-expansion-panel-header>
                          <v-col cols="1">remove</v-col>
                          <v-col cols="3">username</v-col>
                          <v-col cols="3">first name</v-col>
                          <v-col cols="3">last name</v-col>
                        </v-expansion-panel-header>
                      </v-expansion-panel>
                      <v-expansion-panel
                        v-for="(item3,k) in item2.students"
                        :key="k"
                        :readonly="true"
                      >
                        <v-expansion-panel-header :hide-actions="true">
                          <v-col cols="1"><v-btn icon color="red" @click.native.stop @click="removeStudentFromGroupRequest(item3.id)"><v-icon>mdi-delete</v-icon></v-btn></v-col>
                          <v-col cols="3">{{item3.username}}</v-col>
                          <v-col cols="3">{{item3.firstName}}</v-col>
                          <v-col cols="3">{{item3.lastName}}</v-col>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content></v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </template>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <AddDegreeCourse
      :showAddDegreeCourse.sync="showAddDegreeCourse"
      @addDegreeCourse="addDegreeCourse"
    ></AddDegreeCourse>
    <AddDefinedGroup
      :showAddDefinedGroup.sync="showAddDefinedGroup"
      @addDefinedGroup="addDefinedGroup"
    ></AddDefinedGroup>
    <AddStudentToGroup
      :showAddStudentToGroup.sync="showAddStudentToGroup"
      @addStudentToGroup="addStudentToGroup"
    ></AddStudentToGroup>
    <DeleteDegreeCourse
      :showDeleteDegreeCourse.sync="showDeleteDegreeCourse"
      @deleteDegreeCourse="deleteDegreeCourse"
    ></DeleteDegreeCourse>
    <DeleteDefinedGroup
      :showDeleteDefinedGroup.sync="showDeleteDefinedGroup"
      @deleteDefinedGroup="deleteDefinedGroup"
    ></DeleteDefinedGroup>
    <DeleteStudentFromGroup
      :showRemoveStudentFromGroup.sync="showRemoveStudentFromGroup"
      @removeStudentFromGroup="removeStudentFromGroup"
    ></DeleteStudentFromGroup>
  </v-container>
</template>

<script>
import AddDegreeCourse from "./AddDialogs/AddDegreeCourse";
import AddDefinedGroup from "./AddDialogs/AddDefinedGroup";
import AddStudentToGroup from "./AddDialogs/AddStudentToGroup";
import DeleteDegreeCourse from "./DeleteDialogs/DeleteDegreeCourse";
import DeleteDefinedGroup from "./DeleteDialogs/DeleteDefinedGroup";
import DeleteStudentFromGroup from "./DeleteDialogs/DeleteStudentFromGroup";
import { mapGetters, mapActions } from "vuex";
/* eslint-disable */
export default {
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      panelIndex: -1,
      groupIndex: -1,
      showAddDegreeCourse: false,
      showAddDefinedGroup: false,
      showAddStudentToGroup: false,
      showDeleteDegreeCourse: false,
      showDeleteDefinedGroup: false,
      showRemoveStudentFromGroup: false,
      courseToDelete: "",
      groupToDelete: "",
      studentToDelete: ""
    };
  },
  components: {
    AddDegreeCourse,
    AddDefinedGroup,
    AddStudentToGroup,
    DeleteDegreeCourse,
    DeleteDefinedGroup,
    DeleteStudentFromGroup
  },
  computed: {
    ...mapGetters(["degreeCourses", "definedGroups"])
  },
  async created() {
    await this.getDegreeCourses();
  },
  methods: {
    ...mapActions([
      "getDegreeCourses",
      "getDefinedGroups",
      "clearDefinedGroups",
      "addDegreeCourses",
      "addDefinedGroups",
      "addStudentsToGroup",
      "deleteDegreeCourses",
      "deleteGroups",
      "removeStudentsFromGroups"
    ]),
    async addDegreeCourse(data) {
      await this.addDegreeCourses(data);
    },
    async addDefinedGroup(data) {
      data.degreeCourseId = this.degreeCourses[this.panelIndex - 1].id;
      await this.addDefinedGroups(data);
    },
    async addStudentToGroup(data) {
      data.degreeCourseId = this.degreeCourses[this.panelIndex - 1].id;
      data.definedGroupId = this.definedGroups[this.groupIndex - 1].id;
      await this.addStudentsToGroup(data);
    },
    deleteDegreeCourseRequest(id){
      this.courseToDelete=id;
      this.showDeleteDegreeCourse=true;
    },
    deleteDefinedGroupRequest(id){
      this.groupToDelete=id;
      this.showDeleteDefinedGroup=true;
    },
    removeStudentFromGroupRequest(id){
      this.studentToDelete=id;
      this.showRemoveStudentFromGroup=true;
    },
    async deleteDegreeCourse(){
      await this.deleteDegreeCourses(this.courseToDelete);
    },
    async deleteDefinedGroup() {
      const data={
        id:this.groupToDelete,
        refreshDegreeCourseId:this.degreeCourses[this.panelIndex - 1].id
      };
      await this.deleteGroups(data);
    },
    async removeStudentFromGroup(){
      const data={
        id:this.studentToDelete,
        definedGroupId:this.definedGroups[this.groupIndex - 1].id,
        degreeCourseId:this.degreeCourses[this.panelIndex - 1].id
      }
      await this.removeStudentsFromGroups(data);
    }
  },
  watch: {
    panelIndex: function() {
      if (this.panelIndex != undefined) {
        this.clearDefinedGroups();
        this.getDefinedGroups(this.degreeCourses[this.panelIndex - 1].id);
      }
    },
    groupIndex: function() {
      if (this.groupIndex != undefined) {
        //this.getDefinedGroups(this.degreeCourses[this.groupIndex - 1].id);
      }
    }
  }
};
</script>