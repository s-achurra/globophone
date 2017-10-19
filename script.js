const dataForm = document.querySelector('form');
const nameField = dataForm.querySelector('#name-field');
const phoneField = dataForm.querySelector('#phone-field');
const deleteButton = dataForm.querySelector('#delete');
const nameError = dataForm.querySelector('#name-error');
const phoneError = dataForm.querySelector('#phone-error');
const main = document.querySelector('main');
let userData = JSON.parse(localStorage.getItem('userData')) || {};

function onLoad() {
  nameField.value = userData['name'] || '',  phoneField.value = userData['phone'] || '';
  clearErrors();
  showDeleteButton();
}

function submitData(e) {
  e.preventDefault();

  if (nameField.value && isValidPhone(phoneField.value)) {
    userData['name'] = nameField.value;
    userData['phone'] = phoneField.value;

    localStorage.setItem('userData', JSON.stringify(userData));

    main.innerHTML = `
    <h2>Saved ${userData['name']}</h2>
    <a href="">Go Back to Start</a>
    `
  } else {
    createErrorMessaging();
  }
}

function deleteData() {
  localStorage.clear(), userData = {};
  onLoad();
}

function showDeleteButton() {
  if (Object.keys(userData).length === 0) {
    deleteButton.classList.add('hidden');
  } else {
    deleteButton.classList.remove('hidden');
  }
}

function isValidPhone(phone) {
  phone = phone.replace(/[\.-\s]/g, '');
  return (phone.match(/^[1-9]\d{9,10}$/g)) ? true : false
}

function createErrorMessaging() {
  clearErrors();

  if (!nameField.value) {
    nameError.parentNode.classList.add('has-error');
    nameError.innerHTML = 'Name cannot be blank';
  }

  if (!phoneField.value) {
    phoneError.parentNode.classList.add('has-error');
    phoneError.innerHTML = 'Phone cannot be blank';
  } else if (!isValidPhone(phoneField.value)) {
    phoneError.parentNode.classList.add('has-error');
    phoneError.innerHTML = 'Phone must be 10 or 11 digits, and cannot start with 0.';
  }
}

function clearErrors() {
  nameError.innerHTML = ' ', phoneError.innerHTML = ' ';
  nameError.parentNode.classList.remove('has-error');
  phoneError.parentNode.classList.remove('has-error');
}

dataForm.addEventListener('submit', submitData);
deleteButton.addEventListener('click', deleteData);
onLoad();
