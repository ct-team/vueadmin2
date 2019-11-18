import Vue from 'vue';
import {
    successTip
} from './common';
import Interface from '@/config/interface';
export default function (parm) {
    var ajaxData = {
        url: Interface.del,
        success: () => {},
        error: (e) => {}
    };
    var newAjaxData = Object.assign({}, ajaxData, parm);

    return Vue.$dart.http
        .ajax(newAjaxData)
        .then(res => {
            successTip({
                res: res,
                successMsg: '删除成功',
                errorMsg: '删除失败',
                isErrorSYS: false
            });
            newAjaxData.success(res);
        }).catch((e) => {
            newAjaxData.error(e);
        });
}
