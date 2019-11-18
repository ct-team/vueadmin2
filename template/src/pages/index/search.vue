<template>
    <dart-search
        :model="formData"
        :rules="rules"
        ref="search">
        <template slot="search-form">
            <dart-search-item
                label="姓名"
                prop="name">
                <el-input
                        v-model="formData.name"></el-input>
            </dart-search-item>
            <dart-search-item
                label="时间"
                :span="16">
                <dart-date-range
                            v-model="formData.date"
                            value-format='timestamp'></dart-date-range>
            </dart-search-item>
            <dart-search-item
                label="地址">
                <el-select
                        v-model="formData.address"
                        placeholder="请选择">
                    <el-option
                            label="上海"
                            value="shanghai"></el-option>
                    <el-option
                            label="北京"
                            value="beijing"></el-option>
                </el-select>
            </dart-search-item>
        </template>
        <template slot="search-btn">
            <el-button
                type="primary"
                :loading="loading"
                icon="el-icon-search"
                @click="handleSearch">查询</el-button>
        </template>
    </dart-search>
</template>

<script>
import con from '@/config/index/const';
export default {
    data() {
        return {
            formData: {
                //搜索表单数据
                name: '',
                address: '',
                date: ''
            },
            loading: false, // 按钮搜索loading
            rules: {
                //验证规则
                name: [
                    { required: true, message: '请输入审批人', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSearch() {
            this.$refs.search.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.setSearchLoading(true);
                    this.$emit('onSearch', this.formData);
                } else {
                    this.$message({
                        message: con.errorMessage,
                        type: 'error'
                    });
                    return false;
                }
            });
        },
        setSearchLoading(type) {
            this.loading = type;
        }
    }
};
</script>
