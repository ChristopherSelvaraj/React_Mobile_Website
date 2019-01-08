import React, { Component } from 'react';
const MathJax = require('react-mathjax2');
const ReactDOM = require('react-dom');
//const Text = require('./Text.js');

const MathContent = ({
  contents
}) => {
  console.log('videos in math content: ' + JSON.stringify(contents));
  return(
    <MathJax.Context>
      <div>
        {
          contents.map((content, index) => {
            switch (content.type) {
              case 'heading':
                return <div key= {index}> <h3>{content.body}</h3> </div>
                break;
              case 'text':
                return <div key = {index} className='div-inline'>{content.body}&nbsp;</div>
                break;
              case 'mathInline':
                return <MathJax.Node key={index}>{content.body}&nbsp;</MathJax.Node>
                break;
              case 'math':
                return <div key={index} className='div-block'>
                          <MathJax.Node >{content.body}
                          </MathJax.Node>
                        </div>
                break;
              default:
                return <div key={index}> </div>
            }
          })
        }
      </div>
    </MathJax.Context>
  );
}
export default MathContent;
