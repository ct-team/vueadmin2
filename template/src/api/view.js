import Vue from 'vue';
import Interface from '@/config/interface';
export default function (parm) {
    var ajaxData = {
        url: Interface.view,
        success: () => {},
        error: (e) => {}
    };
    var newAjaxData = Object.assign({}, ajaxData, parm);

    return Vue.$dart.http
        .ajax(newAjaxData)
        .then(res => {
            newAjaxData.success(res);
        }).catch((e) => {
            newAjaxData.error(e);
        });
}
