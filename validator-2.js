function Validator(formSelector) {

    var _this = this;

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var formRules = {};


    /**
     * Quy ước tạo rule:
     * - Nếu có lỗi thì return `error message`
     * - Nếu không có lỗi thfi return `undefined`
     */
    var validatorRules = {
        required: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này !';
        },
        email: function (value) {
            var regex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/ ;
            return regex.test(value) ? undefined : 'Vui lòng nhập email !';
        },
        min: function (min) {
            return function (value) {
                  return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự`;
            }
        },
    };

    // Lấy ra form element trong DOM theo `formSelector`
    var formElement = document.querySelector(formSelector);

    // chỉ xử lý khi có element trong DOM
    if (formElement) {

        var inputs = formElement.querySelectorAll('[name][rules]');
        for (input of inputs) {

            var rules = input.getAttribute('rules').split('|');
            for (var rule of rules) {
                var ruleInfo;
                var isRuleHasValue = rule.includes(':');

                if (isRuleHasValue) {
                   ruleInfo = rule.split(':');
                   rule = ruleInfo[0];
                }

                var ruleFunc = validatorRules[rule];

                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }

             // Lắng nghe sự kiện (event) để validate (blur, onchange , ....)
             input.onblur = handleValidate;
             input.oninput = handleClearError;
        }
 
        // Hàm thực hiện validate
        function handleValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage; 

            for (var rule of rules) {
                 errorMessage = rule(event.target.value);
                 if (errorMessage) break;
            }

            // Nếu có lỗi thì hiển thị message lỗi ra UI
            if (errorMessage) {
                var formGroup = getParent(event.target, '.form-group');
                if (formGroup) {
                    formGroup.classList.add('valid');
                    var formMessage = formGroup.querySelector('.form-message');
                    if (formMessage) {
                        formMessage.innerText = errorMessage;
                    }
                }
            }

            return !errorMessage;
        }

        // Hàm clear message lỗi
        function handleClearError(event) {
            var formGroup = getParent(event.target, '.form-group');
            if (formGroup.classList.contains('valid')) {
                formGroup.classList.remove('valid');
            }
            var formMessage = formGroup.querySelector('.form-message');

            if (formMessage) {
                formMessage.innerText = '';
            }
        }
    }

    // Xử lý hành vi submit form
    formElement.onsubmit = function (event) {
        event.preventDefault();

        var inputs = formElement.querySelectorAll('[name][rules]');
        var isValid = true;

        for (input of inputs) {
            if (!handleValidate({ target: input })) {
                isValid = false;
            };
        }

       // Khi không có lỗi thì submit form
       if (isValid) {
            if (typeof _this.onSubmit === 'function') {
                var enableInputs = formElement.querySelectorAll('[name]');
                var formValues = Array.from(enableInputs).reduce(function (value, input) {
                    value[input.name] = input.value ;
                    return value;
                }, {});

                // Gọi lại hàm onSubmit và trả về kèm giá trị của form
                _this.onSubmit(formValues);
            } else {
                formElement.submit();
            }
       }
    }
}