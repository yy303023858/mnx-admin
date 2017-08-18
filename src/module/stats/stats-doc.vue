<template>
    <div class="content-view">
        <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->
        <div class="view-title">
            <span>数据统计口径</span>
            <Breadcrumb>
                <Breadcrumb-item><router-link to="/">主页</router-link></Breadcrumb-item>
                <Breadcrumb-item>数据统计</Breadcrumb-item>
                <Breadcrumb-item>数据统计口径</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <Card class="form_card">
        	<div class="ivu-table-wrapper">
        		<table cellspacing="0" cellpadding="0" border="0" style="width:100%" class="ivu-table ivu-table-border">
        			<thead class="ivu-table-header">
        				<tr>
        					<th class="ivu-table-column-center">类型</th>
        					<th class="ivu-table-column-center">指标名称</th>
        					<th class="ivu-table-column-center">指标定义</th>
        					<th class="ivu-table-column-center" width="200">备注</th>
        				</tr>
        			</thead>
        			<tbody class="ivu-table-tbody">
        				<tr class="ivu-table-row">
        					<td class="ivu-table-column-center" rowspan="5">公司</td>
        					<td>签单KA客户量</td>
        					<td>截止到当天销售线下签单成功的客户量</td>
        					<td>当天以24点为准</td>
        				</tr>
        				<tr>
        					<td>签单自助申请客户量</td>
        					<td>截止到当天客户在pc端企业入口自行注册并签单成功的客户量</td>
        					<td>以签单时间为准</td>
        				</tr>
        				<tr>
        					<td>客户公司总量</td>
        					<td>截止到当天客户公司的数量（签单KA客户量+签单自助申请客户量）</td>
        				</tr>
        				<tr>
        					<td>待审核客户公司量</td>
        					<td>截止到当天客户公司进入待审核的数量</td>
        				</tr>
        				<tr>
        					<td>有在线职位客户公司量</td>
        					<td>截止到当天有在线职位的客户公司数量</td>
        				</tr>
        				<tr class="ivu-table-row">
        					<td class="ivu-table-column-center" rowspan="5">自主注册客户跟进情况</td>
        					<td>自主注册客户总量</td>
        					<td>截止到当天客户在pc端企业入口自行注册量</td>
        					<td>自主注册客户总量=待处理客户量+跟进中客户量+已签单客户量+已拒单客户量</td>
        				</tr>
        				<tr>
        					<td>待处理客户量</td>
        					<td>截止到当天还未有销售负责人跟单的客户量</td>
        				</tr>
        				<tr>
        					<td>跟进中客户量</td>
        					<td>截止到当天已有销售负责人跟单的客户量</td>
        				</tr>
        				<tr>
        					<td>已签单客户量</td>
        					<td>截止到当天客户已经和迷你校签约的客户量</td>
        				</tr>
        				<tr>
        					<td>已拒单客户量</td>
        					<td>截止到当天客户拒绝和迷你校签约的客户量</td>
        				</tr>
        				<tr class="ivu-table-row">
        					<td class="ivu-table-column-center" rowspan="4">专项统计</td>
        					<td>目标简历数</td>
        					<td>针对某一客户在特定时间段内要实现的简历接收数量</td>
        					<td>有时间限制  需手动输入目标简历数和时间范围</td>
        				</tr>
        				<tr>
        					<td>当日实收简历数</td>
        					<td>当天实际收到的简历总数量</td>
        					<td>有时间限制</td>
        				</tr>
        				<tr>
        					<td>当日在线职位量</td>
        					<td>当天某客户公司的在线职位量</td>
        					<td>有时间限制</td>
        				</tr>
        				<tr>
        					<td>简历完成率</td>
        					<td>截止到当天实收简历总数/目标简历数</td>
        					<td>有时间限制</td>
        				</tr>
        				<tr class="ivu-table-row">
        					<td class="ivu-table-column-center" rowspan="4">职位</td>
        					<td>客户公司创建职位总量</td>
        					<td>截止到当天客户公司创建过的所有职位的数量</td>
        				</tr>
        				<tr>
        					<td>客户公司职位待审核量</td>
        					<td>截止到当天客户公司职位进入待审核的数量</td>
        				</tr>
        				<tr>
        					<td>客户公司在线职位量</td>
        					<td>截止到当天客户公司在线职位的数量（可投递+不可投递）</td>
        				</tr>
        				<tr>
        					<td>客户公司可投递职位量</td>
        					<td>截止到当天客户公司在线可投递职位的数量</td>
        				</tr>
        				<tr class="ivu-table-row">
        					<td class="ivu-table-column-center" rowspan="7">学生</td>
        					<td>总注册用户量</td>
        					<td>截止到当天学生总注册量（pc+移动）</td>
        				</tr>
        				<tr>
        					<td>pc端累计注册量</td>
        					<td>截止到当天学生在PC端的注册量</td>
        				</tr>
        				<tr>
        					<td>移动端累计注册量</td>
        					<td>截止到当天学生在移动端的注册量</td>
        				</tr>
        				<tr>
        					<td>总简历量</td>
        					<td>截止到当天学生填写了至少一个字段的简历的数量（pc+移动）</td>
        				</tr>
        				<tr>
        					<td>PC端累计创建简历量</td>
        					<td>截止到当天学生在PC端完善了“姓名”及其他字段的数量</td>
        					<td>以在pc端完善了“姓名”字段为准</td>
        				</tr>
        				<tr>
        					<td>移动端累计创建简历量</td>
        					<td>截止到当天学生在移动端完善了“姓名”及其他字段的的数量</td>
        					<td>以在移动端完善了“姓名”字段为准</td>
        				</tr>
        				<tr>
        					<td>有效简历量</td>
        					<td>截止到当天的学生完整填写了全部必填字段的简历</td>
        					<td>基本信息、教育经历、实习经历、项目经验中所有必填字段被完善</td>
        				</tr>
        				<tr class="ivu-table-row">
        					<td class="ivu-table-column-center" rowspan="6">投递情况</td>
        					<td>当日申请表创建量</td>
        					<td>当天学生创建的申请表数量（站内+站外）</td>
        				</tr>
        				<tr>
        					<td>当日站内申请表创建量</td>
        					<td>当天学生创建的投递站内职位的申请表数量</td>
        				</tr>
        				<tr>
        					<td>当日站外申请表创建量</td>
        					<td>当天学生创建的投递站外职位的申请表数量</td>
        					<td>多次投递算作多次</td>
        				</tr>
        				<tr>
        					<td>当日站内投递成功申请表量</td>
        					<td>当天投递站内职位的申请表中，状态变为“已投递”的数量</td>
        				</tr>
        				<tr>
        					<td>当日创建申请表用户量</td>
        					<td>当天创建了申请表（站内+站外）的用户数量</td>
        				</tr>
        				<tr>
        					<td>截止当日站内待投递申请表总量</td>
        					<td>截止到当天投递站内的申请表中，状态为“待投递”的数量</td>
        				</tr>
        				<tr class="ivu-table-row">
        					<td class="ivu-table-column-center" rowspan="5">整体</td>
        					<td>日总活跃用户量</td>
        					<td>当天至少有一次活跃行为的用户（pc+移动 去重）</td>
        					<td>活动行为包括两种：1、成功进行注册或者登录 2、自动登录后至少访问过一次非登录页</td>
        				</tr>
        				<tr>
        					<td>月总活跃用户量</td>
        					<td>当月至少有一次活跃行为的用户（pc+移动 去重）</td>
        				</tr>
        				<tr>
        					<td>新增注册用户量</td>
        					<td>当天新增的注册用户量（PC端+移动端）</td>
        				</tr>
        				<tr>
        					<td>新增简历量</td>
        					<td>当天新增的至少填写了一个字段的简历数量（PC端+移动端）</td>
        				</tr>
        				<tr>
        					<td>新增有效简历量</td>
        					<td>当天新增的学生完整填写了全部必填字段的简历量（PC端+移动端）</td>
        					<td>基本信息、教育经历、实习经历、项目经验中所有必填字段被完善</td>
        				</tr>
        				<tr class="ivu-table-row">
        					<td class="ivu-table-column-center" rowspan="4">PC端</td>
        					<td>日活跃用户量</td>
        					<td>当天至少有一次活跃行为的用户（pc）</td>
        				</tr>
        				<tr>
        					<td>月活跃用户量</td>
        					<td>当月至少有一次活跃行为的用户（pc）</td>
        				</tr>
        				<tr>
        					<td>新增注册用户量</td>
        					<td>当天新增的PC端注册用户量</td>
        				</tr>
        				<tr>
        					<td>新增简历量</td>
        					<td>截止到当天学生在PC端完善了“姓名”字段及其他字段的数量</td>
        					<td>以在PC端完善了“姓名”字段为准</td>
        				</tr>
        				<tr class="ivu-table-row">
        					<td class="ivu-table-column-center" rowspan="4">移动端</td>
        					<td>日活跃用户量</td>
        					<td>当天至少有一次活跃行为的用户（移动）</td>
        				</tr>
        				<tr>
        					<td>月活跃用户量</td>
        					<td>当月至少有一次活跃行为的用户（移动）</td>
        				</tr>
        				<tr>
        					<td>新增注册用户量</td>
        					<td>当天新增的移动端注册用户量</td>
        				</tr>
        				<tr>
        					<td>新增简历量</td>
        					<td>截止到当天学生在移动端完善了“姓名”字段及其他字段的数量</td>
        					<td>以在移动端完善了“姓名”字段为准</td>
        				</tr>
        			</tbody>
        		</table>
        	</div>
        </Card>
    </div>
</template>
<script>
	export default {
		
	}
</script>
<style>
	.ivu-table-row ul li{border-bottom: 1px solid #f0f3f6;}
	.ivu-table-row ul li:last-child{border-bottom: none;}
</style>