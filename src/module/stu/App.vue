<template>
    <div id="app">
        <div class="layout">
            <mHeader></mHeader>
            <Row type="flex">
                <Col class="layout-left">
                    <leftSider :stu="true"></leftSider>
                </Col>
                <Col class="layout-right">
                    <div class="layout-content">
                        <keep-alive exclude="stuApplication">
                            <router-view></router-view>
                        </keep-alive>
                    </div>
                    <mFooter></mFooter>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    import leftSider from '@/components/left-sider/left-sider'
    import mHeader from '@/components/header/header'
    import mFooter from '@/components/footer-copy/footer-copy'
    export default {
        data () {
            return {
            }
        },
        components: {
            leftSider,
            mHeader,
            mFooter
        }
    }
</script>
<style></style>
