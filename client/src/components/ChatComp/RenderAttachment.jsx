import React from "react";
import { fileFormat, transformImage } from "../../lib/features";
import { FileOpen } from "@mui/icons-material";



const RenderAttachment = (file, url) => {

  switch(file) {

    case 'video' :
        return  <video src={url} preload="none" width={'200px'} controls />

    case 'image' :
        return  <img src={transformImage(url, 200)} alt="Attachment" width={'300px'} height={'200px'} style={{objectFit: 'cover', borderRadius: '1rem'}}/>

    case 'audio' :
        return <audio src={url} preload="none" controls/>

        default:
            return <FileOpen/>
  }
};

export default RenderAttachment;
