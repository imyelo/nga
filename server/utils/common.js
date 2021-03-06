var gbkEncode = require('./gbkEncode');

exports.trim = function (str) {
  if (typeof str !== 'string') {
    return '';
  }
  return str.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * 将字符串形式的params转换为key-value形式
 * @param  {string} paramsText 字符串形式的params
 * @return {object}            输出的key-value形式params
 */
var getParamsObject = exports.getParamsObject = function (paramsText) {
  var arr = paramsText.split('&');
  var params = {};
  for (i = 0, len = arr.length; i < len; i++) {
    index = arr[i].indexOf('=');
    params[arr[i].slice(0, index)] = arr[i].slice(index + 1);
  }
  return params;
};

/**
 * 为jQuery封装的form对象提供serializeJSON方法
 * @param  {object} $form jQuery封装的form对象
 * @return {object}       json格式的表单信息
 */
var serializeJSON = exports.serializeJSON = function ($form) {
  var arr = $form.serializeArray();
  var obj = {};
  var i, len;
  for (i = 0, len = arr.length; i < len; i++) {
    obj[arr[i].name] = arr[i].value;
  }
  return obj;
};

/**
 * 较松地将json格式的params转化为urlencode
 * @param  {string|object} obj json格式的params
 * @param {boolean} gbk 是否为gbk编码
 * @return {string}     urlencode编码的params
 */
var jsonToUrlEncode = exports.jsonToUrlEncode = function (obj, gbk) {
  var str = '';
  var key;
  if (typeof obj === 'string') {
    obj = JSON.parse(obj);
  }
  for (key in obj) {
    str += key + '=' + (gbk ? gbkEncode.encodeURI(obj[key]) : encodeURI(obj[key])) + '&';
  }
  return str;
};

/**
 * 匹配正则表达式，减少处理异常的代码
 * @param  {string} str   字符串
 * @param  {RegExp} reg   正则表达式
 * @param  {number} index 需要返回的索引号
 * @return {string|array|null}       无匹配结果时返回null，否则有索引号时返回string，无索引号返回array
 */
var getMatch = exports.getMatch = function (str, reg, index) {
  var m = str.match(reg);
  if (m) {
    if (typeof index === 'number') {
      return m[index];
    } else {
      return m;
    }
  } else {
    return null;
  }
};