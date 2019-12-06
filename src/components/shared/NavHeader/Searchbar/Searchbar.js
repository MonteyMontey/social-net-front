import React from 'react';
import Autosuggest from 'react-autosuggest';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

import Avatar from '../../../../images/user_profile.png';
import './Searchbar.css';

import { sendLog } from '../../../../utils';

const getSuggestionValue = suggestion => suggestion.firstName + " " + suggestion.lastName;

const renderSuggestion = suggestion => (
  <div className="suggestion-content">
    <img style={{ height: "37px", width: "37px", marginRight: "15px" }} src={Avatar} alt="avatar"></img>
    {suggestion.firstName + " " + suggestion.lastName}
  </div>
);

class Searchbar extends React.Component {

  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();

    Axios.get('/users/textsearch', {
      params: {
        inputValue: inputValue
      }
    })
      .then(res => {
        this.setState({
          suggestions: res.data
        });
      })
      .catch(err => {
        sendLog(err, "connection error");
        this.setState({
          suggestions: []
        });
      });
  };

  onChange = (_, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.getSuggestions(value)

  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  userSelected = (_, { suggestion }) => {
    this.props.history.push(`/user/${suggestion._id}`);
  };


  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.userSelected}
      />
    );
  }

}

export default withRouter(Searchbar);