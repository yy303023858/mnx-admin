<template>
	<Menu width="auto" id="layout-left-menu">
	    <!--<div class="mini-logo">-->
	        <!--<img src="../../assets/minixiao.png">-->
	    <!--</div>-->
	    <Submenu name="1" v-if="rec"></div>
	        <template slot="title">
	            <Icon type="ios-paper"></Icon>
	            客户管理
	        </template>
	        <Menu-item name="1-1"><router-link to="/rec/add" class="link">创建公司账号</router-link></Menu-item>
	        <Menu-item name="1-2"><router-link to="/rec/list" class="link">公司查询</router-link></Menu-item>
	        <Menu-item name="1-3"><router-link to="/rec/intention" class="link">合作申请列表</router-link></Menu-item>
	        <!--<Menu-item name="1-4"><router-link to="/rec/downloadSetting" class="link">简历下载管理</router-link></Menu-item>			-->
	    </Submenu>
	    <Submenu name="2" v-if="stats">
	        <template slot="title">
	            <Icon type="stats-bars"></Icon>
	            数据统计
	        </template>
	        <Menu-item name="2-1"><router-link to="/stats/recruiters" class="link">公司数据统计</router-link></Menu-item>
	        <Menu-item name="2-2"><router-link to="/stats/intentions" class="link">自主注册客户</router-link></Menu-item>
	        <Menu-item name="2-3"><router-link to="/stats/special" class="link">专项统计</router-link></Menu-item>
	        <Menu-item name="2-4"><router-link to="/stats/job" class="link">职位数据统计</router-link></Menu-item>
	        <Menu-item name="2-5"><router-link to="/stats/students" class="link">学生数据统计</router-link></Menu-item>
	        <Menu-item name="2-6"><router-link to="/stats/application" class="link">投递数据统计</router-link></Menu-item>
	        <!-- <Menu-item name="2-7"><router-link to="/stats/au" class="link">用户活跃度</router-link></Menu-item> -->
	        <Menu-item name="2-8"><router-link to="/stats/doc" class="link">数据统计口径</router-link></Menu-item>
	    </Submenu>
	    <Submenu name="3" v-if="stu">
	        <template slot="title">
	            <Icon type="ios-people"></Icon>
	            学生管理
	        </template>
	        <Menu-item name="3-1"><router-link to="/stu/students" class="link">学生管理</router-link></Menu-item>
	    </Submenu>
	    <Submenu name="4" v-if="act">
	        <template slot="title">
		        <Icon type="ios-game-controller-b"></Icon>
	            活动管理
	        </template>
	        <Menu-item name="4-1"><router-link to="/act/activities" class="link">活动管理</router-link></Menu-item>
	    </Submenu>
	    <Submenu name="5" v-if="company">
	        <template slot="title">
		        <Icon type="fireball"></Icon>
	            公司管理
	        </template>
	        <Menu-item name="5-1"><router-link to="/company/list" class="link">公司管理</router-link></Menu-item>
	    </Submenu>
		<Submenu name="6" v-if="ad">
	        <template slot="title">
				<Icon type="social-rss"></Icon>
	            广告位管理
	        </template>
	        <Menu-item name="6-1"><router-link to="/ad/rec" class="link">首页-名企校招</router-link></Menu-item>
	        <Menu-item name="6-2"><router-link to="/ad/hot" class="link">首页-热招职位</router-link></Menu-item>
	        <!--<Menu-item name="6-3"><router-link to="/ad/banner" class="link">首页-banner</router-link></Menu-item>-->
	    </Submenu>
	</Menu>
</template>
<script>
	export default{
		props: {
			rec: {
				default: false
			},
			stats: {
				default: false
			},
			stu: {
				default: false
			},
			act: {
				default: false
			},
			company: {
				default: false
			},
			ad: {
				default: false
			}
		},
		methods: {
			logout() {
	    		console.log('退出')
	    		delete localStorage.user
	    		delete localStorage.password
	    		this.$router.push('/login')
	    	}
		}
	}
</script>
<style></style>