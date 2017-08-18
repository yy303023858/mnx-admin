<template>
    <div id="app">
        <div id="login_container">
            <div id="login_view" ref="loginView">
                <Card id="login_panel">
                    <h1 id="login_header">
                        <img src="../../assets/minixiao.png" height="30" width="96">
                    </h1>
                    <Form ref="loginform" :model="loginform" :rules="ruleInline">
                        <Form-item prop="user" class="login_item">
                            <Input type="text" v-model="loginform.user" placeholder="账户">
                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                            </Input>
                        </Form-item>
                        <Form-item prop="password" class="login_item">
                            <Input type="password" v-model="loginform.password" placeholder="密码">
                                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                            </Input>
                        </Form-item>
                        <Button type="primary" @click="handleSubmit('loginform')" long>登录</Button>
                    </Form>
                </Card>
            </div>
            <canvas id="canvas" ref="canvas" width="100%" height="100%"></canvas>
        </div>
    </div>
</template>
<script>

	export default {
        data () {
            return {
                loginform: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        localStorage.setItem('user', this.loginform.user)
                        localStorage.setItem('password', this.loginform.password)
                        // this.$router.push('/')
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        },
        created() {
            this.$nextTick(() => {
                var loginView = this.$refs.loginView;
                var canvas = this.$refs.canvas;
                canvas.width = loginView.clientWidth;
                canvas.height = loginView.clientHeight;
                var ctx;
                var MaxCircles = 80;
                var particles = [];
                var circleX;
                var circleY;

                function main(){ 
                    ctx = canvas.getContext("2d");
                    var frame = function(){
                        draw();
                        update();
                        requestAnimationFrame(frame,canvas);
                    };
                    requestAnimationFrame(frame,canvas);  
                }


                function Circles(x,y,xSpeed,ySpeedS){
                    this.radius = 0.5;//15;
                    circlePos();
                    this.x = circleX;
                    this.y = circleY; 
                    this.xSpeed = (Math.random() - Math.random()); //2
                    this.ySpeed = (Math.random() - Math.random()); //2
                    this.color = '#000';
                } 

                main();
                function circlePos(){
                    circleX = (canvas.width-2)*Math.random();//+rad;
                    circleY = (canvas.height-2)*Math.random();//+rad;
                }
                for(var i = 1; i < MaxCircles; i++){
                    particles[i] = new Circles()
                }
                particles[0] = {};

                function draw(){
                    ctx.clearRect(0,0,canvas.width,canvas.height);
                    drawCircles();
                }


                function update(){
                    updateCircles();
                }


                function updateCircles(){
                    for(var i=1; i<particles.length; i++){
                        particles[i].x += particles[i].xSpeed;
                        particles[i].y += particles[i].ySpeed;
                        
                        if(particles[i].x + particles[i].radius > canvas.width ){  // if the x component of particle makes it leave the canvas
                            particles[i].x = canvas.width - particles[i].radius;   // puts particle within canvas
                            particles[i].xSpeed =-particles[i].xSpeed; // reverses x component of speed of Atom
                        }
                        if(particles[i].x < particles[i].radius){
                            particles[i].x = particles[i].radius;
                            particles[i].xSpeed =-particles[i].xSpeed;
                        }
                        if(particles[i].y  + particles[i].radius > canvas.height){
                            particles[i].y = canvas.height - particles[i].radius;
                            particles[i].ySpeed =-particles[i].ySpeed;
                        }
                        if(particles[i].y < particles[i].radius){
                            particles[i].y = particles[i].radius;
                            particles[i].ySpeed =-particles[i].ySpeed;
                        } 
                    }
                }


                function drawCircles(){
                    for(var i = 0; i < particles.length; i++){      
                        ctx.beginPath();
                        ctx.arc(particles[i].x, particles[i].y, particles[i].radius, 0, 2 * Math.PI, false);        
                        ctx.fill();
                        ctx.stroke();
                        ctx.fillStyle = '#bebebe';
                        
                        for(var j = 1; j < particles.length; j++){
                            var dis = Math.sqrt(Math.pow((particles[j].x - particles[i].x),2) +  Math.pow((particles[j].y - particles[i].y),2));
                            if(dis < 130){
                                var width;
                                if( 1 > 10 / dis){
                                   width = 10 / dis;
                                }else{
                                   width = 0.8;
                                }
                                ctx.beginPath();
                                ctx.moveTo(particles[i].x,particles[i].y);
                                ctx.lineTo(particles[j].x, particles[j].y);
                                ctx.strokeStyle = '#bebebe';
                                ctx.lineWidth = width;
                                ctx.stroke();
                            }
                        }
                    }   
                }  

                function getMousePos(canvas, evt) {
                    var rect = canvas.getBoundingClientRect();
                    return {
                      x: evt.clientX - rect.left,
                      y: evt.clientY - rect.top
                    };
                }
                 
                canvas.addEventListener('mousemove', function(evt){
                    var mousePos = getMousePos(canvas, evt);
                    particles[0] = {
                        radius:0.5,
                        x: mousePos.x,
                        y: mousePos.y
                    }       
                }, false);


                canvas.addEventListener('click', function(evt){
                    var mousePos = getMousePos(canvas, evt);           
                       particles.push({
                            radius:0.75,
                            x: mousePos.x,
                            y: mousePos.y,
                            xSpeed:(Math.random() - Math.random()),
                            ySpeed:(Math.random() - Math.random())
                        },{radius:0.75,
                            x: mousePos.x,
                            y: mousePos.y,
                            xSpeed:(Math.random() - Math.random()),
                            ySpeed:(Math.random() - Math.random())
                        },{radius:0.75,
                            x: mousePos.x,
                            y: mousePos.y,
                            xSpeed:(Math.random() - Math.random()),
                            ySpeed:(Math.random() - Math.random())
                        },{radius:0.75,
                            x: mousePos.x,
                            y: mousePos.y,
                            xSpeed:(Math.random() - Math.random()),
                            ySpeed:(Math.random() - Math.random())
                        });
                        
                }, false);
            })
        }
    }

</script>
<style>
    #login_container{position: absolute;width: 100%;height: 100%;}
	#login_view{display: flex;justify-content: center;align-items: center;height: 100%;background: #f5f7f9;}
	#login_panel{position: relative;z-index: 50; width: 440px;margin-top: -10%;padding: 30px;}
	#login_header{text-align: center;margin-bottom: 22px;}
	#login_panel .ivu-form-item{margin-bottom: 28px;}
    #canvas{position: absolute;top: 0;left: 0;}
</style>