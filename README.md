# ch-audio
this is a vue-audio component overwrite from native audio tags

一个移动端的audio组件，自定义进度条，目前版本为0.1.0测试版本，初步解决了在ios以及andriod上的兼容问题。
npm引入
`npm install ch-audio`


## props

### 1、audioSrc
通过该属性传入音频地址。
请使用require()语法进行导入。
```html
<ch-audio 
    :width="300" 
    audioSrc="require('./assets/111.mp3')"
    :playimg="require('./assets/play.png')"
    :stopimg="require('./assets/stop.png')"></ch-audio>
    <!-- <audio src="../public/111.mp3" controls></audio> -->
  </div>
  ```
  
### 注意！
ios获取音频，尽量使用服务器接口流模式，请在后端设置相应的响应头，koa.js参考如下：

```javascript
router.get('/getsource/:filename',async ctx=>{
    console.log(ctx.params.filename);
    var mp3 = path.resolve('./view/source/' + ctx.params.filename);
    ctx.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': fs.statSync(mp3).size,
    })

    if (ctx.headers.range === 'bytes=0-1') { //ios音频预请求头，不处理则获取不到audio.duration
        ctx.set('Content-Range', `bytes 0-1/${fs.statSync(mp3).size}`)   // 重点在这
        ctx.body = '1'
    } else {
        ctx.set({
            'Accept-Ranges': 'bytes',
        })
        const src = fs.createReadStream(mp3)
        ctx.body = src
    }
});
```

### 2、playimg && stopimg

目前可以自定义播放以及暂停按钮的样式，请使用require()语法进行导入
例如:
```html
<template>
  <div id="app">
    <ch-audio 
    audioSrc="require('./assets/111.mp3')"
    :playimg="require('./assets/play.png')"
    :stopimg="require('./assets/stop.png')"></ch-audio>
    <!-- <audio src="../public/111.mp3" controls></audio> -->
  </div>
</template>
```

### 3、width
可自定义宽度，通过`width`传入，number类型。
```html
<template>
  <div id="app">
    <ch-audio 
    :width="300" 
    audioSrc="require('./assets/111.mp3')"
    :playimg="require('./assets/play.png')"
    :stopimg="require('./assets/stop.png')"></ch-audio>
    <!-- <audio src="../public/111.mp3" controls></audio> -->
  </div>
</template>
```

### 4、rem

目前支持rem模式，通过props`:rem:'true'`开启，开启后可使用rem；
例如：
```html
<template>
  <div id="app">
    <ch-audio 
    :width="6" 
    :rem="true"  
    audioSrc="require('./assets/111.mp3')"
    :playimg="require('./assets/play.png')"
    :stopimg="require('./assets/stop.png')"></ch-audio>
    <!-- <audio src="../public/111.mp3" controls></audio> -->
  </div>
</template>
```
