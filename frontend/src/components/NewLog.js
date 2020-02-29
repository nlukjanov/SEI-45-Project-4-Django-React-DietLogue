import React from 'react'
import axios from 'axios'
// import Auth from '../../lib/auth'

class NewLog extends React.Component {
  state = {
    data: {
      name: '',
      origin: '',
      image: '',
      tastingNotes: ''
    },
    food: {

    }
  }

  async componentDidMount() {
    try {
      const res = await axios.get('localhost:8000/api/foods/')
      this.setState({ food: res.data })
    } catch (error) {
      // this.props.history.push('/notfound')
    }
  }
  

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    console.log(e.target)

    // try {
    //   const res = await axios.post(
    //     'https://cheesebored.herokuapp.com/cheeses',
    //     this.state.data,
    //     { headers: { Authorization: `Bearer ${Auth.getToken('token')}` } } // we include our users token in the request header to authenticate them
    //   )
    //   this.props.history.push(`/cheeses/${res.data._id}`) // we redirect our user to their newly created cheese show page, we ge the id of that new cheese from the successful POST request response
    // } catch (error) {
    //   console.log(error.res)
    // }
  }

  render() {
    return (
      <section className='section'>
        <div className='container'>
          <div className='columns'>
            <form
              onSubmit={this.handleSubmit}
              className='column is-half is-offset-one-quarter'
            >
              <h2 className='title'>New Cheese</h2>
              <div className='field'>
                <label className='label'>Name</label>
                <div className='control'>
                  <input
                    className='input'
                    placeholder='Name'
                    name='name'
                    onChange={this.handleChange}
                    value={this.state.data.name}
                  />
                </div>
              </div>
              <div className='field'>
                <button
                  type='submit'
                  className='button is-fullwidth is-warning'
                >
                  Add Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default NewLog
