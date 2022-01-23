import {Component} from "react";
import React from "react";

export default class Messages extends Component {
    render() {
        const {messages} = this.props;
            return (
                <div className="flex justify-center overflow-auto flex-grow">
                <ul className="Messages-list w-full max-w-3xl">
                {messages.map(m => this.renderMessage(m))}
                </ul>
                </div>
            );
        }

renderMessage(message) {
    const {member, text} = message;
    const {currentMember} = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ?
        "Messages-message currentMember" : "Messages-message";
return (
    <li className={className}>
    <span
    className="avatar"
    style={{backgroundColor: member.clientData.color}}
    />
    <div className="Message-content">
        <div className="username">
        {member.clientData.username}
        </div>
        <div className="text">{text}</div>
    </div>
    </li>
);
}
}
