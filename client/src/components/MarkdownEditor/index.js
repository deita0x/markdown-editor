import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import { debounce } from '../../utils';
import './index.css';

export default class MarkdownEditor extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    onChangeContent: PropTypes.func.isRequired
  };

  state = {
    input: this.props.content ? this.props.content : '',
    output: {
      __html: this.props.content ? marked(this.props.content, { sanitize: true }) : ''
    }
  };

  componentWillReceiveProps(nextProp) {
    if (nextProp) {
      this.setState({
        input: nextProp.content,
        output: {
          __html: marked(nextProp.content, { sanitize: true })
        }
      });
    }
  }

  onChange = (event) => {
    const input = event.target.value;

    this.setState(
      { input },
      () => this.createMarkup(input)
    );

    this.props.onChangeContent(input);
  };

  createMarkup = debounce(input => {
    const output = marked(input, { sanitize: true });

    this.setState({
      output: {
        __html: output
      }
    });
  }, 300);

  render() {
    const { input, output } = this.state;

    return (
      <div className="md-container">
        <div className="md-editor">
          <textarea value={input} onChange={this.onChange}></textarea>
        </div>
        <div className="md-preview" dangerouslySetInnerHTML={output}></div>
      </div>
    );
  }
}
