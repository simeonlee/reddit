import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allContent: [], // TODO: implement infinite scroll
      subscribedContent: [],
      subscribed: {},
      mode: 'all',
    }
    this.getAllContent(); // Automatically load default from /r/all
  }

  setModeToAll() {
    this.setState({mode: 'all'})
  }

  setModeToSubscribed() {
    this.setState({mode: 'subscribed'})
  }

  getAllContent() {
    $.ajax({
      dataType: 'json',
      url: 'http://www.reddit.com/r/all.json?jsonp=?',
      success: data => {
        this.setState({ allContent: data.data.children });
        console.log(data);
      }
    });
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
        console.log(this.state.subscribedContent); // TODO: implement content sort
      }
    });
  }

  subscribeToSubreddit(e) { // TODO: implement UX response when clicking subreddit name to subscribe
    var subreddit = e.target.className.split(' ')[1].toLowerCase();
    var { subscribed } = this.state;
    subscribed[subreddit] = true;
    this.setState({ subscribed });
    this.getSubscribedContent(subreddit);
  }

  render() {
    // Toggle between /r/all and subscribed
    const content = this.state.mode === 'all' ? this.state.allContent : this.state.subscribedContent;

    const modules = content.map((post, i) => {
      const backgroundStyle = {
        'background': `url(${post.data.thumbnail}) no-repeat center center fixed`, // Unique background photo for each post
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