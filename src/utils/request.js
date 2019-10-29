import axios from 'axios';
const service = axios.create({
    timeout: 0,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=utf-8'
    },
    transformRequest: [function (data, headers) {
        return headers['Content-Type'] == 'multipart/form-data' ? data :JSON.stringify(serializationData(data));
    }]
})

// Add a request interceptor
service.interceptors.request.use(function (config) {
    config.headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': store.state.userInfo.token,
        'Content-Type': config.headers['Content-Type'] ? config.headers['Content-Type'] : 'application/json;charset=utf-8'
    }
    // 每次请求都加time
     if (config.params) {
        Object.assign(config.params, {time: new Date().getTime()});
    } else {
        config.params = Object.assign({}, {time: new Date().getTime()});
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
service.interceptors.response.use(function (response) {
    // 后端的一些约定的错误处理
    
    return response;
}, function (error) {
    let {data} = error.response;
    let errorInfo = JSON.parse(JSON.stringify(error));
    console.log('errorInfo->', errorInfo.config);
    return Promise.reject(error);
});

// 类型判断
function serializationData(data) {
    if (!data) {
        return undefined;
    } else {
        for(let key of  Object.keys(data)) {
            if (data[key] == '') {
                data[key] = null;
            }
            if (Object.prototype.toString.call(data[key]) == "[object Object]") { 
                data[key] = filterData(data[key]);
            }
         }
         return data;
    }
}

function request(method = 'get', url, data = {}, headers) {
    let axiosData = null;
    if (!url) {
        throw new Error('Url can not be empty!');
    }
    if(Object.prototype.toString.call(data)  !== '[object Object]') {
        throw new Error('Data type error!');
    }

    if (method == 'get' || method == 'delete') {
        axiosData = {params: data};
    } else {
        axiosData = data;
    }

    return new Promise((resolve, reject) => {
        service[method](url, axiosData, headers).then(data => {
            if(data.code == 0) {
                return resolve(data);
            }
            return reject(data);
        }).catch(e => {
            return reject(e);
        })
    })

}
export {
    service,
    request
}