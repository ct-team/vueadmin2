<template>
    <dart-slide
        :visible="slideVisible"
        :title="slideTitle"
        width="60%"
        :loading="slideLoading"
        :afterClose="handleClose"
    >
        <el-form
            :model="formData"
            :rules="rules"
            ref="addForm"
            label-width="auto"
            class="dt-form"
        >
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="日期" prop="date">
                <el-date-picker v-model="formData.date" type="date">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input type="textarea" v-model="formData.address"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </dart-slide>
</template>
<script>
import { apiSaveAddForm } from '@/api/index/index';
import code from '@/config/index/code';
import con from '@/config/index/const';

export default {
    data() {
        return {
            slideVisible: true, //侧边栏显示状态
            slideLoading: false, //侧边栏loading状态
            slideTitle: '新增', //侧边栏标题
            formData: {
                //表单数据
                name: '',
                date: '',
                address: ''
            },
            rules: {
                //表单验证规则
                name: [
                    {
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ],
                date: [
                    {
                        required: true,
                        message: '请输入活动时间',
                        trigger: 'blur'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    this.saveData();
                } else {
                    this.$message({
                        message: con.errorMessage,
                        type: 'error'
                    });
                    return false;
                }
            });
        },
        saveData() {
            this.setSlideLoading(true);
            const params = {
                data: this.formData,
                complete: () => {
                    this.setSlideLoading(false);
                }
            };

            apiSaveAddForm(params)
                .then(res => {
                    if (res.Code === code.success) {
                        this.handleClose();
                        this.$bus.$emit('refreshTable', {
                            pageIndex: con.pageIndex,
                            pageSize: con.pageSize
                        });
                        this.$message.success(res.Message);
                    } else {
                        this.$message.error(res.Message);
                    }
                })
                .catch(() => {
                    this.$message.error(con.httpErrorMessage);
                });
        },
        handleClose() {
            this.$router.push({ path: '/' });
        },
        /**
         * @function {设置侧边栏loading状态}
         * @param  {Boolean} type {状态}
         */
        setSlideLoading(type) {
            this.slideLoading = type;
        }
    }
};
</script>
<style lang="scss">
@import '../../../assets/scss/form.scss';
</style>
