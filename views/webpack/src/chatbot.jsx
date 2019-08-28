// React-full-calendar
import React from "react";
import ReactDOM from "react-dom";

import { MessageList, Input, Button } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

class ChatBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sending: false,
      messageList: []
    };
  }

  addMessage = (position, text, title) => {
    var list = this.state.messageList;
    var text = text.replace(/&quot;/g, '"');

    list.push({
      position: position,
      type: "text",
      title: title,
      text: text,
      date: new Date()
    });
    this.setState({
      messageList: list
    });

    var objDiv = document.getElementById("card-body");
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  componentDidMount = () => {
    window.addEventListener(
      "keypress",
      e => {
        if (e.keyCode === 13) {
          this.handleSendButton();
        }
      },
      false
    );
    this.addMessage(
      "left",
      'Hi, welcome to ChuckBot..! If you need any help, just say: "Help me, please".',
      "iChuckBot"
    );
  };

  getBotAnswer = inputText => {
    $.getJSON(`/api/v1/chatbot/${inputText}`)
      .done(json => {
        this.addMessage("left", json.result, "iChuckBot");
        // Accept new answers (Sending: false)
        this.setState(prevState => ({
          sending: !prevState.sending
        }));
      })
      .fail(() => {
        this.addMessage(
          "left",
          "Sorry, I just has a brain freeze,.. Can you say that again..?",
          "iChuckBot"
        );
        // Accept new answers (Sending: false)
        this.setState(prevState => ({
          sending: !prevState.sending
        }));
      });
  };

  getBotReset = () => {
    $.getJSON(`/api/v1/reset`)
      .done(json => {
        this.addMessage("left", json.result, "iChuckBot");
        // Accept new answers (Sending: false)
        this.setState(prevState => ({
          sending: !prevState.sending
        }));
      })
      .fail(() => {
        this.addMessage(
          "left",
          "Sorry, I just has a brain freeze,.. Can you say that again..?",
          "iChuckBot"
        );
        // Accept new answers (Sending: false)
        this.setState(prevState => ({
          sending: !prevState.sending
        }));
      });
  };

  handleSendButton = () => {
    if (!this.state.sending) {
      let input = this.refs.input.state.value;

      if (input === "reset") {
        this.setState({ messageList: [] });
        // Wait for answer (Sending: true)
        this.setState(prevState => ({
          sending: !prevState.sending
        }));
        this.getBotReset();
        this.refs.input.clear();
        return;
      }

      if (input) {
        // Wait for answer (Sending: true)
        this.setState(prevState => ({
          sending: !prevState.sending
        }));
        this.addMessage("right", input, "User");
        this.getBotAnswer(input);
        this.refs.input.clear();
      }
    }
  };

  render() {
    return (
      <div className="card">
        <div className="card-header">ChuckBot</div>
        <div id="card-body" className="card-body flex-fill">
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={this.state.messageList}
          />
        </div>
        <div className="card-footer">
          <Input
            placeholder="Type here..."
            autofocus={true}
            multiline={false}
            ref="input"
            rightButtons={
              <Button
                color="white"
                backgroundColor="black"
                text="Send"
                disabled={this.state.sending}
                onClick={() => this.handleSendButton()}
              />
            }
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ChatBot />, document.getElementById("chat-root"));
