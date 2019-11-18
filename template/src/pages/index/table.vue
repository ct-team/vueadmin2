 <template>
    <div>
        <el-table
                v-loading="loading"
                :data="tableData"
                :empty-text="message"
                border
                style="width: 100%">
            <el-table-column
                        prop="id"
                        label="ID">
            </el-table-column>
            <el-table-column
                        prop="date"
                        label="日期">
            </el-table-column>
            <el-table-column
                        prop="name"
                        label="姓名">
            </el-table-column>
            <el-table-column
                        prop="address"
                        label="地址">
            </el-table-column>
            <el-table-column
                        label="操作"
                        width="180px">
            <template slot-scope="scope">
                <el-button
                        icon="el-icon-document"
                        type='text'
                        v-if="$dart.permission.is('view')"
                        @click="handleGoView(scope.row)">查看</el-button>
                <el-button
                        icon="el-icon-edit"
                        type='text'
                        v-if="$dart.permission.is('edit')"
                        @click="handleGoEdit(scope.row)">编辑</el-button>
                <dart-delete-button
                                style="margin-left:10px"
                                type='text'
                                icon='el-icon-delete'
                                v-if="$dart.permission.is('del')"
                                @ok="handleDelete(scope.$index, scope.row)"></dart-delete-button>
            </template>
            </el-table-column>
        </el-table>
    <div v-show="pagination.total > 0">
        <pagination
            :total="pagination.total"
            :page.sync="pagination.pageIndex" :limit.sync="pagination.pageSize" @pagination="handlePagination" />
    </div>

    </div>

</template>

<script>
import { apiDelTableRow } from '@/api/index/index';
import Pagination from '@/components/pagination';
import code from '@/config/index/code';
import con from '@/config/index/const.js';

export default {
    data() {
        return {
            tableData: this.data
        };
    },
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        loading: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: con.tableMessage
        },
        pagination: Object
    },
    components: {
        Pagination
    },
    watch: {
        data: {
            immediate: true,
            handler(v) {
                this.tableData = v;
            }
        }
    },
    methods: {
        /**
         * @function {分页点击处理事件}
         */
        handlePagination() {
            this.$bus.$emit('refreshTable');
        },
        handleGoEdit(row) {
            this.$router.push({
                path: 'edit',
                query: {
                    id: row.id
                }
            });
        },
        handleGoView(row) {
            this.$router.push({
                path: 'view',
                query: {
                    id: row.id
                }
            });
        },

        /**
         * @function {function 删除列表行数据}
         * @param  {type} index {列表数据下标,正式项目中请使用唯一id}
         */
        handleDelete(index) {
            const params = {
                data: {
                    id: index
                }
            };

            apiDelTableRow(params).then(res => {
                if (res.Code === code.success) {
                    this.$bus.$emit('refreshTable');
                    this.$message.success(res.Message);
                } else {
                    this.$message.error(res.Message);
                }
            }).catch(() => {
                this.$message.error(con.httpErrorMessage);
            });
        }
    }
};
</script>
