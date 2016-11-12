import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allContent: [],
      subscribedContent: [],
      subscribed: {},
      mode: 'all',
    }
  }

  componentDidMount() {
    // Automatically load default from /r/all
    $.ajax({
      dataType: 'json',
      url: 'http://www.reddit.com/r/all.json?jsonp=?',
      success: data => {
        this.setState({ allContent: data.data.children });
        console.log(data);
      }
    });
  }

  subscribeToSubreddit(e) {
    var subreddit = e.target.className.split(' ')[1].toLowerCase();
    var { subscribed } = this.state;
    subscribed[subreddit] = true;
    this.setState({ subscribed });
    this.getSubscribedContent(subreddit);
  }

  getSubscribedContent(subreddit) {
    $.ajax({
      dataType: 'json',
      url: 'http://www.reddit.com/r/' + subreddit + '.json?jsonp=?',
      // Add content to subscribed content
      success: data => {
        var { subscribedContent } = this.state;
        subscribedContent = subscribedContent.concat(data.data.children);
        this.setState({ subscribedContent });
        console.log(this.state.subscribedContent);
      }
    });
  }

  setModeToAll() {
    this.setState({mode: 'all'})
  } 

  setModeToSubscribed() {
    this.setState({mode: 'subscribed'})
  }

  render() {
    // Toggle between /r/all and subscribed
    const content = this.state.mode === 'all' ? this.state.allContent : this.state.subscribedContent;
    const modules = content.map((post, i) => {
      const backgroundStyle = {
        'background': `url(${post.data.thumbnail}) no-repeat center center fixed`,
        // 'width': '100%',
        // 'height': '100%',
        // 'position': 'absolute',
        // 'top': '0',
        // 'left': '0',
        // 'right': '0',
        // 'bottom': '0',
        // 'zIndex': '-1',
        // 'WebkitBackgroundSize': 'cover',
        // 'MozBackgroundSize': 'cover',
        // 'OBackgroundSize': 'cover',
        // 'backgroundSize': 'cover',
        // 'WebkitFilter': 'blur(5px)',
        // 'MozFilter': 'blur(5px)',
        // 'OFilter': 'blur(5px)',
        // 'msFilter': 'blur(5px)',
        // 'filter': 'blur(5px)',
        // 'WebkitTransform': 'scale(1.1)',
        // 'MozTransform': 'scale(1.1)',
        // 'msTransform': 'scale(1.1)',
        // 'OTransform': 'scale(1.1)',
        // 'transform': 'scale(1.1)',
      };

      return (
        <div className="post-module" key={'post-' + i}>
          <div className={'module-subreddit ' + post.data.subreddit} onClick={this.subscribeToSubreddit.bind(this)}>{'r/' + post.data.subreddit + ' +'}</div>
          <a href={post.data.url} target="_blank">
            <div className="module-title">{post.data.title}</div>
          </a>
          <a href={'https://www.reddit.com' + post.data.permalink} target="_blank">
            <div className="module-permalink">{'See ' + post.data.num_comments + ' Comments >'}</div>
          </a>
          <a href={'https://www.reddit.com' + post.data.permalink} target="_blank">
            <div className="module-upvotes">{post.data.ups + ' upvotes'}</div>
          </a>
          <div className="module-background-image" style={backgroundStyle}></div>
        </div>
      );
    });

    return (
      <div>
        <div className="nav">
          <div className="nav-button" onClick={this.setModeToAll.bind(this)}>all</div>
          <div className="brand" onClick={this.setModeToAll.bind(this)}>Reddit Unleashed</div>
          <div className="nav-button" onClick={this.setModeToSubscribed.bind(this)}>subscribed</div>
        </div>
        <div className="body-container">
          {modules}
        </div>
      </div>
    );
  }
}