# FORM VALIDATION LIBRARY

## Building Library with JavaScript

Author: ANDY_NGO

Facebook: https://fb.com/100006806881094

Group Fb: https://fb.com/groups/dobeeteam.community

___________________________________________________

## How To Use ?

Note: Can use template error message and form css in library or your css.

1.Link file validator.js in html 

    <script src="./assets/js/validator.js"></script>

    If not CSS: <link rel="stylesheet" href="./assets/css/style-form.css">

2.After link , write script for active libary 

    Example: 

        +<script>
        +    Validator({
        +        form: '.auth-form__container',
        +        formGroupSelector: '.auth-form__group',
        +        errorSelector: '.form-message',
        +        rules: [
        +            //Rule Login
        +            Validator.isRequired('#email-login'),
        +            Validator.isEmail('#email-login'),
        +            Validator.minLength('#password-login', 6),
        +            //Rule Register
        +            Validator.isRequired('#email'),
        +            Validator.isEmail('#email'),
        +            Validator.minLength('#password', 6),
        +            Validator.isRequired('#password_confirmation'),
        +            Validator.isConfirmed('#password_confirmation', function () {
        +                return document.querySelector('.auth-form__container #password').value;
        +            }, 'Mật khẩu nhập lại không chính xác !')
        +        ],
        +    });
        +</script>

3.Change props and params in rule and object of Validator function








Example Code validate an email use regex email: 

+ function ValidateEmail(mail) {

+  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(myForm.emailAddr.value))

+   {

+     return (true)

+   }

+     alert("You have entered an invalid email address!")

+     return (false)

+ }