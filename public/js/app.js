console.log("client side javascript is loaded")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')


document.addEventListener('submit' , (e) => {
   e.preventDefault()
   const location = search.value  
   messageOne.textContent = 'Loading...'
   messageTwo.textContent = ''
   fetch('/weather?address=' + location).then((response) => {

    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forcast
        }

    })

}) 
})