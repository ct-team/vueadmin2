<template>
  <el-popover placement="top"
              v-model="visible"
              width="160">
    <p>确定删除吗？</p>
    <div style="text-align: right; margin: 0">
      <el-button type="text"
                 @click="handelCancle">取消</el-button>
      <el-button type="primary"
                 @click="handelOk">确定</el-button>
    </div>
    <el-button type="danger"
               icon="el-icon-close"
               :loading="currLoading"
               slot="reference">删除</el-button>
  </el-popover>
</template>
<script>
export default {
    name: '',
    data() {
        return {
            visible: false,
            currLoading: false
        };
    },
    props: {
        loading: {}
    },
    methods: {
        handelCancle() {
            this.visible = false;
        },
        handelOk() {
            this.$emit('onOk');
            this.setVisble(false);
        },
        setVisble(type) {
            this.visible = type;
        }
    },
    watch: {
        loading: {
            immediate: true,
            handler(v) {
                if (typeof v === 'undefined') {
                    this.currLoading = false;
                    return;
                }
                this.currLoading = v;
            }
        }
    }
};
</script>
