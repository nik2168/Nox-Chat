const { ALERT, REFETCH_CHATS } = require("../constants/events.js");
const Chat = require("../models/chat.model.js");
const User = require("../models/user.model.js");
const { emitEvent } = require("../utils/features.js");

const tempavatar = {
  public_id: "asd8a797",
  url: "akjshdgiaerhg",
};

// create New Group
const newGroupChat = async (req, res) => {
  const { name, members } = req.body;

  try {
    if (!members || members.length <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "group must have 1 member" });
    }

    const allMembers = [...members, req.userId];

    const temp = await Chat.create({
      name: name,
      groupChat: true,
      avatar: tempavatar,
      creator: req.userId,
      members: [...members, req.userId],
    });

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group !`);

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(201).json({ success: true, message: "group  created !" });
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
    const chats = await Chat.find({
      members: req.userId,
      groupChat: false,
    }).populate("members", "name avatar"); // will provide the user details from the members key. ...

    const transformChats = chats.map(
      ({ _id, name, avatar, groupChat, members }) => {
        const othermember = members.find(
          (i) => i._id.toString() !== req.userId.toString()
        );

        return {
          _id,
          name: othermember?.name,
          avatar: othermember?.avatar,
          groupChat,
          members: members.reduce((pre, cur) => {
            if (cur._id.toString() !== req.userId.toString()) {
              pre.push(cur._id);
            }
            return pre;
          }, []),
          // lastMessage: lastMessage
        };
      }
    );

    return res.status(200).json({ success: true, mychats: transformChats });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error while getting personal chats :",
      err,
    });
  }
};

// get all of my group chats
const getMyGroups = async (req, res) => {
  try {
    const groupChats = await Chat.find({
      members: req.userId,
      groupChat: true,
    });

    return res.status(200).json({ success: true, Groups: groupChats });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error while fetching personal groups",
      Error: err,
    });
  }
};

// add members to the group
const addMembers = async (req, res) => {
  const { chatId, new_members } = req.body;

  try {
    
    const curGroup = await Chat.findById(chatId);

    if (!curGroup) {
      return res.status(404).json({
        success: false,
        message: "Group not found to add members",
      });
    }

    if (!new_members || new_members.length < 1) {
      return res.status(404).json({
        success: false,
        message: "please provide atleast 1 member",
      });
    }

    if (!curGroup.groupChat) { // if curgroup is not a group
      return res.status(400).json({
        success: false,
        message: "Its not a Group to add members",
     });
    }

    if (curGroup.creator.toString() !== req.userId.toString()) { // if admin is not doing it
      return res.status(400).json({
        success: false,
        message: "You're not a admin... Are you?",
      });
    }

    const uniqueMembers = new_members.filter((i) => !curGroup.members.includes(i)) // if admin send a members to add in group who is already in the group this will check it
   curGroup.members = [...curGroup.members, ...uniqueMembers]

   if(curGroup.members.length > 10) res.status(400).json({success: true, message: 'Group length must be upto 10'}) // members upto 10 only
   
   await curGroup.save(); // save added members


   // show the added new members update in the group chat ...
   const newMembersPromise = new_members.map((i) => User.findById(i, "name"))
   const newMembers = await Promise.all(newMembersPromise)

   const allMembersName = newMembers.map((i) => i.name).join(",")

  emitEvent(req, ALERT, curGroup.members, `${allMembersName} added to this group `)

  emitEvent(req, REFETCH_CHATS, curGroup.members)

   return res.status(200).json({success: true,  message: "New members added successfully!"})
    
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error while adding member to the groups",
      Error: err,
    });
  }
};


const removeMembers = async (req, res) => {
  const { chatId, remove_members } = req.body;

  try {

    let curGroup = await Chat.findById(chatId);

    if (!curGroup) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    if (!remove_members || remove_members.length == 0) {
      return res.status(404).json({
        success: false,
        message: "please provide atleast 1 member",
      });
    }

    if (!curGroup.groupChat) { // if curgroup is not a group
      return res.status(400).json({
        success: false,
        message: "Its not a Group",
     });
    }

    if (curGroup.creator.toString() !== req.userId.toString()) { // if admin is not doing it
      return res.status(400).json({
        success: false,
        message: "You're not a admin... Are you?",
      });
    }


    const uniqueMembers = remove_members.filter((i) => curGroup.members.includes(i)) // if admin send a members to remove from group who is already in the group this will check it
      const filteredMember = curGroup.members.filter((i) => !uniqueMembers.includes(i.toString()))
    curGroup.members  = [...filteredMember];


   if(curGroup.members.length < 2) res.status(400).json({success: true, message: 'Group size must be atleast 2'}) // members upto 10 only
   
   await curGroup.save(); // save removed members

   // show the added new members update in the group chat ...
   const newMembersPromise = uniqueMembers.map((i) => User.findById(i, "name"))
   const newMembers = await Promise.all(newMembersPromise)

   const allMembersName = newMembers.map((i) => i.name).join(",")
   console.log(allMembersName)

  emitEvent(req, ALERT, curGroup.members, `${allMembersName} removed from this group `)

  emitEvent(req, REFETCH_CHATS, curGroup.members)

   return res.status(200).json({success: true,  message: "Members removed successfully!"})
    
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error while removing members from the groups",
      Error: err,
    });
  };
}



const leaveGroup = async (req, res) => {

   const chatId = req.params.id

 try{

  const curGroup = await Chat.findById(chatId)

  if (!curGroup) {
    return res.status(404).json({
      success: false,
      message: "Group not found to add members",
    });
  }

  if(!curGroup.groupChat){
    return res.status(404).json({
      success: false,
      message: "This group is not a group lol"
    })
  }



  curGroup.members = curGroup.members.filter((i) => i.toString() !== req.userId.toString())

   if (req.userId.toString() === curGroup.creator.toString()) {
    curGroup.creator = curGroup.members[0]
   }

   if(curGroup.members.length < 2) res.status(400).json({success : false, message: 'Group must have atleast 2 members'})

  await curGroup.save()

 
 const leftUser = await User.findById(req.userId, "name")

  emitEvent(
    req,
    ALERT,
    curGroup.members,
    `${leftUser.name} has left the group `
  );

  emitEvent(req, REFETCH_CHATS, curGroup.members);

  return res
    .status(200)
    .json({ success: true, message: "Members left the group successfully!" });
    

 }catch(err){
  res.status(400).json({success: false, Message : 'Error while leaving the group', Error: err})
 }

}


const sendAttachments = async (req, res) => {

 res.send('Attachment send successfully !')

}



module.exports = {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMembers,
  leaveGroup,
  sendAttachments,
};
