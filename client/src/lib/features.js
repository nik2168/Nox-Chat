import moment from "moment";

const fileFormat = (url='') => {

    const fileExt = url.split(".").pop()

    if(fileExt === 'mp4' || fileExt === 'webm' || fileExt === 'ogg') return 'video';
   
    if(fileExt === 'mp3' || fileExt === 'wav') return 'audio';
   
    if(fileExt === 'jpg' || fileExt === 'png' || fileExt === 'jpeg' || fileExt === 'gif' || fileExt === 'heic') return 'image';

    return 'file'
}

const transformImage = (url='', width='100') => {
    return url
}

const getLast7Days = () => {
 const curDate = moment();

 const last7Days = [];

 for (let i = 0; i < 7; i++) {
    const dayDate = curDate.clone().subtract(i, 'days');
    const days = dayDate.format('dddd')
    last7Days.unshift(days);
 }

return last7Days;

}

export {fileFormat, transformImage, getLast7Days};