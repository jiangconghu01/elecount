import axios from 'axios';
import XLSX from 'xlsx';
axios.defaults.timeout = 50000;
axios.defaults.withCredentials = true;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
//全路径请求
let baseUrl = '';
if (process.env.NODE_ENV === 'development'){
    baseUrl = 'http://galv.test.thingcom.com';
} else {
    baseUrl = 'http://galv.test.thingcom.com';
}
const http = {
    get (url, params) {
        params = params || {};
        return new Promise((resolve, reject) => {
            axios.get(baseUrl+url, { 'params': params })
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    post (url, params) {
        params = params || {};
        return new Promise((resolve, reject) => {
            // axios.post(url, qs.stringify(params))
            axios.post(baseUrl+url, params)
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
};
const axiosUtil = axios;
/**
 * 存储sessionStorage
 */
function sessionSetStore(name, content) {
    if (!name) {
        return;
    }
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
}
/**
 * 获取sessionStorage
 */
function sessionGetStore(name) {
    if (!name) {
        return;
    }
    return window.sessionStorage.getItem(name);
}
/**
 * 删除sessionStorage
 */
function sessionRemoveStore(name) {
    if (!name) {
        return;
    }
    window.sessionStorage.removeItem(name);
}
/**
 * 删除所有sessionStorage
 */
function sessionClearStore() {
    window.sessionStorage.clear();
}
const xlsxExport = {
    // XLSX本身
    'xlsxObj': XLSX,
    // 1、创建workbook（工作薄）及其sheet（工作表）
    'creatWorkbook': function(excelData) {
    /*
      excelData：excel表格数据。格式参考exportXlsx
    */
        // 创建workbook（工作薄）
        let wb = XLSX.utils.book_new();
        // 遍历每张sheet（工作表）
        for (let i = 0; i < excelData.length; i++) {
            // 将JSON数据转为sheet（工作表）格式
            let sheet = XLSX.utils.json_to_sheet(excelData[i].data);
            // workbook（工作薄）对象添加sheet（工作表）
            XLSX.utils.book_append_sheet(wb, sheet, excelData[i].name);
        }
        return wb;
    },
    // 2、将workbook转化成blob对象
    'workbook2blob': function(workbook) {
    // 生成excel的配置项
        let wopts = {
            // 要生成的文件类型
            'bookType': 'xlsx',
            // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
            'bookSST': false,
            'type': 'binary'
        };
        let wbout = XLSX.write(workbook, wopts);
        // 将字符串转ArrayBuffer
        function s2ab(s) {
            let buf = new ArrayBuffer(s.length);
            let view = new Uint8Array(buf);
            for (let i = 0; i != s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xff;
            }
            return buf;
        }
        let blob = new Blob([s2ab(wbout)], {
            'type': 'application/octet-stream'
        });
        return blob;
    },
    // 3、将blob对象创建url，然后用a标签实现弹出下载框
    'openDownloadDialog': function(blob, fileName) {
        if (typeof blob === 'object' && blob instanceof Blob) {
            blob = URL.createObjectURL(blob); // 创建blob地址
        }
        let aLink = document.createElement('a');
        aLink.href = blob;
        // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
        aLink.download = fileName || '';
        let event;
        if (window.MouseEvent) {
            event = new MouseEvent('click');
        }
        //   移动端
        else {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent(
                'click',
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            );
        }
        aLink.dispatchEvent(event);
    },
    // 4、导出xlsx文件
    'exportXlsx': function(excelData, excelName) {
    /*
      excelData：excel表格数据
        格式为数组，每一个元素为一张工作表的数据对象（item）。
        item由两个属性构成，分别为name（工作表名）和data（工作表数据）
        例如：
          [
            {
              name: '1班',
              data: [
                {name: '张三', age: '15', sex: '男'},
                {name: '李四', age: '13', sex: '女'},
              ]
            },
            {
              name: '2班',
              data: [
                {name: '王五', age: '14', sex: '男'},
                {name: '赵六', age: '16', sex: '女'},
              ]
            }
          ]
      excelName：excel表格名称
    */
        // 创建workbook（工作薄）及其sheet（工作表）
        let wb = this.creatWorkbook(excelData);
        // 将workbook转化成blob对象
        let workbookBlob = this.workbook2blob(wb);
        // 将blob对象创建bloburl，然后用a标签实现弹出下载框
        this.openDownloadDialog(workbookBlob, `${excelName}.xlsx`);
    }
};
const u ={
    http,
    axiosUtil,
    sessionClearStore,
    sessionRemoveStore,
    sessionGetStore,
    sessionSetStore,
    xlsxExport
};
export default u;
