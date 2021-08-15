import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    try {
      const values = await axios.get('/api/values/current');
      this.setState({ values: values.data });
    } catch(e) {
    }

  }

  async fetchIndexes() {
    try {
      const seenIndexes = await axios.get('/api/values/all');
      this.setState({
        seenIndexes: seenIndexes.data,
      });
    } catch(e) {
    }

  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  handleSubmit = async (event) => {
    try {
      await axios.post('/api/values', {
        index: this.state.index
      });

      this.setState({ index: ''});
    } catch(e) {
      alert(e.response.data);
    }

  }

  renderValues() {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} Calculated value is {this.state.values[key]}
        </div>
      );
    }
    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            pattern="[0-9]+"
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>
        <h3>Indexes Already Seen:</h3>
        { this.renderSeenIndexes() }

        <h3>Calculated Values:</h3>
        { this.renderValues() }

      </div>
    );
  }
}

export default Fib;
