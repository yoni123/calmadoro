import React from 'react'
import ActionBtn from './actionBtn'

class ActionRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  actionClicked = (value) => {
    this.props.activateAction(value);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ value: newProps.value });
  }

  render() {
    return (
      <div className="row action-container justify-content-center">
        <ActionBtn actionClicked={this.actionClicked} value={this.state.value} />
        <ActionBtn actionClicked={this.actionClicked} value="reset" />
      </div>
    )
  }
}

export default ActionRow;