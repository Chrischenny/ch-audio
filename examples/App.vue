<template>
  <div id="app">
    <ch-audio 
    :width="300" 
    :rem="false"  
    audioSrc="https://www.chrischenny123.com/source/111.mp3"
    ></ch-audio>
    <!-- <audio src="../public/111.mp3" controls></audio> -->
  </div>
</template>

<script>

export default {
  name: 'App',
  
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
</style>
