// sign up page
// inputs
var fullName = document.querySelector('#name')
var emailOrPhoneNum = document.querySelector('#emailOrPhoneNum')
var password = document.querySelector('#password')
var reEnterPassword = document.querySelector('#re-password')
// validate full name
var validName = false
fullName.onblur = ()=>{
    var fullNamePattern =/^[a-z]{3,}(\s[a-z]{3,})+$/i
    if(!fullNamePattern.test(fullName.value)){
        document.querySelector('input[type=text]#name+span').style.display = 'block'
        validName = false
    }
    else{
        document.querySelector('input[type=text]#name+span').style.display = 'none'
        validName = true
    }
}
// validate email or phone number
var validEmailOrPhoneNum = false
emailOrPhoneNum.onblur = ()=>{
    var emailOrPhoneNumPattern =/((^[a-z]+([a-z]|[0-9]|.)*@[a-z]+.(com|net|edu|org)$)|(^01(0|1|2|5)[0-9]{8}$))/
    if(!emailOrPhoneNumPattern.test(emailOrPhoneNum.value)){
        document.querySelector('input[type=text]#emailOrPhoneNum+span').style.display = 'block'
        validEmailOrPhoneNum = false
    }
    else{
        document.querySelector('input[type=text]#emailOrPhoneNum+span').style.display = 'none'
        validEmailOrPhoneNum = true
    }
}
// validate password
var validPassword = false
password.onblur = ()=>{
    var passwordPattern =/^[a-z0-9]{6,}/
    if(!passwordPattern.test(password.value)){
        document.querySelector('input[type=password]#password+span').style.display = 'none'
        document.querySelector('input[type=password]#password~.invalid').style.display = 'block'
        validPassword = false
    }
    else{
        document.querySelector('input[type=password]#password~.invalid').style.display = 'none'
        validPassword = true
    }
}
// validate re-enter password
var validReEnterPassword = false
reEnterPassword.onblur = ()=>{
    if(reEnterPassword.value!==password.value){
        document.querySelector('input[type=password]#re-password+span').style.display = 'block'
        validReEnterPassword = false
    }
    else{
        document.querySelector('input[type=password]#re-password+span').style.display = 'none'
        validReEnterPassword = true
    }
}
// submit
var signUp = document.querySelector('.signUp-btn input')
signUp.addEventListener('click',function(e){
    e.preventDefault()
    if(validName&&validEmailOrPhoneNum&&validPassword&&validReEnterPassword){
        // get amazon users
        var users = JSON.parse(localStorage.getItem('amazonUsers')) ? JSON.parse(localStorage.getItem('amazonUsers')) : []
        // check if user signed up before
        var isExist=false
        users.forEach(user => {
            if(user.emailOrPhoneNum==emailOrPhoneNum.value){
                isExist = true
            }
        });
        if(isExist){
            var emailPattern = /^[a-z]+([a-z]|[0-9]|.)*@[a-z]+.(com|net|edu|org)$/
            if(emailPattern.test(emailOrPhoneNum.value)){
                alert('Email already in use')
            }
            else{
                alert('Mobile number already in use')
            }
        }
        else{
            // create user
            var currentUser = {
                fullName: fullName.value,
                emailOrPhoneNum: emailOrPhoneNum.value,
                password: password.value
            }
            // add to amazon users
            users.push(currentUser)
            localStorage.setItem('amazonUsers',JSON.stringify(users))
            // set current user
            localStorage.setItem('currentUser',JSON.stringify(currentUser))
            if(localStorage.getItem('currentURL')){
                location.href = localStorage.getItem('currentURL')
            }
            else{
                // submit sign up info
                document.forms[0].submit()
            }
            // reset sign up form
            document.forms[0].reset()
        }
    }
})