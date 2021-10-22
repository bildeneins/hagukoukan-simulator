import api from '../api'

function intervalPost( id_line_number, all_data_list) {
    return new Promise((resolve) => {
        const id = Number(all_data_list[id_line_number].id)
        const interval_sec = Number(all_data_list[id_line_number].cycle_time)
        console.log('interval_time', interval_sec)
        const machine_name = String(all_data_list[id_line_number].machine_name)
        const drill_counter_stop = Number(all_data_list[id_line_number].drill_counter_stop)
        const intervalId = setInterval(async ()=>{
            // get drill counter の値をget
            let drill_counter_count = 0
            let isMachineStopping = false
            try {
                // drill
                const response = await api.getCount(id)
                drill_counter_count = Number(response.data)
            } catch (error) {
                const { status, statusText} = error.response;
                console.log(`Error! HTTP Status: ${status} ${statusText}`);
            }
            try {
                // machine stop
                const response = await api.getIsMachineStopping(machine_name)
                isMachineStopping = Boolean(response.data)
            } catch (error) {
                const { status, statusText} = error.response;
                console.log(`Error! HTTP Status: ${status} ${statusText}`);
            }

            console.log("id: ", id, "now drill count", drill_counter_count," Machine Stop:", isMachineStopping)

            // get drill counter,isMachineStopping が条件を満たすなら、cycle_time_dataをpost
            if(drill_counter_count <= drill_counter_stop && isMachineStopping === false){
                // const cycle_time_data = 1
                api.incrementCount(id)
                  .then(response =>  {
                      console.log( response.data, ":", id)
                  }).catch(error => {
                    console.log(error);
                });
            }
        }, interval_sec * 1000)
        resolve(intervalId)
    })
}

async function getTable() {
    // all_data_list をget
    let all_data_list = []
    try {
        const response = await api.getTasks()
        // console.log(response.data)
        all_data_list = response.data
    } catch (e) {
        console.error(e)
        // const { status, statusText} = error.response;
        // console.log(`Error! HTTP Status: ${status} ${statusText}`);
    }
    return all_data_list
    // for(let i = 0; i < all_data_list.length; i++){
    //     console.log("for ",i)
    //     intervalPost(i)
    // }
}

function stopintervalPost(intervalId) {
    clearInterval(intervalId)
}

export default {
    getTable,
    intervalPost,
    stopintervalPost
};
