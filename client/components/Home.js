import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $.ajax({
      dataType: 'json',
      url: 'http://www.reddit.com/r/all.json?jsonp=?',
      success: data => {
        console.log(data);
        data.data.children.forEach(post => {
          var $module = $('<div class="post-module"></div>');
          $module.append('<div class="module-background-image"></div>').css({
            'background': `url(${post.data.url}) no-repeat center center fixed`,
            '-webkit-background-size': 'cover',
            '-moz-background-size': 'cover',
            '-o-background-size': 'cover',
            'background-size': 'cover'
          });
          $module.append('<div class="module-title"><span>' + post.data.title + '</span><div>');
          $module.append('<div class="module-permalink">' + post.data.permalink + '<div>');
          $module.append('<div class="module-upvotes">' + post.data.ups + ' upvotes<div>');
          $('.content').append($module);
        });
      }
    });

    
    
  }

  render() {
    return (
      <div>
        <div className="content"></div>
      </div>
    )
  }
}

// $.ajax({
//   dataType: 'html',
//   url: post.data.url,
//   success: data => {
//     var url = $(data).find('meta[property="og:image"]').attr('content')
//     console.log(url);
//   }
// });
// $.ajax({
//   type: 'GET', 
//   url: post.data.url,
//   dataType: 'html',
//   success: function(data) {

//     //cross platform xml object creation from w3schools
//     try //Internet Explorer
//       {
//       xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
//       xmlDoc.async="false";
//       xmlDoc.loadXML(data);
//       }
//     catch(e)
//       {
//       try // Firefox, Mozilla, Opera, etc.
//         {
//         parser=new DOMParser();
//         xmlDoc=parser.parseFromString(data,"text/xml");
//         }
//       catch(e)
//         {
//         alert(e.message);
//         return;
//         }
//       }

//     // console.log(xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue);
//     console.log($(xmlDoc).find('meta[property="og:image"]').attr('content'));
//   }
// });
// $module.append('<img class="module-image" src="' + post.data.url + '"/>');