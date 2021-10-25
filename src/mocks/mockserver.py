import bottle
from bottle import hook, response, route, run, app, static_file, HTTPResponse, request, default_app
import json



@route('/')
def main():
    return HTTPResponse(status=200, body=json.dumps("ThisIsResponseText"))


@route('/tasks', method='GET')
def get():
    data = [
        { "id": "0", "cycle_time": "10000", "machine_name": "KSPS-0759","drill_counter_stop": "30.0"},
        { "id": "1", "cycle_time": "5000", "machine_name": "KSPS-0759","drill_counter_stop": "60.0"},
        { "id": "2", "cycle_time": "15000", "machine_name": "KSPS-0759","drill_counter_stop": "80.0"}
    ]
    res = HTTPResponse(status=200, body=json.dumps(data))
    res.set_header('Content-Type', 'application/json')
    res.set_header('Access-Control-Allow-Origin', '*')
    return res

drill_counter_list = [5,8,10,29,15]
@route('/tasks/count', method='GET')
def get():
    id = int(request.query.get('id'))
    drill_counter_list[id]+=1
    drill_count = drill_counter_list[id]
    res = HTTPResponse(status=200, body=json.dumps(drill_count))
    res.set_header('Content-Type', 'application/json')
    res.set_header('Access-Control-Allow-Origin', '*')
    return res

@route('/tasks/count/increment', method='POST')
def post():
    ids = request.body.read()
    print(ids)
    res = HTTPResponse(status=200, body=json.dumps("post ok"))
    res.set_header('Content-Type', 'application/json')
    res.set_header('Access-Control-Allow-Origin', '*')
    return res

isMachineStopingList = [
{"stopping":True,"emergency":True},
{"stopping":True,"emergency":False},
{"stopping":False,"emergency":True},
{"stopping":False,"emergency":False}]
@route('/tasks/isMachineStopping', method='GET')
def get():
    machine_name = request.query.get('machine_name')
    if(drill_counter_list[1] > 10):
        data = isMachineStopingList[0]
    else:
        data = isMachineStopingList[1]
    
    res = HTTPResponse(status=200, body=json.dumps(data))
    res.set_header('Content-Type', 'application/json')
    res.set_header('Access-Control-Allow-Origin', '*')
    return res

app = bottle.default_app()

if __name__ == '__main__':
    run(host='localhost', port=8080,reloader=True, debug=True)
