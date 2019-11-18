<template>
    <el-row class="dart-date-range">
        <el-col :span="11"
                :xs="24">
            <el-date-picker style="width: 100%;"
                            ref="start"
                            v-model="currValue[0]"
                            :disabled="disabled"
                            :placeholder="startPlaceholder"
                            :readonly="readonly"
                            :editable="editable"
                            :clearable="clearable"
                            :size="size"
                            :default-time="startDefaultTime"
                            :format="format"
                            :align="align"
                            :popperClass="popperClass"
                            :pickerOptions="startPickerOptions"
                            :defaultValue="startDefaultValue"
                            :valueFormat="valueFormat"
                            :name="name"
                            :prefixIcon="prefixIcon"
                            :clearIcon="clearIcon"
                            :type="type"
                            @change="onStartChange"
                            @blur="onStartBlur"
                            @focus="onStartFocus"></el-date-picker>
        </el-col>
        <el-col :span="2">
            <div class="separator">-</div>
        </el-col>
        <el-col :span="11"
                :xs="24">
            <el-date-picker style="width: 100%;"
                            ref="end"
                            v-model="currValue[1]"
                            :disabled="disabled"
                            :placeholder="endPlaceholder"
                            :readonly="readonly"
                            :editable="editable"
                            :clearable="clearable"
                            :size="size"
                            :default-time="endDefaultTime"
                            :format="format"
                            :align="align"
                            :popperClass="popperClass"
                            :pickerOptions="endPickerOptions"
                            :defaultValue="endDefaultValue"
                            :valueFormat="valueFormat"
                            :name="name"
                            :prefixIcon="prefixIcon"
                            :clearIcon="clearIcon"
                            :type="type"
                            @change="onEndChange"
                            @blur="onEndBlur"
                            @focus="onEndFocus"></el-date-picker>
        </el-col>
    </el-row>

