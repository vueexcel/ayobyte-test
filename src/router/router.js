import Vue from 'vue'
import VueRouter from 'vue-router'
import TablePage from '../pages/TablePage.vue';
import ChartPage from '../pages/ChartPage.vue';

Vue.use(VueRouter);

const routes = [
  { 'path': '/', name: 'TablePage', component: TablePage },
  { 'path': '/chart', name: 'ChartPage', component: ChartPage },
]

export const router = new VueRouter({
  mode: 'history',
  routes
})
