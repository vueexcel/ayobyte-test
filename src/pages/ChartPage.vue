<template>
  <div>
    <h2 class="py-10">Daily Active User (Chart)</h2>
    <Bar :data="chartDataNew"/>
  </div>
</template>

<script>
import axios from 'axios';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  name: 'ChartPage',
  components:{
    Bar,
  },
  watch:{
    chartData()
    {
      this.chartData.items.map((data)=>{
        if (!this.UserDate.includes(data.date))
        {
            this.UserDate.push(data.date);
        }
      })
      this.chartData.items.map((data)=>{
        if(!this.UserCountry.includes(data.country)){
          this.UserCountry.push(data.country);
        }
      })
      this.chartDataNew.labels=this.UserDate;
      let User_population=[[],[]];
      this.chartData.items.map((data)=>{

          if(data.date==this.UserDate[0])
          {
            User_population[0].push(data.count);
          }
          else
          {
            User_population[1].push(data.count);
          }

      })
      for(let i=0;i<this.UserDate.length;i++)
      {
        this.chartDataNew.datasets.push({
                label: this.UserCountry[i],
                data: [User_population[0][i],User_population[1][i]],
                backgroundColor: this.backgroundColor[i],
        })
      }
    },
  },
  data() {
    return {
      UserDate:[],
      UserCountry:[],
      chartData: {},
      backgroundColor:["#615b5b59","#82b1ff"],
    }
  },
  computed:{
      chartDataNew(){
        return{
            labels: this.UserDate,
            datasets: []
        }
  }
  },
  async mounted() {
    const response = await axios.get('https://9e34429a-eba3-4e56-85f2-685706a08897.mock.pstmn.io/report/dau?dashboardUserId=abc123&periodFrom=1669852800&periodTo=1674063742&aggregateBy%5B0%5D=month&aggregateBy%5B1%5D=country',{
                        headers: {
                          'Content-Type': 'application/json; charset=utf-8'
                        }
                      });
    this.chartData = JSON.parse(JSON.stringify(response.data));
    console.log('this.chartData ', this.chartData);
  }
}
</script>

<style>

</style>
