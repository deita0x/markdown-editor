import React, { Component } from 'react';
import swal from 'sweetalert';
import { getDocuments, updateDocument, createDocument, deleteDocument } from './api';
import {  HeaderLeft, HeaderRight,  DocumentsList, MarkdownEditor } from './components';
import './App.css';

class App extends Component {
  state = {
    documents: [],
    currentDocument: {},
    title: '',
    selectedId: null
  };

  async componentDidMount() {
    const { success, data } = await getDocuments();

    if (success) {
      this.setState({
        documents: data,
        currentDocument: data.length ? data[0] : {},
        title: data.length ? data[0].title : '',
        selectedId: data.length ? data[0].id : null
      });
    }
  }

  createDocument = async () => {
    const newDocuments = this.state.documents;
    const { success, data } = await createDocument('new document', '# Sample title');

    if (success) {
      newDocuments.push(data);

      this.setState({
        documents: newDocuments,
        currentDocument: data,
        title: data.title,
        selectedId: data.id
      });
    }
  };

  updateDocument = async () => {
    const { documents, currentDocument } = this.state;
    const { success } = await updateDocument(currentDocument);

    if (success) {
      this.setState({
        ...this.state,
        documents: documents.map(item => {
          if (item.id === currentDocument.id) {
            return currentDocument;
          }
          return item;
        })
      });

      swal("Saved successfully!", { icon: "success" });
    }
  };

  deleteDocument = () => {
    const { documents, currentDocument } = this.state;

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          const { success } = await deleteDocument(currentDocument.id);

          if (success) {
            const filteredDocuments = documents.filter(item => item.id !== currentDocument.id);

            this.setState({
              documents: filteredDocuments,
              currentDocument: filteredDocuments.length ? filteredDocuments[0] : {},
              title: filteredDocuments.length ? filteredDocuments[0].title : '',
              selectedId: filteredDocuments.length ? filteredDocuments[0].id : null
            });
          }
        }
      });
  };

  onChangeContent = newContent => {
    this.setState({
      currentDocument: {
        ...this.state.currentDocument,
        content: newContent
      }
    });
  };

  onChangeTitle = event => {
    const { value } = event.target;
    let { currentDocument } = this.state;

    if (value) {
      currentDocument.title = value
      this.setState({
        ...this.state,
        currentDocument,
        title: value
      });
    }
  };

  updateContent = id => {
    const { documents } = this.state;
    const document = documents.filter(item => item.id === id);

    if (document.length) {
      this.setState({
        ...this.state,
        currentDocument: document[0],
        title: document[0].title,
        selectedId: document[0].id
      });
    }
  };

  render() {
    const { documents, currentDocument, title, selectedId } = this.state;
    const disabled = documents.length ? false : true;

    return (
      <div className="container">
        <div className="header">
          <HeaderLeft
            inputValue={title}
            onChangeTitle={this.onChangeTitle}
            disabled={disabled}
          />
          <HeaderRight
            updateDocument={this.updateDocument}
            deleteDocument={this.deleteDocument}
            disabled={disabled}
          />
        </div>

        <div className="sidebar">
          <DocumentsList
            documents={documents}
            onClick={this.updateContent}
            selectedId={selectedId}
          />
          <div className="sidebar-action">
            <button className="btn btn-dark" onClick={this.createDocument}>
              New Document
            </button>
          </div>
        </div>

        <div className="content">
          {
            documents.length ?
              <MarkdownEditor
                content={currentDocument.content}
                onChangeContent={this.onChangeContent}
              /> :
              null
          }
        </div>
      </div>
    );
  }
}

export default App;
