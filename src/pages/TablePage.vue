<template>
  <div>
    <h2 class="py-10">Daily Active User (Table)</h2>
    <v-data-table
      dense
      :headers="headers"
      :items="tableData.items"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'TablePage',
  data() {
    return {
      tableData: {},
      headers: [
        {
          text: 'Date',
          align: 'start',
          value: 'date',
        },
        { text: 'Period', value: 'period' },
        { text: 'Country', value: 'country' },
        { text: 'Count', value: 'count' },
      ],
    }
  },
  async mounted() {
    const response = await axios.get('https://9e34429a-eba3-4e56-85f2-685706a08897.mock.pstmn.io/report/dau?dashboardUserId=abc123&periodFrom=1669852800&periodTo=1674063742&aggregateBy%5B0%5D=month&aggregateBy%5B1%5D=country',{
                        headers: {
                          'Content-Type': 'application/json; charset=utf-8'
                        }
                      });
    this.tableData = JSON.parse(JSON.stringify(response.data));
  }
}
</script>
