# FORM REGISTER VALIDATION EXAMPLE 

# Exercise number 1 - JavaScript 

Author: ANDY_NGO

Facebook: https://fb.com/100006806881094

Group Fb: https://fb.com/groups/dobeeteam.community

Practise with HTML DOM 










Example Code validate an email: 

+ function ValidateEmail(mail) 
+ {
+  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(myForm.emailAddr.value))
+   {
+     return (true)
+   }
+     alert("You have entered an invalid email address!")
+     return (false)
+ }