</template>
<script>
import utils from '../utils/index';
export default {
    name: 'dartDateRange',
    props: {
        value: {},
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        editable: {
            type: Boolean,
            default: true
        },
        clearable: {
            type: Boolean,
            default: true
        },
        defaultTime: {},
        size: {
            type: String,
            default: ''
        },
        format: {},
        align: {},
        popperClass: {},
        type: {
            type: String,
            default: 'date',
            validator: function (value) {
                return value === 'date' || value === 'datetime';
            }
        },
        name: {},
        valueFormat: {},
        clearIcon: {},
        prefixIcon: {},
        endPickerOptions: {},
        endDefaultValue: {},
        startPickerOptions: {},
        startDefaultValue: {},
        startPlaceholder: {},
        endPlaceholder: {},
        unlink: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            currValue: ['', ''],
            startDefaultTime: '',
            endDefaultTime: ''
        };
    },
    methods: {
        /**
         * @function {获取defaultTime 兼容老的字符串}
         * @param  {array|string} value {数组或字符}
         * @return {array|null} {数组}
         */
        // eslint-disable-next-line
        _getDefaultTime() {
            var result = null;

            var value = this.defaultTime;

            if (!value) {
                return result;
            }
            if (utils.isString(value)) {
                // eslint-disable-next-line
                result = window.eval(value);
            }

            if (utils.isArray(value) && value.length === 2) {
                result = value;
            }

            if (!(utils.isArray(result) && result.length === 2)) {
                result = null;
            }

            return result;
        },

        /**
     * @function {输出值过滤}
     * @param  {array} m {当前选中值}
     * @return {string,array} {真实值}
     */
        // eslint-disable-next-line
        _outFilter(m) {
            if (!m[0] && !m[1]) {
                return '';
            }

            const time = this._getDefaultTime();
            const isTimestamp = this.valueFormat === 'timestamp';
            var result = [];
            var newValue = this.currValue.slice(0);

            if (time && this.type === 'date') {
                var newTime = this._dateFilter(m);

                result.push(this._sortTimeFormat(newTime[0], time[0], isTimestamp));
                result.push(this._sortTimeFormat(newTime[1], time[1], isTimestamp));

                if (!result[0] && !result[1]) {
                    return '';
                }
                return result;
            }

            newValue.forEach(item => {
                const currValue = item === null ? '' : item;

                result.push(currValue);
            });

            return result;
        },
        /**
     * @function {时间加短时间格式化}
     * @param  {string,number} longTime {日期时间}
     * @param  {string} time     {时间}
     * @param  {boolean} type     {是否是时间戳}
     * @return {string,number} {完整时间}
     */
        _sortTimeFormat(longTime, time, type) {
            var timeList = time.split(':');
            var result = 0;

            if (timeList.length < 3 || !longTime) {
                return longTime ? longTime : '';
            }

            if (type === true) {
                timeList.forEach((item, index) => {
                    result += this._timeOutSes(item, index);
                });
            } else {
                result = ' ' + time.slice(0, 8);
            }
            return longTime + result;
        },
        /**
     * @function {获得时分秒毫秒数}
     * @param  {string} time  {时分秒值}
     * @param  {number} index {计算位数}
     * @return {number} {毫秒数}
     */
        _timeOutSes(time, index) {
            var currTime = Number(time);

            if (index === 0) {
                return currTime * 60 * 60 * 1000;
            }
            if (index === 1) {
                return currTime * 60 * 1000;
            }

            if (index === 2) {
                return currTime * 1000;
            }
            if (index === 3) {
                return currTime;
            }
            return 0;
        },

        /**
     * @function {范围重新赋值}
     * @param  {string} type {触发来源}
     */
        // eslint-disable-next-line
        _range(type) {
            if (!utils.isArray(this.currValue) || !this.unlink) {
                return;
            }
            var newValue = this.currValue.slice(0);
            var start = newValue[0];
            var end = newValue[1];
            var isCheckTime = new Date(start) > new Date(end);

            if (!start || !end) {
                return;
            }

            if (!start && !end) {
                this.currValue = '';
                return;
            }
            if (type === 'start' && isCheckTime) {
                this.currValue = [start, start];
            }
            if (type === 'end' && isCheckTime) {
                this.currValue = [end, end];
            }
        },
        onStartChange(v) {
            this._range('start');
            this.$emit('startChange', v);
            this.$emit('change', v);
        },
        onStartBlur(e) {
            this.$emit('startBlur', e);
            this.$emit('blur', e);
        },
        onStartFocus(e) {
            this.$emit('startFocus', e);
            this.$emit('focus', e);
        },
        onEndChange(v) {
            this._range('end');
            this.$emit('endChange', v);
            this.$emit('change', v);
        },
        onEndBlur(e) {
            this.$emit('endBlur', e);
            this.$emit('blur', e);
        },
        onEndFocus(e) {
            this.$emit('endFocus', e);
            this.$emit('focus', e);
        },
        _defaultTimeInit() {
            var time = this._getDefaultTime();

            if (this.type !== 'datetime' || !time) {
                return;
            }

            this.startDefaultTime = time[0];
            this.endDefaultTime = time[1];
        },
        /**
         * @function {获取清除时间的日期毫秒数}
         * @param  {type} date {日期毫秒数}
         * @return {number} {时间为0的日期毫秒数}
         */
        _getCleartimeTime(date) {
            var time = date;

            if (!time) {
                return '';
            }
            if (utils.isString(date)) {
                time = date.replace('-', '/');
            }
            var newDate = this.getNowFormatDate(time);

            return new Date(newDate).getTime();
        },
        /**
         * @function {获取年月日}
         * @param  {date} time {时间格式}
         * @return {string} {具体年月日}
         */
        getNowFormatDate(time) {
            var date = new Date(time);
            var seperator1 = '/';
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();

            if (month >= 1 && month <= 9) {
                month = '0' + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;

            return currentdate;
        },
        /**
         * @function {时间过滤}
         * @param  {Array} date {时间}
         * @return {Array} {过滤后的时间}
         */
        _dateFilter(date) {
            var result = [];

            result.push(this._getCleartimeTime(date[0]));
            result.push(this._getCleartimeTime(date[1]));

            return result;
        }
    },
    created() {
        this._defaultTimeInit();
    },
    watch: {
        value: {
            immediate: true,
            deep: true,
            handler(value) {
                console.log(1);
                console.log(value);
                console.log(this.currValue);
                if (utils.valueEquals(value, this.currValue)) {
                    return;
                }

                var result;

                if (!value) {
                    result = ['', ''];
                } else {
                    result = value;
                }
                result = this._outFilter(value);
                console.log(2);
                console.log(result);

                this.currValue = result;
            }
        },
        currValue(value) {
            var result = this._outFilter(value);

            console.log(3);
            //console.log(result);

            this.$emit('input', result);
        }
    }
};
</script>

<style>
.dart-date-range .separator {
    text-align: center;
}
</style>
