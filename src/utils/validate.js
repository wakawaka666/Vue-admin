/**
 * 过滤特殊字符
 */
export function stripscript(str){
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 * 验证邮箱
 */ 
export function validateEmail(value){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    // 三目运算符写法
    return !reg.test(value) ? true : false
    // if(!reg.test(value)){
    //     return true
    // }else{
    //     return false
    // }
}

/**
 * 验证密码
 */ 
export function validatePass(value){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(value) ? true : false
}

/**
 * 验证验证码
 */ 

 export function validateVcode(value){
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(value) ? true : false
 }


 /* 
    使用export 是指可以使用多个暴露的变量
    文件引用时import需要花括号
 */
