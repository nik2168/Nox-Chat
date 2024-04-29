import React from 'react'
import GroupChats from '../components/GroupsComp/GroupsChats'
import AppLayout from "../components/AppLayout/AppLayout";


const Groups = ({userdata}) => {
   return (
     <>
       {userdata?.map((i, index) => {
         const {
           userid,
           name,
           avatar,
           isOnline,
           gropupChat,
           membets,
           lastMessage,
           lastMessageTime,
           notifications,
           chats,
         } = i;
         return (
           <div className="person-div" key={index}>
             <div className="person-dp">
               <img src={avatar} alt="" className="person-image" />
               {isOnline && <div className="online"></div>}
             </div>
             <div className="person-details">
               <h5>{name}</h5>
               <span>{lastMessage}</span>
             </div>
             <span className="person-time">{lastMessageTime}</span>
             <span className="person-notification-count">{notifications}</span>
           </div>
         );
       })}
     </>
   );
}

export default AppLayout()(Groups);