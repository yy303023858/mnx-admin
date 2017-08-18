<template>
  <div class="content-view">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div class="view-title">
      <span>简历下载管理</span>
      <Breadcrumb>
        <Breadcrumb-item>
          <router-link to="/">主页</router-link>
        </Breadcrumb-item>
        <Breadcrumb-item>客户管理</Breadcrumb-item>
        <Breadcrumb-item>简历下载管理</Breadcrumb-item>
      </Breadcrumb>
    </div>
  
    <Card class="search_card">
      <Form ref="formValidate" :model="formValidate" :label-width="110">
        <Row>
          <Col span="10">
          <Form-item label="公司名称">
            <Input v-model="formValidate.recName" placeholder="请输入公司名称"></Input>
          </Form-item>
          </Col>
          <Col span="10">
          <Form-item label="销售负责人">
            <Input v-model="formValidate.salesInfo" placeholder="请输入销售负责人"></Input>
          </Form-item>
          </Col>
        </Row>
        <div class="company-form-btn">
          <Button type="primary" @click="handleSubmit('formValidate')">查询</Button>
          <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </div>
      </Form>
    </Card>
    <Card class="form_card">
      <Table border :columns="columns" :data="data" :context="self"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pageTotal" :current="pageCurrent" @on-change="changePage" show-elevator show-total></Page>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      self: this,
      pageTotal: 0,
      pageCurrent: 1,
      spinShow: false,
      formValidate: {
        recName: '',
        salesInfo: ''
      },
      columns: [
        {
          title: '公司名称',
          key: 'fullName',
          align: 'center'
        },
        {
          title: '联系电话',
          key: 'phone',
          align: 'center'
        },
        {
          title: '联系邮箱',
          key: 'email',
          align: 'center'
        },
        {
          title: '销售负责人',
          key: 'salesInfo',
          align: 'center'
        },
        {
          title: '申请时间',
          key: 'applyTime',
          align: 'center'
        },
        {
          title: '联系类型',
          key: 'action',
          align: 'center',
          render(row, column, index) {
            return `<i-button type="primary" size="small" @click="resetPassword(${index})">续费意愿</i-button>`;
          }
        }
      ],
      data: [
        {
          fullName: '新城控股集团有限公司',
          phone: 9999,
          email: 999,
          salesInfo: '2017-03-30',
          applyTime: '2017-03-30'
        }
      ]
    }
  },
  methods: {
    handleSubmit() {

    },
    handleReset() {
      this.formValidate = {
        recName: '',
        salesInfo: ''
      }
    },
    changePage() { }
  }
}
</script>
<style>

</style>