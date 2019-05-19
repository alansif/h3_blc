<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">病理单生成</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div>
        <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="报告日期"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker no-title v-model="date" @input="doquery"></v-date-picker>
        </v-menu>
      </div>

    </v-toolbar>
    <v-content>
      <MainTable :orders="orders" @generate="make"/>
    </v-content>
  </v-app>
</template>

<script>
import MainTable from './components/MainTable'
import {restbase,reserr} from './restapi.js'
import fileDownload from 'js-file-download'

export default {
  name: 'App',
  components: {
    MainTable
  },
  data () {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      orders:[]
    }
  },
  methods: {
      doquery() {
        this.menu2 = false;
        this.$axios.get(restbase() + 'query',{params:{
                date: this.date
            }})
            .then(response => {
                const d = response.data;
                this.orders = d;
            })
            .catch(error => {
                if (error) {
                    this.$message.error(reserr(error));
                }
            });
      },
      make(n) {
        this.$axios.post(restbase() + `pathology/${n}/make`, {}, {responseType:'blob'})
            .then(response => {
                fileDownload(response.data, n + ".docx");
            })
            .catch(error => {
                if (error) {
                    console.dir(error);
                }
            });
      }
  }
}
</script>
