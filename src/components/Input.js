import {Component} from "react";
import React from "react";

export default class Input extends Component {
    state = {
    text: ""
}

onChange(e) {
    this.setState({text: e.target.value});
}

onSubmit(e) {
e.preventDefault();
    this.setState({text: ""});
    this.props.onSendMessage(this.state.text);
}

render() {
return (
    <div className="Input flex justify-center mb-5 p-2">
    <form className="flex w-full max-w-4xl justify-center" onSubmit={e => this.onSubmit(e)}>
        <input className="w-full h-full p-4 border-2 border-blue-300 rounded-3xl"
        onChange={e => this.onChange(e)}
        value={this.state.text}
        type="text"
        placeholder="Unesite poruku i stisnite ENTER"
        autofocus="true"
        />
        <button className="bg-blue-500 hover:bg-blue-800 px-4 ml-2 rounded-3xl">Pošalji</button>
    </form>
    </div>
);
}
}

