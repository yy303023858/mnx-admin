<template>
	<div class="layout-header">
		<Dropdown class="project_menu" trigger="click" style="margin-left: 10px" placement="bottom-start">
			<a href="javascript:void(0)" class="project_menu_btn">
				<Icon type="android-menu"></Icon>
			</a>
			<Dropdown-menu slot="list" style="width: 180px;">
				
				<Dropdown-item>客户管理</Dropdown-item>
				<Dropdown-item>数据统计</Dropdown-item>
				<Dropdown-item>学生管理</Dropdown-item>
				<Dropdown-item>活动管理</Dropdown-item>
				<Dropdown-item>公司管理</Dropdown-item>
			</Dropdown-menu>
		</Dropdown>
		<div class="header_logo">
			<img src="../../assets/minixiao2.png">
		</div>
		<Dropdown class="right" trigger="click">
			<div class="avatar-badge">
				<img src="../../assets/minixiao.gif">
			</div>
			<a href="javascript:void(0)" class="header-name">
				admin
				<Icon type="arrow-down-b"></Icon>
			</a>
			<Dropdown-menu slot="list">
				<Dropdown-item @click.native="logout">退出</Dropdown-item>
			</Dropdown-menu>
		</Dropdown>
	</div>
</template>
<script>
export default {

}
</script>
<style></style>
