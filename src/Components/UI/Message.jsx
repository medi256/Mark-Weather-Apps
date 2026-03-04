import React from "react";

const Message = ({ text, type = "info" }) => (
  <div className={`message message-${type}`}>{text}</div>
);

export default Message;
