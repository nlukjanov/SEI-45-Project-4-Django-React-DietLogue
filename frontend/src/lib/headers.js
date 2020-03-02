import Cookies from 'js-cookie'
		
const csrftoken = Cookies.get('csrftoken')



const headers = {
  common: {
    'X-CSRF-TOKEN': csrftoken
  }
}

console.log(csrftoken)

export default headers