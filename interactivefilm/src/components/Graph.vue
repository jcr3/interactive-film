<script setup lang="ts">
    import { onMounted } from "vue";
    import { useVideoStore } from '../stores/video';
    const videoStore = useVideoStore();

    onMounted(() => {
        let canvas = document.querySelector("canvas");
        let ctx = canvas?.getContext("2d");
        
        const fontSize = 30;

        function draw() {
            if (canvas != null && ctx != null) {

                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                ctx.font = `${fontSize}px Courier New`;
                let idx = 0;
                let lastXPosition = fontSize;
                const middleYPos = canvas.height/2.4;

                Object.keys(videoStore.videos).forEach(video => {
                    ctx?.fillText(video, lastXPosition, middleYPos + idx*fontSize);
                    lastXPosition += video.length*fontSize/1.7 + fontSize*2; // aproximation of fontsize to char height ratio
                    idx += 1;
                });
            }
        }
        
        setInterval(draw, 100);
            
    });


    
</script>

<template>
    <div id="container">
        <canvas id="graph">
        </canvas>
    </div>
</template>

<style scoped>
    #container {
        width: 100vw;
        height: 100vh;
    }
</style>