<template>
    <div class="company">
        <Layout>
            <Header>
                <above/>
            </Header>
            <Layout style="position:absolute;top: 64px;bottom: 0px;left: 0px;right: 0px;">
                <Sider hide-trigger :style="{background: '#fff',maxWidth:'320px',minWidth:'320px'}">
                    <menuCheck active="2-2"/>
                </Sider>
                <Content>
                    <div>系统管理>用户管理</div>
                    <Card dis-hover style="height:100%">
                        <Row>
                            <Col span=4>
                                <Button @click="newUser" type="text">新建用户</Button>
                                <Poptip trigger="hover" content="批量导入数据">
                                    <Button icon="ios-open-outline" @click="leadIn" />
                                </Poptip>
                            </Col>
                            <Col span="4">
                                <Select v-model="userCompany" placeholder="选择公司" :label-in-value="true" @on-change="v=>{enable(v,'type')}" clearable>
                                    <Option v-for="item in companyList" :value="item.value" :key="item.value">{{item.label}}</Option>
                                </Select>
                            </Col>
                            <Col span="4">
                                <Select v-model="userState" placeholder="选择角色">
                                    <Option value="">全部</Option>
                                    <Option value="需求发起人">需求发起人</Option>
                                    <Option value="支撑接口人">支撑接口人</Option>
                                </Select>
                            </Col>
                            <Col span="9">
                                <Input v-model="companySearch" placeholder="姓名/手机"/>
                            </Col>
                            <Col span="3">
                                <Button @click="search">查询</Button>
                            </Col>
                        </Row> 
                        <div>
                            <Button @click="del1">批量删除</Button>
                        </div>
                        <Table 
                        :data="data" 
                        :columns="columns" 
                        @on-row-click="goto"
                        @on-select="select"
                        @on-select-cancel="selectCancel"
                        @on-select-all="selectAll"
                        @on-select-all-cancel="selectAllCancel">
                            <template slot-scope="{ row, index }" slot="action">
                                <Button type="text" size="small" @click="del(index)">删除</Button>
                                <Button type="text" size="small" @click="change(index)">修改</Button>
                                <Button type="text" size="small" @click="reset(index)">重置密码</Button>
                            </template>
                            <Page
                            :total="total"
                            :current="page"
                            :page-size="10"
                            show-total
                            @on-change="pageChange"
                            slot="footer"
                            show-elevator
                            />      
                        </Table>
                    </Card>
                </Content>  
            </Layout>
        </Layout>
        <Modal v-model="delFlag" title="提示" @on-ok="delOk">
            <p>此操作将永久删除用户相关数据，是否确认删除？</p>
        </Modal>
        <Modal v-model="resetFlag" title="提示" @on-ok="resetOk">
            <p>确认重置密码？（默认密码为123456）</p>
        </Modal>
    </div>
</template>

<script>
import qs from 'qs'
import axios from '../../api/axios'
import above from '../../components/layout/above'
import menuCheck from '../../components/layout/menuCheck'
export default {
    components:{
        above,
        menuCheck,
    },
    data(){
        return{
            selected:[],//存放选择到的选项
            total:'',
            progressData: [],//调用接口获取数据
            page: 1,//默认为第一页
            userCompany:'',//用户的公司
            companySearch:'',//搜索公司的字段
            data:[],//后台来的数据
            companyList:'',//下拉菜单公司列表的
            columns: [//Todo写成和后台一样的
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '登录账号',
                    key: 'userAcount'
                },
                {
                    title: '用户姓名',
                    key: 'userName'
                },
                {
                    title: '手机',
                    key: 'telphone'
                },
                {
                    title: '所属公司',
                    key: 'companyName'
                },
                {
                    title: '用户角色',
                    key: 'roleName'
                },
                {
                    title: '注册时间',
                    key: 'createTime'
                },
                {
                    title:'操作',
                    slot:'action',
                    align:'center'
                }
            ],
        }
    },
    created(){
        this.getData(1);
        this.getCompany();
    },
    methods: {
        select(selection,row){
            console.log(selection,row)
            for(var i=0;i<selection.length;i++){
                this.selected[i]=selection[i].uuid
            }
            console.log(this.selected)
        },
        selectCancel(selection,row){
            console.log(selection,row)
            for(var i=0;i<selection.length;i++){
                this.selected[i]=selection[i].uuid
            }
        },
        selectAll(selection){
            console.log(selection)
            for(var i=0;i<selection.length;i++){
                this.selected[i]=selection[i].uuid
            }
        },
        selectAllCancel(selection){
            console.log(selection)
            for(var i=0;i<selection.length;i++){
                this.selected[i]=selection[i].uuid
            }
        },
        getCompany(){
            axios.axios({
                method:'get',
                url:'userinfo/getAllCompany',
            }).then((data)=>{
                this.companyList=data.data.data
                for(var i=0;i<this.companyList.length;i++){
                        this.companyList[i].value=this.companyList[i].comName
                        this.companyList[i].label=this.companyList[i].comName
                    }
                console.log(this.companyList)
            });
        },
        del1(){
            var selected=qs.stringify(this.selected)
            axios.axios({
                method:'post',
                url:'userinfo/deleteUser',
                data:{uuidList:selected}
            }).then((data)=>{
                console.log(data)
            });
        },
            //Todo 这里写弹出确认删除对话框的方法
        change(){
            //Todo 这里写转到修改用户的方法
        },
        reset(){
            //Todo 这里写弹出确认重置密码对话框的方法
        },
        delOk(){
            this.$Modal.success({
                            title: "提示",
                            content: "删除成功"
                        });//这里是创建一个成功对话框
                        //Todo在这里写删除用户的方法
        },
        resetOk(){
            this.$Modal.success({
                            title: "提示",
                            content: "更新成功"
                        });//这里是创建一个成功对话框
                        //Todo 在这里写重置用户密码的方法
        },
        search(){
            this.getData(1);
            this.page=1;
        },
        leadIn(){
            axios.axios({
                method:'get',
                url:'userinfo/companyDownload'
            })
            //Todo批量导入的方法
        },
        newUser(){
            this.$router.push('/userOperate')
            //Todo转到新建角色界面
        },
        getData(page){
            axios.axios({
                method:'post',
                url:'userinfo/list',
                data:{pageSize:this.pageSize,currentPage:page,condition:{roleName:this.userState,company:this.userCompany,key:this.companySearch}},
                headers:{'token':localStorage.getItem("token")}
            }).then((data)=>{
                this.total=data.data.total;
                this.data=data.data.data;
                console.log(data)
            });
        },
        goto(data){
            this.$router.push(
                {
                    path:'/userOperate',
                    query:{data:data}
                }
            )
        },
        pageChange(page) {
            this.page = page ;
            this.getData(page);
            console.log(this.page);
        },
    },
}
</script>

<style lang="scss" scoped>
    .user{
        height: 100%;
        width: 100%;
    }
</style>