<template>
    <div class="dt-breadcrumb">
        <dart-toolbar :brand-visible="brandVisible">
            <div slot="content">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>首页</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </dart-toolbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            brandVisible: true
        };
    }
};

</script>
<style lang='scss' scoped>
.dt-breadcrumb {
    margin-bottom: 10px;
}
</style>
