import Vue from 'vue';
import Interface from '@/config/index/interface.js';

const ajax = (ajaxData, parm) => {
    const newAjaxData = Object.assign({}, ajaxData, parm);

    return new Promise((resolve, reject) => {
        Vue.$dart.http
            .ajax(newAjaxData)
            .then(res => {
                resolve(res);
            }).catch((e) => {
                reject(e);
            });
    });
};

// 表格数据获取接口
export const apiGetTableList = (parm) => {
    const ajaxData = {
        url: Interface.getTableList
    };

    return new Promise((resolve) => {
        const res = ajax(ajaxData, parm);

        resolve(res);
    });
};

// 添加界面保存接口
export const apiSaveAddForm = (parm) => {
    const ajaxData = {
        url: Interface.saveAddForm,
        method: 'post'
    };

    return new Promise((resolve) => {
        const res = ajax(ajaxData, parm);

        resolve(res);
    });
};

// 编辑界面保存接口
export const apiSaveEditForm = (parm) => {
    const ajaxData = {
        url: Interface.saveEditForm,
        method: 'post'
    };

    return new Promise((resolve) => {
        const res = ajax(ajaxData, parm);

        resolve(res);
    });
};

// 删除列表行接口
export const apiDelTableRow = (parm) => {
    const ajaxData = {
        url: Interface.delTableRow
    };

    return new Promise((resolve) => {
        const res = ajax(ajaxData, parm);

        resolve(res);
    });
};

// 导出接口
export const apiExportExcel = (parm) => {
    const ajaxData = {
        url: Interface.export
    };

    return new Promise((resolve) => {
        const res = ajax(ajaxData, parm);

        resolve(res);
    });
};

// 获取列表行数的详情
export const apiGetDeatail = (parm) => {
    const ajaxData = {
        url: Interface.getDetail
    };

    return new Promise((resolve) => {
        const res = ajax(ajaxData, parm);

        resolve(res);
    });
};
