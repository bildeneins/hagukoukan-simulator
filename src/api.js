import axios from "axios";

const client = axios.create({
  baseURL: 'http://localhost:3000'
})

export default {
  async getTasks() {
    return await client.get('/tasks')
  },
  async getCount(taskId) {
    return await client.get(`/tasks/count?id=${taskId}`)
  },
  async getIsMachineStopping(machineName) {
    return (await client.get(`/tasks/downtimes/isMachineStopping?machine_name=${machineName}`)).data
  },
  async incrementCount(taskId) {
    return await client.get(`tasks/count/increment?id=${taskId}`)
  },
}
