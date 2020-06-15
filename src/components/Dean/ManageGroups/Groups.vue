<template>
  <v-container>
    <h2 class="ml-2 mb-5">Group manager</h2>
    <v-expansion-panels accordion v-model="panelIndex">
      <v-toolbar flat class="pa-2" >
        Degree Courses
      </v-toolbar>
      <v-expansion-panel :disabled="true">
          <v-expansion-panel-header>
            <v-col cols="3">
              name
            </v-col>
            <v-col cols="2">
              fulltime
            </v-col>
            <v-col cols="2">
              number of semesters
            </v-col>
            <v-col cols="2">
              type
            </v-col>
          </v-expansion-panel-header>
        </v-expansion-panel>
        <v-expansion-panel
          v-for="(item,i) in degreeCourses"
          :key="i"
        >
          <v-expansion-panel-header>
            <v-col cols="3">
              {{item.name}}
            </v-col>
            <v-col cols="2">
              {{item.isFullTimeStudies}}
            </v-col>
            <v-col cols="2">
              {{item.numberOfSemesters}}
            </v-col>
            <v-col cols="2">
              {{item.finalDegreeType}}
            </v-col>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p class="mb-5">{{item.description}}</p>
            
            <template>
            <v-expansion-panels accordion >
                  <v-toolbar flat class="pa-2" >
                    Defined groups
                  </v-toolbar>
                  <v-expansion-panel :disabled="true">
                      <v-expansion-panel-header>
                        <v-col cols="3">
                          name
                        </v-col>
                        <v-col cols="2">
                          description
                        </v-col>
                      </v-expansion-panel-header>
                    </v-expansion-panel>
                    <v-expansion-panel
                      v-for="(item2,j) in definedGroups"
                      :key="j"
                    >
                      <v-expansion-panel-header>
                        <v-col cols="3">
                          {{item2.name}}
                        </v-col>
                        <v-col cols="2">
                          {{item2.description}}
                        </v-col>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        

<template>
            <v-expansion-panels accordion >
                  <v-toolbar flat class="pa-2" >
                    Assigned students
                  </v-toolbar>
                  <v-expansion-panel :disabled="true">
                      <v-expansion-panel-header>
                        <v-col cols="3">
                          username
                        </v-col>
                        <v-col cols="3">
                          first name
                        </v-col>
                        <v-col cols="3">
                          last name
                        </v-col>
                      </v-expansion-panel-header>
                    </v-expansion-panel>
                    <v-expansion-panel
                      v-for="(item3,k) in item2.students"
                      :key="k"
                    >
                      <v-expansion-panel-header>
                        <v-col cols="3">
                          {{item3.username}}
                        </v-col>
                        <v-col cols="3">
                          {{item3.firstName}}
                        </v-col>
                        <v-col cols="3">
                          {{item3.lastName}}
                        </v-col>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        
                      </v-expansion-panel-content>
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
      panelIndex: -1
    };
  },

  computed: {
    ...mapGetters(["degreeCourses","definedGroups"])
  },
  async created() {
    await this.getDegreeCourses();
  },
  methods: {
    ...mapActions(["getDegreeCourses","getDefinedGroups"])
  },
  watch: {
    panelIndex: function() {
      if(this.panelIndex!=undefined){
        //console.log("watch panelIndex id: " + this.degreeCourses[this.panelIndex-1].id) 
        this.getDefinedGroups(this.degreeCourses[this.panelIndex-1].id);
      }
      
    
  }
}
};
</script>