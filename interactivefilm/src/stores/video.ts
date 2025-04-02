import { ref } from 'vue'
import { defineStore } from 'pinia'
import bluePrint from '@/assets/bluePrint.json'

export const useVideoStore = defineStore('video', () => {
  const videos:Object = bluePrint;
  const currentVideo = ref('mountain');
  
  function getVideoMetadata(name: string) {
    if (Object.keys(videos).includes(name)) return videos[name as keyof Object];
    else console.log('No video with name ' + name);
    return {};
  }

  function getCurrentVideoFileType() {
    const metaData = getVideoMetadata(currentVideo.value);
    if (typeof(metaData) == 'object' && 'fileType' in metaData) return metaData['fileType'];
    else console.log('No fileType key on ' + currentVideo.value);
    return '';
  }

  function getCurrentVideoLoop() {
    const metaData = getVideoMetadata(currentVideo.value);
    if (typeof(metaData) == 'object' && 'loop' in metaData) return metaData['loop'];
    else console.log('No loop key on ' + currentVideo.value);
    return false;
  }

  function getCurrentVideoEndingOptions() {
    const metaData = getVideoMetadata(currentVideo.value);
    if (typeof(metaData) == 'object' && 'endingOptions' in metaData) return metaData['endingOptions'];
    else console.log('No endingOptions key on ' + currentVideo.value);
    return '';
  }

  return { videos, currentVideo, getVideoMetadata, getCurrentVideoFileType, getCurrentVideoLoop, getCurrentVideoEndingOptions }
})
