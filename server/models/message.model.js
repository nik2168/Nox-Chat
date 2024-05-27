const { Schema, Types, model, models } =  require("mongoose");

const messageSchema = new Schema(
  {
    content: {
      type: String,
    },
    attachments: [
      {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    ],
    isAlert: {
     type: Boolean,
     default: false,
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
      require: true,
    },
    chat: {
      type: Types.ObjectId,
      ref: "Chat",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model("Message", messageSchema);
module.exports = Message