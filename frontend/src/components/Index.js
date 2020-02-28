import React from 'react'
import { get } from 'axios'
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
<h1>Index</h1>
)
}
}
export default Index


