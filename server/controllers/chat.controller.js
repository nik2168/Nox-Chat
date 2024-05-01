const { ALERT, REFETCH_CHATS } = require("../constants/events.js");
const Chat = require("../models/chat.model.js");
const User = require("../models/user.model.js");
const { emitEvent } = require("../utils/features.js");


const avatar = {
  public_id: "asd8a797",
  url: "akjshdgiaerhg",
};

// create New Group
const newGroupChat = async (req, res) => {
  const { name, members } = req.body;

  try {
    if (members.length <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "group must have 1 member" });
    }

    const allMembers = [...members, req.userId];

    const temp = await Chat.create({
      name: name,
      groupChat: true,
      avatar,
      creator: req.userId,
      members: [...members, req.userId],
    });
   

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group !`);

    emitEvent(req, REFETCH_CHATS, members);

                    return res
                      .status(201)
                      .json({ success: true, message: "group  created !" });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error while creating new group :",
      err,
    });
  }
};


// get personal chats
const getMyChats = async (req, res) => {

  try {

    const chats = await Chat.find({ members: req.userId }).populate(
      "members",
      "name avatar"
    ); // will provide the user details from the members key. ...

   const transformChats = chats.map((_id, name, avatar, groupChat, members) => {

  const othermember = groupChat ? avatar : members.find((i) => i._id.toString() != req.userId.toString());

    return {
        _id: _id,
         name: groupChat? name : othermember.name,
         avatar: othermember.avatar,
         groupChat,
         members,
        // lastMessage: lastMessage
    }
   })

   
 return res.status(200).json({success: true, chat: chats})


  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error while creating new group :",
      err,
    });
  }
};

module.exports = { newGroupChat, getMyChats };
