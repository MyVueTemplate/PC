
 /**
  * 
  * @param {string || number} val 
  */
export function isNull(val) {
    let type = Object.prototype.toString.call(val);
    switch (type) {
        case '[object String]':
            return val ? true : false;
        case '[object Array]':
            return val.length >= 1 ? true : false;    
    }
}

/**
 * 
 * @param {number} val 
 */
export function validIDCard(val) {
    return val.length == 18  || val.length == 15 ? true : false;
}

export function validDel(val) {
    return val.length == 12 ? true : false;
}

//手机号格式校验
export const validPhone = (rule, value, callback) => {   
    if(value) {
        if(!(/^1[3-9]\d{9}$/.test(value))) {
            callback(new Error('您输入的手机号格式不正确!'))
        } else {
            callback()
        }
    }else {
        callback()
    }
}
//固定电话格式校验
export const validFixedPhone = (rule, value, callback) => {   
    
    if(value) {
        if((!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value))) {
            callback(new Error('您输入的电话格式不正确!'))
        } else {
            callback()
        }
    }else {
        callback()
    }
}
//身份证号格式校验
export const validIdCard = (rule, value, callback) => {   
    let isCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
    if(value) {
        if((!isCard.test(value))) {
            callback(new Error('您输入的身份证号格式不正确!'))
        } else {
            callback()
        }
    }else {
        callback()
    }
}
//邮箱格式校验
export const validEmail = (rule, value, callback) => {   
    let isEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if(value) {
        if((!isEmail.test(value))) {
            callback(new Error('您输入的邮箱格式不正确!'))
        } else {
            callback()
        }
    }else {
        callback()
    }
}
// 邮编格式验证
export const validPostcode = (rule, value, callback) => {
    let isPostcod = /^[0-9]{6}$/;
    if (value) {
        if (!isPostcod.test(value)) {
            callback(new Error('您输入的邮编格式不正确!'))
        } else {
            callback()
        }
    }else {
        callback()
    }
}
// 数字验证非0
export const validInteger = (rule, value, callback) => {
    let isNumber = /^\+?[1-9][0-9]*$/;
    if (value) {
        if (!isNumber.test(value)) {
            callback(new Error('您输入的格式不正确!'))
        } else {
            callback()
        }
    }else {
        callback()
    }
}
// 数字验证
export const validNumber = (rule, value, callback) => {
    let isNumber = /^[0-9]*$/;
    if (value) {
        if (!isNumber.test(value)) {
            callback(new Error('您输入的格式不正确!'))
        } else {
            callback()
        }
    }else {
        callback()
    }
}

// 验证省市区
export const validArea = (rule, value, callback) => {
    if (`${value}` && `${value}`.length == 6) {
        callback();
    } else {
        callback(new Error('请选择详细地址'));
    }
}
