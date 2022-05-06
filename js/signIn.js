// sign up page
// inputs
var emailOrPhoneNum = document.querySelector('#emailOrPhoneNum')
var password = document.querySelector('#password')
// submit
var signUp = document.querySelector('.signIn-btn input')
signUp.addEventListener('click',function(e){
    e.preventDefault()
    var users = JSON.parse(localStorage.getItem('amazonUsers')) ? JSON.parse(localStorage.getItem('amazonUsers')) : []
    // check if user signed up before
    var isExist=false
    var currentUser
    users.forEach(user => {
        if(user.emailOrPhoneNum==emailOrPhoneNum.value&&user.password==password.value){
            isExist = true
            currentUser = user
        }
    });
    if(isExist){
        // set current user
        localStorage.setItem('currentUser',JSON.stringify(currentUser))
        if(localStorage.getItem('currentURL')){
            location.href = localStorage.getItem('currentURL')
        }
        else{
            // submit sign in info
            document.forms[0].submit()
        }
        // reset sign in form
        document.forms[0].reset()
    }
    else{
        var emailPattern = /^[a-z]+([a-z]|[0-9]|.)*@[a-z]+.(com|net|edu|org)$/
        if(emailPattern.test(emailOrPhoneNum.value)){
            alert('Email or password is incorrect')
        }
        else{
            alert('Mobile number or password is incorrect')
        }
    }
})