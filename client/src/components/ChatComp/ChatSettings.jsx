import React from 'react'
import {  } from '@mui/icons-material'

const ChatSettings = ({setlist}) => {
  return (
    <div className="chat-settings" >
      <button onClick={() => {setlist([])}}>Clear Chat</button>
      <hr />
      <button>Background</button>
      <hr />

      <button>Find</button>
      <hr />
      <button>Block</button>
    </div>
  );
}

export default ChatSettings