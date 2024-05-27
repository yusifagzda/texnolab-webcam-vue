<!-- src/components/VideoStream.vue -->

<template>
  <div>
    <h1>Video Stream</h1>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  data() {
    return {
      context: null
    };
  },
  computed:{
    // message(){
    //   return this.socket
    // },
    ...mapState([
        'message'
    ])
  },
  mounted() {
    // this.$options.sockets.onmessage = this.onMessage;
    const canvas = this.$refs.canvas;
    canvas.width = 640;
    canvas.height = 480;
    this.context = canvas.getContext('2d');
  },
  methods: {
    onMessage(event) {

      const message = event.data;
      const data = new Uint8Array(message);
      const frame = new Blob([data], { type: 'application/octet-binary' });
      const url = URL.createObjectURL(frame);
      // console.log(url)
      const img = new Image();
      img.src = url;
      img.onload = () => {
        console.log('loaded')
        this.context.drawImage(img, 0, 0, 640, 480);
        URL.revokeObjectURL(url);
      };
    },
  },
  watch:{
    message(value){
      this.onMessage(value);
    }
  }
};
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>
