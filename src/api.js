import axios from "axios";

const client = axios.create({
  baseURL: 'http://localhost:3000'
})

export default {
  async getTasks() {
    return await client.get('/tasks')
  },
  /**
   * タスクの設備カウントを取得する
   * @param taskId
   * @returns {Promise<Number>}
   */
  async getCount(taskId) {
    return (await client.get(`/tasks/count?id=${taskId}`)).data
  },
  /**
   * 機番が停止中かを返す
   * @param machineName - 機番
   * @returns {Promise<{stopping: Boolean, emergency: Boolean}>}
   */
  async getIsMachineStopping(machineName) {
    return (await client.get(`/tasks/downtimes/isMachineStopping?machine_name=${machineName}`)).data
  },
  /**
   * タスクの設備カウントを1増加させる
   * @param taskId
   * @returns {Promise<AxiosResponse<unknown>>}
   */
  async incrementCount(taskId) {
    return await client.get(`tasks/count/increment?id=${taskId}`)
  },
}
