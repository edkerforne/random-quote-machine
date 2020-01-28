import React from "react";
import "./App.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";

import { getAllQuotes } from "./Quotes.js";

const myWebsite = "https://edkerforne.github.io/";
const homepage = "https://edkerforne.github.io/random-quote-machine/";

const Share = props => {
  return (
    <div id="share">
      <a
        className="icon"
        title="Tweet this quote!"
        href={`https://twitter.com/intent/tweet?text="${props.text}" - ${props.author}&url=${homepage}&hashtags=quotes`}
      >
        <FontAwesomeIcon icon={faTwitter} />
      </a>

      <a
        className="icon"
        title="Post this quote on Tumblr!"
        href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&content=${props.text}&caption=${props.author}&canonicalUrl=https://edkerforne.github.io/random-quote-machine&shareSource=tumblr_share_button`}
      >
        <FontAwesomeIcon icon={faTumblr} />
      </a>
    </div>
  );
};

const NewQuote = props => {
  return (
    <button onClick={props.onClick} id="new-quote">
      New Quote
    </button>
  );
};

const colors = [
  "black",
  "brown",
  "red",
  "orange",
  "green",
  "teal",
  "blue",
  "purple"
];

let quotes = [];
let quote = {};

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      author: "",
      color: "black"
    };
    this.getNewQuote = this.getNewQuote.bind(this);
  }

  /* Choose the background and text color
   * randomly from an array
   */
  setColor = () => {
    let color = colors[Math.floor(Math.random() * colors.length)];
    this.setState({ color });
  };

  /* Get a random quote and display it
   * on button click
   */
  getNewQuote = () => {
    quote = quotes[Math.floor(Math.random() * quotes.length)];
    let author = quote.author ? quote.author : "Anonymous";
    this.setState({
      text: quote.text,
      author: author,
      fading: true
    });
  };

  handleClick = () => {
    // Make the quote area disappear
    this.setState({ fading: true });
    const fadeIn = window.setTimeout(() => {
      // After 250ms, display a new quote
      this.getNewQuote();
      this.setState({ fading: false });
      window.clearTimeout(fadeIn);
    }, 250);

    // Change the theme color
    this.setColor();
  };

  /* Component gets a random quote on load,
   * same as clicking the button
   */
  componentDidMount = () => {
    getAllQuotes(res => {
      quotes = JSON.parse(res);
      this.handleClick();
    });
  };

  render() {
    return (
      <main id="page-wrapper" className={this.state.color + "-theme"}>
        <div id="quote-box">
          <div
            id="quote"
            className={this.state.fading ? "fade-out" : "fade-in"}
          >
            <FontAwesomeIcon id="large-quote" icon={faQuoteLeft} />
            <p id="text">{this.state.text}</p>
            <p id="author">{this.state.author}</p>
          </div>
          <footer id="buttons">
            <NewQuote onClick={this.handleClick} />
            <Share text={this.state.text} author={this.state.author} />
          </footer>
        </div>
        <footer id="footer">
          by{" "}
          <a href={myWebsite} target="_blank" rel="noopener noreferrer">
            Edwin Kerforne
          </a>
        </footer>
      </main>
    );
  }
}

class App extends React.Component {
  render() {
    return <Quote />;
  }
}

export default App;
