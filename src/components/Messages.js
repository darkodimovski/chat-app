import {Component} from "react";
import React from "react";



export default class Messages extends Component {
    render() {
        const {messages} = this.props;
        return (
            <div className="flex justify-center overflow-auto flex-grow">
                <ul className="Messages-list w-full max-w-3xl">
                    {messages.map((item) => this.renderMessage(item))}
                </ul>
            </div>
            );
        }

    // funkcija koja generira random broj koji se ugnjezdi kao key prop https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

    getRandom() {
        return Math.random();
    }

    renderMessage(message) {
        const {member, text} = message;
        const {currentMember} = this.props;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe ?
            "Messages-message currentMember" : "Messages-message";

        return (
            <li key={this.getRandom()} className={className}>
            <span className="avatar" style={{backgroundColor: member.clientData.color}} />
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
