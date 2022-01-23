import React, { Component } from 'react';
import './App.css';
import Messages from './components/Messages'; 
import Input from "./components/Input";



/* Funkcija koja generira nasumično ime usera */
function randomUser() {
  /* Niz pridjeva */
  const pridjevi = [
    'crni', 'bijeli', 'plavi', 'žuti', 'hrabar'
  ];
  /* Niz imenica */
  const imenica = [
    'jastreb', 'sokol', 'tigar', 'orao', 'sova'
  ];
  /* Javascript metode za nasumično generiranje usernamea koji šalje poruku */
  const randomPridjev = pridjevi[Math.floor(Math.random() * pridjevi.length)];
  const randomImenica = imenica[Math.floor(Math.random() * imenica.length)];
  return randomPridjev + randomImenica;
}

function randomBoja() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomUser(),
      color: randomBoja(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone('4wplfh0PrAVjtw3n', {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  
  }



  render() {
    return (
      <div className="flex flex-col justify-between h-full h-screen">
        <div className="bg-gradient-to-r from-green-400 to-blue-400 p-10">
          <h1 className="text-center text-2xl font-bold text-white">Chat App - Seminar</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}    
        />

      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

