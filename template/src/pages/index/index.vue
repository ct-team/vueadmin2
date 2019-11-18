<template>
    <div>
        <ct-breadcrumb></ct-breadcrumb>
        <ct-search ref="search" @onSearch="handleSearch"></ct-search>
        <ct-tool @export="handleExport"></ct-tool>
        <ct-table
            :data="tableData"
            :pagination="pagination"
            :loading="loading"
            :message="tableMessage"
        ></ct-table>
        <router-view></router-view>
    </div>
</template>

<script>
import CtBreadcrumb from './breadcrumb';
import CtSearch from './search';
import CtTable from './table';
import CtTool from './tool';
import { apiGetTableList, apiExportExcel } from '@/api/index/index';
import code from '@/config/index/code';
import con from '@/config/index/const';

export default {
    data() {
        return {
            searchData: {}, // 当前保存的搜索数据
            tableData: [], // 列表数据
            loading: false, // loading状态
            tableMessage: undefined, // 列表为空时显示内容
            pagination: {
                pageIndex: con.pageIndex, // 当前页数
                pageSize: con.pageSize, // 每页的展示条数
                total: con.total // 总数
            }
        };
    },
    components: {
        CtSearch,
        CtTable,
        CtBreadcrumb,
        CtTool
    },
    created() {
        this.init();
    },
    methods: {
        /**
         * @function {function 搜索按钮触发}
         * @param  {type} data {搜索栏数据}
         */
        handleSearch(data) {
            this.searchData = data;
            this.refreshTable(
                { pageIndex: con.pageIndex, pageSize: con.pageSize },
                true
            );
        },
        /**
         * @function {function 刷新列表数据}
         * @param  {type} pageIndex {当前页数}
         * @param  {type} pageSize} {每页数量}
         * @param  {type} type} {是否需要重置搜索栏的loading状态判断条件}
         */
        refreshTable({ pageIndex, pageSize } = this.pagination, type = false) {
            this.setLoading(true);
            this.setTableMessage();
            const params = {
                data: {
                    PageIndex: pageIndex,
                    PageSize: pageSize,
                    ...this.searchData
                },
                complete: () => {
                    this.setLoading(false);
                    // 清除搜索栏按钮的Loading状态
                    if (type) {
                        this.$refs.search.setSearchLoading(false);
                    }
                }
            };

            apiGetTableList(params)
                .then(res => {
                    if (res.Code === code.success) {
                        this.tableData = res.Data.List;
                        this.pagination.total = res.Data.RecordCount;
                        this.pagination.pageSize = res.Data.PageSize;
                        this.pagination.pageIndex = res.Data.PageIndex;
                    } else {
                        this.clearTableData();
                        this.setTableMessage(res.Message);
                    }
                })
                .catch(() => {
                    this.setTableMessage(con.tableMessage);
                });
        },
        /**
         * @function {清除列表数据}
         */
        clearTableData() {
            this.tableData = [];
            this.pagination = {};
        },
        /**
         * @function {function 设置列表为空时内容}
         * @param  {type} msg {信息}
         */
        setTableMessage(msg) {
            this.tableMessage = msg || undefined;
        },
        /**
         * @function {function 设置loading状态}
         * @param  {type} type {loading值}
         */
        setLoading(type) {
            this.loading = type;
        },
        handleExport() {
            this.setLoading(true);
            const params = {
                data: this.searchData,
                complete: () => {
                    this.setLoading(false);
                }
            };

            apiExportExcel(params)
                .then(res => {
                    if (res.Code === code.success) {
                        // 此处进行操作
                        window.open(res.Data);
                    } else {
                        this.$message.error(res.Message);
                    }
                })
                .catch(() => {
                    this.$message.error(con.httpErrorMessage);
                });
        },
        /**
         * @function {公共事件BUS绑定}
         */
        handleBind() {
            //列表刷新绑定
            this.$bus.$on('refreshTable', params => {
                this.refreshTable(params);
            });
        },
        init() {
            this.handleBind();
            this.refreshTable();
        }
    }
};
</script>
