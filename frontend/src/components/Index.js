import React from 'react'
import { get } from 'axios'

import Register from './Register'

class Index extends React.Component {
state = {
data : []
}
getData = async() => {
try {
const { data } = await get('/api/logs')
console.log(data)
} catch(err) {
console.log(err)
}
}
componentDidMount() {
this.getData()
}
render() {
return(
  <>
    <h1>Home Page</h1>
    <Register />
  </>

)
}
}
export default Index


