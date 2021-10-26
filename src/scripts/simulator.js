import api from '../api'

/**
 * 一定間隔でサーバにカウント増加リクエストを送信します。
 * @module object
 * @param {Object} task - ユーザーオブジェクト
 * @param {number} task.id - タスクのid
 * @param {number} task.cycle_time - 刃具カウントの増加間隔
 * @param {string} task.machine_name - 機番
 * @param {number} task.drill_counter_stop - 刃具カウントの停止値
 * @return {Promise<number>} intervalId - 定期送信用 setInterval()の返り値
 */
function intervalPost(task) {
    return new Promise((resolve) => {
        const id = Number(task.id)
        const interval_sec = Number(task.cycle_time)
        const machine_name = String(task.machine_name)
        const drill_counter_stop = Number(task.drill_counter_stop)
        const intervalId = setInterval(async () => {
            // get drill counter の値をget
            let current_count = 0
            let isMachineStopping = false
            try {
                // drill
                const count = (await api.getCount(id)).data
                current_count = Number(count)
                // machine stop
                const stopping = (await api.getIsMachineStopping(machine_name)).data
                isMachineStopping = Boolean(stopping)
            } catch (e) {
                const { status, statusText} = e.response;
                console.log(`Error! HTTP Status: ${status} ${statusText}`);
            }
            // get drill counter,isMachineStopping が条件を満たすなら、cycle_time_dataをpost
            if(current_count < drill_counter_stop && isMachineStopping === false){
                try {
                    await api.incrementCount(id)
                } catch(e) {
                    console.error(e);
                }
            }
        }, interval_sec * 1000)
        resolve(intervalId)
    })
}

/**
 * タスク一覧をサーバから取得します。
 */
async function getTable() {
    try {
        return (await api.getTasks()).data
    } catch (e) {
        console.error(e)
    }
}

/**
 * 定期的なカウント増加リクエストの送信を停止します。
 * @param {number} intervalId - setInterval()の返り値
 */
function stopIntervalPost(intervalId) {
    clearInterval(intervalId)
}

export default {
    getTable,
    intervalPost,
    stopIntervalPost
};
