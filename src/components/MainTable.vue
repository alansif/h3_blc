<template>
  <v-data-table
    :headers="headers"
    :items="orders"
    class="elevation-1"
    :pagination.sync="pg"
  >
    <template v-slot:items="props">
      <td>{{ props.item.PatientID }}</td>
      <td class="text-xs-left">{{ props.item.XM1 }}</td>
      <td class="text-xs-left">{{ props.item.XB1 }}</td>
      <td class="text-xs-left">{{ props.item.NL1 }}</td>
      <td class="text-xs-left">{{ props.item.YSXM }}</td>
      <td class="text-xs-left">{{ props.item.BGTXT }}</td>
      <td class="text-xs-left">{{ props.item.ZDJL }}</td>
      <td class="text-xs-center">
        <v-icon @click="gen(props.item.DJH1, props.item.PatientID)">edit</v-icon>
      </td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    props: {
      orders:{
        type: Array,
        default: []
      }
    },
    methods: {
      gen(n, pid) {
        this.$emit('generate', n, pid);
      }
    },
    data () {
      return {
        pg: {
          rowsPerPage: 10
        },
        headers: [
          { text: '登记号', value: 'PatientID', width: '40' },
          { text: '姓名', value: 'XM1', width: '40' },
          { text: '性别', value: 'XB1', width: '20' },
          { text: '年龄', value: 'NL1', width: '20' },
          { text: '医生', value: 'YSXM', width: '40' },
          { text: '检查描述', value: 'BGTXT' },
          { text: '诊断结论', value: 'ZDJL', width: '180' },
          { text: '生成', value: 'PatientID', width: '40', sortable: false }
        ]
      }
    }
  }
</script>