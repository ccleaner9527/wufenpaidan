<template>
    <div class="settle">
        <Modal v-model="state1" title="提示" @on-ok="ok(1)" @on-cancel="cancel(1)">
            <Row> 提交给支撑接口人进行结算？</Row>
        </Modal>
        <Modal v-model="state2" title="审核意见" >
            <Row>工单编号：{{listNumber}}</Row>
            <Row>
                <Col span="8">审核意见:</Col>
                <Col span="16">
                    <Input type="textarea" v-model="opinion"/>
                </Col>
            </Row>
            <div slot="footer">
                <Button @click="cancel(2)">驳回</Button>
                <Button @click="ok(2)">确认结束</Button>
            </div>
        </Modal>
    </div>
</template>

<script>//要写审核按钮什么时候可用的方法
export default {
    props:{
        state1:Boolean,
        state2:Boolean,
        },
    data(){
        return{
            listNumber:'',
            opinion:'',
        }
    },
    methods:{
        ok(id){
            if(id===1){
                //Todo 这里写确认开始结算的方法
            }
            if(id===2){
                //Todo 这里写结算结束的方法
            }
        },
        cancel(id){
           if(id===1){
                //Todo 这里写关闭第一个对话框的方法
            }
            if(id===2){
                //Todo 这里写驳回结算请求的方法
            }
        }
    }
}
</script>