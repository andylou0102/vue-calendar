import { createRouter, createWebHistory } from 'vue-router'
import Calendar from '../views/Calendar.vue'
import MonthCalendar from '../views/MonthCalendar.vue'

const routes = [
  {
    path: '/',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/month',
    name: 'MonthCalendar',
    component: MonthCalendar
  },
  {
    path: '/day/:select',
    name: 'CalendarSelect',
    component: Calendar
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
