var Task = {
  // props from parent
  props: ['task'],
  // component data MUST be function
  data: function() {
    return {
      item: Object.assign({}, this.task)
    }
  },
  watch: {
    item: {
      handler: function(val) {
        this.$emit('change', val);
      },
      deep: true
    }
  },

  // template
  template: `
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title class="font-weight-bold title">{{ item.title }}</v-list-tile-title>
        <v-list-tile-sub-title class="text--primary hidden-xs-only">{{ item.detail }}</v-list-tile-sub-title>
        <v-list-tile-sub-title class="red--text text--lighten-2">{{ item.due }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <span>Completed</span><v-checkbox v-model="item.status"></v-checkbox>
      </v-list-tile-action>
    </v-list-tile>
    `
};

// component js code
Vue.component(
  // component tag name
  'Tasks', 
  
  // component object code start
  // may register under different tag name
  {
    components: {
      'Task': Task
    },
  
    // props from parent
    props: ['tasks'],
    
    // component data MUST be function
    data() {
      return {
        keyword: "",
        // items: this.tasks,
        items: this.tasks
      }
    },

    computed: {
      filteredList() {
        if (this.keyword) {
           var f = this.items.filter(
            task => task.title.search(this.keyword) >= 0
          );
          return f;
        } else {
          return this.items;
        }
      }
    },
    
    // template
    template: `
    <v-card>
      <v-toolbar card prominent>
        <v-toolbar-title class="grey--text">Tasks</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-flex xs8>
          <v-text-field hide-details append-icon="search" single-line clearable v-model="keyword"></v-text-field>
        </v-flex>
      </v-toolbar>
      <v-list two-line>
        <template v-for="(task, index) in filteredList">
          <Task :task="task" :key="task.title" @change="$emit('change', $event)"></Task>
          <v-divider v-if="index + 1 < filteredList.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-card>
    `
  }
)