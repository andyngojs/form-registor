
// Đối tượng  `Validatior`
function Validator(option) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate (inputElement, rule) {
        var errorElement = getParent(inputElement, option.formGroupSelector).querySelector(option.errorSelector);
        var errorMessage;

            // Lấy ra các rule của selectoe
            var rules = selectorRules[rule.selector];

            // Lặp qua các rule & kiểm tra 
            // Nếu có lỗi thì dừng việc kiểm tra
            for (var i = 0; i < rules.length; ++i) {
               errorMessage = rules[i](inputElement.value);
               if (errorMessage) break;
            }

            if (errorMessage) {
                errorElement.innerText = errorMessage;
                getParent(inputElement, option.formGroupSelector).classList.add('valid');
            } else {  
                errorElement.innerText = '';
                getParent(inputElement, option.formGroupSelector).classList.remove('valid');
            }

            return !errorMessage;

    }
    
    // Lấy element của form cần validate
    var formElement = document.querySelector(option.form);
    if (formElement) {

        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            // LẶp qua mỗi rules & thực hiện validate
            option.rules.forEach(function (rule) {
                var inputElement = document.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp khi submit với js
                if (typeof option.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]:not([disable])');
                    var formValues = Array.from(enableInputs).reduce(function (value, input) {
                        value[input.name] = input.value ;
                        return value;
                    }, {});
                    option.onSubmit(formValues);
                }
                // TRường hợp khi submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            } 

        }

        // Lặp qua mỗi rules & xử lí (lắng nghe sự kiện blur, input,....)
        option.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input 
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = document.querySelector(rule.selector);

            if(inputElement) {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    //value: inputElement.value
                    //test func: rule.test
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, option.formGroupSelector).querySelector(option.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, option.formGroupSelector).classList.remove('valid');
                }
            }
        });
    }
}


// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả về message lỗi
// 2. khi hợp lệ => không trả về cái gì cả (undefined)

Validator.isRequired = function (selector, message) {
    return {
        selector: selector, 
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này!';
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email' ;
        }
    };
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu là ${min} ký tự` ;
        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
        return {
            selector: selector,
            test: function (value) {
                return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
            }
        };
}