$(document).ready(() => {

  const processElementIfNotValid = (inputElement, inputData, text) => {
    inputElement.after(`<div class="error">${inputData.description} ${text}</div>`);
    $(`[name=${inputData.class}]`).addClass('invalid');
  };

  const validateSelectionForm = (event) => {
    event.preventDefault();

    const textRegExp = /^[^'"]*$/;
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const form = document.forms.selection;
    const firstName = form.firstname.value;
    const lastName = form.lastname.value;
    const birthday = form.birthday.value;
    const sex = form.sex.value;
    const country = form.country.value;
    const email = form.email.value;
    const password = form.password.value;
    const address = form.address.value;
    const inputsForValidation = [
      {
        value: firstName,
        class: 'firstname',
        description: 'First name'
      },
      {
        value: lastName,
        class: 'lastname',
        description: 'Last name'
      },
      {
        value: birthday,
        class: 'birthday',
        description: 'Birthday'
      },
      {
        value: sex,
        class: 'sex',
        description: 'Sex'
      },
      {
        value: country,
        class: 'country',
        description: 'Country'
      },
      {
        value: email,
        class: 'email',
        description: 'Email'
      },
      {
        value: password,
        class: 'password',
        description: 'Password'
      },
      {
        value: address,
        class: 'address',
        description: 'Address'
      }
    ];
    let validForm = true;

    $('.error').hide();
    $('.selection-form .invalid').removeClass('invalid');

    inputsForValidation.forEach(inputData => {
      const input = $(`.${inputData.class}`);
      if (inputData.value) {
        if (input.prop('type') === 'text' && !textRegExp.test(inputData.value)) {
          processElementIfNotValid(input, inputData, 'should not contain quotes (\' and ")');
          validForm = false;
        }
        if (input.prop('type') === 'email' && !emailRegExp.test(inputData.value)) {
          processElementIfNotValid(input, inputData, 'has bad format');
          validForm = false;
        }
      } else {
        processElementIfNotValid(input, inputData, 'can\'t be empty');
        validForm = false;
      }
    });

    if (validForm) {
      $(".selection-form--submitted").dialog();
    }
  };

  $('.submit').click(validateSelectionForm);
});