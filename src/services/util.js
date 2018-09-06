import React from 'react';
import assign from 'lodash/assign';
import moment from 'moment';
import { Select } from 'antd';

const Option = Select.Option;

export default {
  /**
   * 把用户信息保存到本地localStorage
   * @param json对象
   */
  setUserInfo(params) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));

    let newUserInfo = assign({}, userInfo, params);

    localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
  },

  /**
   * 从本地localStorage获取用户信息
   */
  getUserInfo() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));

    return userInfo;
  },

  /**
   * 退出时删除本地localStorage用户信息
   */
  clearUserInfo() {
    localStorage.removeItem('userInfo');
  },

  fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val;
  },

  /**
   * 获取本地时差，单位秒数
   * @return {Number} offset
   */
  getTimezoneOffset() {
    const offset = -new Date().getTimezoneOffset() * 60;

    return offset;
  },
  /**
   * 当前日期起止时间
   */
  getCurrentTime() {
    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24; //一天毫秒数

    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    return {
      start_time: Math.floor(Number(moment(now).format('x') / 1000)),
      end_time: Math.floor(
        Number(moment(now.getTime() + (oneDay - 1000)).format('x')) / 1000
      )
    };
  },

  /**
   * 选中日期起止时间
   * @param date {
   *  yearMonth: '2018/5',
   *  date: '19'
   * }
   */
  getSelectedTime(dateObj) {
    /* console.log('日期时间戳转化',moment('2018-5-18').format('x'),'date',new Date('2018-5-18').getTime())
      console.log('0点时间戳转化',moment('2018-5-18 00:00:00').format('x'),'date',new Date('2018-5-18 00:00:00').getTime())
      console.log('24点时间戳转化',moment('2018-5-18 23:59:59').format('x'),'date',new Date('2018-5-18 23:59:59').getTime())
      console.log('当前时间戳转化',moment().format('x'),'date',new Date().getTime())

      let now = new Date();
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);*/
    const oneDay = 1000 * 60 * 60 * 24; //一天毫秒数

    let date, startDate, endDate, start_time, end_time;
    if (dateObj.date) {
      //具体某天的时间
      date = convertDate(dateObj);
      start_time = Number(moment(date).format('x'));
      end_time = Number(moment(date.getTime() + (oneDay - 1000)).format('x'));
    } else {
      //某个月的起止时间
      startDate = convertDate({
        yearMonth: dateObj.yearMonth,
        date: '01'
      });
      endDate = convertDate({
        yearMonth: dateObj.yearMonth,
        date: moment(dateObj.yearMonth, 'YYYY-MM').daysInMonth()
      });

      start_time = Number(moment(startDate).format('x'));
      end_time = Number(
        moment(endDate.getTime() + (oneDay - 1000)).format('x')
      );
    }
    // const totalDays = moment().daysInMonth();//某个月的天数，不设置时表示当前月
    // console.log('当月多少天',moment('2018-4').daysInMonth(),'当前月是',moment().get('month'),'当前日期',moment().get('date'),'当前时间',moment())
    // console.log('moment().month()是',moment().month(),'moment().months()是',moment().months(),'moment.months()',moment.months())
    // console.log('dateObj', dateObj,'date选择日期',date,'startDate',startDate,'endDate',endDate,'start_time',start_time,'end_time',end_time)
    return {
      start_time: Math.floor(start_time / 1000),
      end_time: Math.floor(end_time / 1000)
    };
  },

  /**
   * 把毫秒数转换为时分秒
   * @param 毫秒数
   */
  convertTime(param) {
    let h, m, s, total, timeStr;

    total = Math.ceil(Number(param) / 1000);
    h = Math.floor(total / 3600);
    m = Math.floor((total % 3600) / 60);
    s = total % 60;

    timeStr =
      (h * 1 < 10 ? `0${h}` : h) +
      (m * 1 < 10 ? `:0${m}` : `:${m}`) +
      (s * 1 < 10 ? `:0${s}` : `:${s}`);

    return timeStr;
  },

  /**
   * 邮箱验证
   * @param String
   * @return Boolean
   */
  isEmail(str) {
    let reg = /^[a-zA-Z\d]+([-_\\.][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/;
    return reg.test(str);
  },

  /**
   * @param String
   * @return Boolean
   */
  isPassword(str) {
    let reg = /^[a-zA-Z\d]{8,20}$/;
    return reg.test(str);
  },

  /**
   * 数组对象根据指定属性排序
   * @param arr 需要排序的数组
   * @param prop 指定属性
   */
  arrayObjectSortByProp(arr, prop) {
    if (arr) {
      let newArr = [...arr];
      let compare = function(prop) {
        return function(obj1, obj2) {
          let val1 = obj1[prop];
          let val2 = obj2[prop];
          if (val1 < val2) {
            return 1;
          } else if (val1 > val2) {
            return -1;
          } else {
            return 0;
          }
        };
      };

      return newArr.sort(compare(prop));
    } else {
      return arr;
    }
  },
  formateDate(time) {
    if (!time) return '';
    let date = new Date(time);
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds()
    );
  },
  pagination(data, callback) {
    return {
      onChange: current => {
        callback(current);
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total_count,
      showTotal: () => {
        return `共${data.result.total_count}条`;
      },
      showQuickJumper: true
    };
  },
  // 格式化金额,单位:分(eg:430分=4.30元)
  formatFee(fee, suffix = '') {
    if (!fee) {
      return 0;
    }
    return Number(fee).toFixed(2) + suffix;
  },
  // 格式化公里（eg:3000 = 3公里）
  formatMileage(mileage, text) {
    if (!mileage) {
      return 0;
    }
    if (mileage >= 1000) {
      text = text || ' km';
      return Math.floor(mileage / 100) / 10 + text;
    } else {
      text = text || ' m';
      return mileage + text;
    }
  },
  // 隐藏手机号中间4位
  formatPhone(phone) {
    phone += '';
    return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2');
  },
  // 隐藏身份证号中11位
  formatIdentity(number) {
    number += '';
    return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2');
  },
  getOptionList(data) {
    if (!data) {
      return [];
    }
    let options = []; //[<Option value="0" key="all_key">全部</Option>];
    data.map(item =>
      options.push(
        <Option value={item.id} key={item.id}>
          {item.name}
        </Option>
      )
    );
    return options;
  },
  /**
   * ETable 行点击通用函数
   * @param {*选中行的索引} selectedRowKeys
   * @param {*选中行对象} selectedItem
   */
  updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
    if (selectedIds) {
      this.setState({
        selectedRowKeys,
        selectedIds: selectedIds,
        selectedItem: selectedRows
      });
    } else {
      this.setState({
        selectedRowKeys,
        selectedItem: selectedRows
      });
    }
  }
};

//把日期转化成完整格式，如2018/5/18 00:00:00
function convertDate(dateObj) {
  let date = new Date(dateObj.yearMonth + '/' + dateObj.date);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date;
}
