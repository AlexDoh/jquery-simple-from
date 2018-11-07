$(document).ready(() => {

  const processElementIfNotValid = (inputElement, inputData, text) => {
    const description = `${inputData.name.charAt(0).toUpperCase()}${inputData.name.slice(1)}`;
    inputElement.after(`<div class="error">${description} ${text}</div>`);
    $(`[name=${inputData.name}]`).addClass('invalid');
  };

  const checkValidBirthday = date => {
    const dateTime = Date.parse(date);
    const currentDate = new Date();
    const maxDate = currentDate.getTime();
    const minDate = currentDate.setFullYear(currentDate.getFullYear() - 100);
    return dateTime >= minDate && dateTime <= maxDate;
  };

  const validateSelectionForm = event => {
    event.preventDefault();

    const textRegExp = /^[^'"]*$/;
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const excludedFromValidation = ['notes'];
    const formValues = $(document.forms.selection)
    .serializeArray()
    .filter(field => !excludedFromValidation.includes(field.name));
    let validForm = true;

    $('.error').hide();
    $('.selection-form .invalid').removeClass('invalid');

    formValues.forEach(inputData => {
      const input = $(`.${inputData.name}`);
      if (inputData.value) {
        if (input.prop('type') === 'text' && !textRegExp.test(inputData.value)) {
          processElementIfNotValid(input, inputData, 'should not contain quotes (\' and ")');
          validForm = false;
        }
        if (input.prop('type') === 'email' && !emailRegExp.test(inputData.value)) {
          processElementIfNotValid(input, inputData, 'has bad format');
          validForm = false;
        }
        if (input.prop('type') === 'date' && !checkValidBirthday(inputData.value)) {
          processElementIfNotValid(input, inputData, 'is not valid');
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