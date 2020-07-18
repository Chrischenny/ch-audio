<template>
    <div ref="audio" class="ch-audio">

        <audio ref="oad" preload="auto">
            <source ref="oadSor" :src="audioSrc" type="audio/mp3"/>
        </audio>
        
        <img :src="playimg" class="ch-audio__img" v-if="stop" @click="playAudio">
        <img :src="stopimg" class="ch-audio__img" v-if="!stop" @click="stopAudio">

        
        <div class="ch-audio-controlplain">
            <div ref="block" :style="[{width:totalWidth}]" class="ch-audio-clickblock">

                <div class="ch-audio-progress__indicator" ref="indicator" :style="[{left:indicatorLeft}]"></div>

                <div class="ch-audio-progress" :style="[{width:totalWidth},]" ref="block">   

                    <div class="ch-audio-progress__innerprogress" ref="progress" :style="[{width:progressWidth}]"></div>

                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script>
export default {
    name:'chAudio',
    data(){
        return{
            url:'',
            stop:true,//暂停标志
            progressX:0,//进度条宽度数值，缓存用
            offset:0,//进度条与屏幕的距离
            audioitself:null,//缓存audio
            block:null//缓存触摸区域
        }
    },
    props:{
        audioSrc:{ //audio资源路径
            type:String,
            default:''
        },
        width:{ //进度条宽度
            type:Number,
            
        },
        rem:{ //是否开启rem丈量尺度
            type:Boolean,
            default:false
        },
        playimg:{
            type:String,
            default:''
        },
        stopimg:{
            type:String,
            default:''
        }
    },
    methods:{
        playAudio(){ //播放
            this.stop = !this.stop;
            this.$refs.oad.play();
        },
        stopAudio(){ //暂停
            this.stop = !this.stop;
            this.$refs.oad.pause();
        },
        handleTouchstart(e){//触摸事件开始事件
            //移动开始，移除timeupdate事件，防止对进度条产生干扰；
            this.audioitself.removeEventListener('timeupdate',this.handleTimeupdate);
            this.progressX = e.changedTouches[0].clientX - this.offset;
        },

        handleTouchmove(e){//触摸移动侦听事件
            if(e.changedTouches[0].clientX - this.offset>this.width){
                this.progressX = this.width;
            }else if(e.changedTouches[0].clientX - this.offset<0){
                this.progressX = 0;
            }else{
                this.progressX = e.changedTouches[0].clientX - this.offset;
            }
        },
        handleTouchend(e){//触摸结束侦听事件
            this.audioitself.currentTime = ((e.changedTouches[0].clientX-this.offset)/this.width)*this.audioitself.duration;
            //触摸事件结束，重新添加timeupdate事件
            this.audioitself.addEventListener('timeupdate',this.handleTimeupdate);
        },
        handleTimeupdate(){//播放进度侦听事件
            this.progressX = this.width*(this.audioitself.currentTime/this.audioitself.duration)
        },
    },
    mounted(){
        var ua = navigator.userAgent.toLowerCase();
        this.audioitself = this.$refs.oad;
        this.block = this.$refs.block;
        this.offset = this.$refs.audio.offsetLeft+24;
        
        
        if(/iphone|ipad|ipod/.test(ua)){ //ios处理逻辑
            this.audioitself.addEventListener('canplay',()=>{//判断canplay
                this.audioitself.addEventListener('timeupdate',this.handleTimeupdate);
                this.block.addEventListener('touchstart',this.handleTouchstart);
                this.block.addEventListener('touchmove',this.handleTouchmove);
                this.block.addEventListener('touchend',this.handleTouchend);
            },{once:true});


        }else{//安卓处理逻辑
            this.audioitself.addEventListener('timeupdate',this.handleTimeupdate); 
            this.block.addEventListener('touchstart',this.handleTouchstart);
            this.block.addEventListener('touchmove',this.handleTouchmove);
            this.block.addEventListener('touchend',this.handleTouchend);
        }
        
    },
    computed:{
        unit(){ //控制尺寸单位
            return this.rem?'rem':'px'
        },
        progressWidth(){ //进度条宽度
            return this.progressX+this.unit
        },
        totalWidth(){ //总宽度
            return this.width+this.unit
        },
        indicatorLeft(){ // 进度指针indicator位置
            return this.progressX-6+this.unit;
        },
        
    },
}
</script>

<style scoped>
    .ch-audio{
        margin: 4px;
        width: 90%;
    }
    .ch-audio__img{
        width:15px;
        
        float: left;
    }
    .ch-audio-controlplain{
        height:15px;
        margin-left: 9px;
        float: left;
    }
    .ch-audio-clickblock{
        height:15px;
        position: relative;
    }
    .ch-audio-progress__indicator{
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: linear-gradient(white, gray);
        position: absolute;
        top:1px;
    }
    .ch-audio-progress{
        margin-top: 6px;        
        background-color: #eee;
        height:2px;
        float: left;
    }
    .ch-audio-progress__innerprogress{
        background-color: #000;
        height: 2px;
        float: left;
    }
</style>