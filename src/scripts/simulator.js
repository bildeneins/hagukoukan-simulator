const axios =  require('axios');
axios.defaults.baseURL = 'http://localhost:8080'

// function intervalPost( id_line_number, all_data_list) {
//     const id = Number(all_data_list[id_line_number].id)
//     const interval_time = Number(all_data_list[id_line_number].cycle_time)
//     const machine_name = String(all_data_list[id_line_number].machine_name)
//     const drill_counter_stop = Number(all_data_list[id_line_number].drill_counter_stop)
//     let isMachineStatus = { "stopping": false, "emergency": false}
//     setInterval(async ()=>{
//         // get drill counter の値をget
//         let drill_counter_count = 0
//         try {
//             // drill
//             const response = await axios
//                 .get('/tasks/count', {params:{id:id}});
//             drill_counter_count = Number(response.data)
//         } catch (error) {
//             const { status, statusText} = error.response;
//             console.log(`Error! HTTP Status: ${status} ${statusText}`);
//         }
//         try {
//             // machine stop
//             const response = await axios
//                 .get('/tasks/isMachineStopping', {params:{machine_name:machine_name}});
//             isMachineStatus.stopping = Boolean(response.data.stopping)
//             isMachineStatus.emergency = Boolean(response.data.emergency)
//         } catch (error) {
//             const { status, statusText} = error.response;
//             console.log(`Error! HTTP Status: ${status} ${statusText}`);
//         }
//
//         console.log("id: ", id, "now drill count", drill_counter_count," Machine Stop:", isMachineStatus)
//
//         // get drill counter,isMachineStopping が条件を満たすなら、cycle_time_dataをpost
//         if(drill_counter_count <= drill_counter_stop && isMachineStatus.stopping === false){
//             const cycle_time_data = 1
//             axios.post('/tasks/count/increment', cycle_time_data)
//                 .then(response =>  {
//                     console.log( response.data, ":", id)
//                 }).catch(error => {
//                 console.log(error);
//             });
//         }
//     }, interval_time)
// }

async function intervalPost( id, drill_counter_stop, machine_name) {
    let drill_counter_count = 0
    let isMachineStatus = { "stopping": false, "emergency": false}
    try {
        // drill
        const response = await axios
            .get('/tasks/count', {params:{id:id}});
        drill_counter_count = Number(response.data)
    } catch (error) {
        const { status, statusText} = error.response;
        console.log(`Error! HTTP Status: ${status} ${statusText}`);
    }
    try {
        // machine stop or emergency
        const response = await axios
            .get('/tasks/isMachineStopping', {params:{machine_name:machine_name}});
        isMachineStatus.stopping = Boolean(response.data.stopping)
        isMachineStatus.emergency = Boolean(response.data.emergency)
    } catch (error) {
        const { status, statusText} = error.response;
        console.log(`Error! HTTP Status: ${status} ${statusText}`);
    }

    console.log("id: ", id, "now drill count", drill_counter_count," Machine Stop:", isMachineStatus)
    // get drill counter,isMachineStopping が条件を満たすなら、cycle_time_dataをpost
    if(drill_counter_count <= drill_counter_stop && isMachineStatus.stopping === false){
        const cycle_time_data = 1
        axios.post('/tasks/count/increment', cycle_time_data)
            .then(response =>  {
                console.log( response.data, ":", id)
            }).catch(error => {
            console.log(error);
        });
    }
    return isMachineStatus
}

async function getTable() {
    // all_data_list をget
    let all_data_list = []
    try {
        const response = await axios.get('/tasks');
        // console.log(response.data)
        all_data_list = response.data
    } catch (error) {
        const { status, statusText} = error.response;
        console.log(`Error! HTTP Status: ${status} ${statusText}`);
    }
    return all_data_list
}

export default {
    getTable,
    // intervalPost,
    intervalPost,
};