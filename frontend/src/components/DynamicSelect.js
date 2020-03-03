import React from 'react'



class DynamicSelect extends React.Component {

  handleChange = e => {
    let selectedValue = e.target.value
    this.props.onSelectChange(selectedValue)
  }
  render() {
    let data = this.props.data
    let options = data.map(number => {
      return (
        <option key={number} value={number}>
          {number}
        </option>
      )
    })
    return (
      <select onChange={this.handleChange}>
        <option></option>
        {options}
      </select>
    )
  }
}

export default DynamicSelect
