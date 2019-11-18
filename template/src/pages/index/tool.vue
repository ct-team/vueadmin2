<template>
    <div class="dt-tool">
        <el-row>
            <el-button
                plain
                icon="el-icon-plus"
                @click="handleGoAdd">新增</el-button>
            <el-button
                    plain
                    icon="el-icon-download"
                    @click="handleExport">导出</el-button>
        </el-row>
    </div>
</template>

<script>
export default {
    methods: {
        handleGoAdd() {
            this.$router.push({ path: 'add' });
        },
        handleExport() {
            this.$emit('export');
        }
    }
};
</script>

<style lang="scss" scoped>
.dt-tool{
    margin-bottom: 10px;
    text-align: right;
}
</style>
