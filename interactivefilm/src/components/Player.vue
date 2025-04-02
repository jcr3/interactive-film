<script setup lang="ts">
    import { ref } from "vue";
    import { useVideoStore } from '../stores/video';
    const videoStore = useVideoStore();

    const playing = ref(false);
    const videoFinished = ref(false);
    
    function togglePauseVideo() {
        // don't toggle non loopable when options up
        if (!videoFinished.value || videoStore.getCurrentVideoLoop()) {
            let player = document.querySelector("video");
            if (player?.paused) {
                player.play();
                playing.value = true;
            }
            else {
                player?.pause();
                playing.value=false;
            }
        }
        
    }

    function displayChoices() {
        if (videoStore.getCurrentVideoLoop() == true) {
            let player = document.querySelector("video");
            player?.load();
        }
        videoFinished.value = true;
    }

    function updateVideo(video: string) {
        videoFinished.value = false;
        videoStore.currentVideo = video;
        
        let player = document.querySelector("video");
        player?.load()
    }
</script>

<template>
    <div id="container">
        <div v-if="!playing"
            class="button"
            style="position: absolute; z-index: 2;"
            @click="togglePauseVideo"
        >
            Play |>
        </div>
        <video id="player" width="1920" height="1080" autoplay
            :onended="displayChoices"
            @click="togglePauseVideo"
        >
            <source
                :src="`/${videoStore.currentVideo}.${videoStore.getCurrentVideoFileType()}`"
                :type="`video/${videoStore.getCurrentVideoFileType()}`"
            >
            Your browser does not support the video tag.
        </video>

        <div v-if="videoFinished"
            id="option-container"
        >
            <div v-for="data, endingOption in videoStore.getCurrentVideoEndingOptions()"
                class="button"
                @click="updateVideo(data['video'])"
            >
                <!-- if the special flag is found then go through without showing options -->
                {{ endingOption != -1 ? data['text'] : updateVideo(data['video']) }}
            </div>
        </div>
    </div>
</template>

<style scoped>
    #container {
        width: 100%;
        min-height: 100vh;
        position: relative;
        background-color: black;
        color: white;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    #player {
        width: 100vw;
        height: 100vh;
    }

    #option-container {
        display: flex;
        flex-direction: row;
        width: 100vw;

        align-items: center;
        justify-content: center;
        gap: 10vw;
        
        position: absolute;
    }

    .button {
        z-index: 1;

        cursor: pointer;

        padding: 0.5em;
        margin: 1em;
        border-radius: 0.5em;
        background-color: rgb(30, 30, 30);
        border: 1px solid rgb(58, 58, 58);
        color: rgb(255, 255, 255);
        font-style: italic;
    }
</style>