const axios =  require('axios');
axios.defaults.baseURL = 'http://localhost:8080'




function intervalPost(i, all_data_list) {
    const interval_time = Number(all_data_list[i].cycle_time)
    const id = Number(all_data_list[i].id)
    const machine_name = String(all_data_list[i].machine_name)
    const drill_counter_stop = Number(all_data_list[i].drill_counter_stop)
    setInterval(async ()=>{
        // get drill counter の値をget
        let drill_counter_count = 0
        let isMachineStopping = false
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
            // machine stop
            const response = await axios
                .get('/tasks/isMachineStopping', {params:{machine_name:machine_name}});
            isMachineStopping = Boolean(response.data)
        } catch (error) {
            const { status, statusText} = error.response;
            console.log(`Error! HTTP Status: ${status} ${statusText}`);
        }

        console.log("id: ", id, "now drill count", drill_counter_count," Machine Stop:", isMachineStopping)

        // get drill counter,isMachineStopping が条件を満たすなら、cycle_time_dataをpost
        if(drill_counter_count <= drill_counter_stop && isMachineStopping === false){
            const cycle_time_data =  {
                "ids": [0],
            }
            axios.post('/tasks/count/increment', cycle_time_data)
                .then(response =>  {
                    console.log( response.data, ":", id)
                }).catch(error => {
                console.log(error);
            });
        }
    }, interval_time)
}

async function getTable() {
    // all_data_list をget
    let all_data_list = []
    try {
        const response = await axios.get('/tasks');
        console.log(response.data)
        all_data_list = response.data
    } catch (error) {
        const { status, statusText} = error.response;
        console.log(`Error! HTTP Status: ${status} ${statusText}`);
    }
    return all_data_list
    // for(let i = 0; i < all_data_list.length; i++){
    //     console.log("for ",i)
    //     intervalPost(i)
    // }
}

export default {
    getTable,
    intervalPost
};