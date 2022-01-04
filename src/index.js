import axios from 'axios'

const memberList = document.querySelector('.member-list'),
      form = document.querySelector('.new-member-form'),
      formInput = document.querySelector('#name');

let members = [],
    inputValue = '',
    requestError = false;

function init() {
  readMembersValues();
  handleInputChange();
  handleFormSubmit();
}

async function getMembersFromAPI() {
  try {
    const membersData = await axios.get('http://localhost:3500/members');
    return membersData.data.rows;
  } catch (error) {
    console.log(error);
  }
}

function readMembersValues() {
  getMembersFromAPI()
  .then((res) => {
    members = res
  })
  .finally(() => {
    createMembersElems(members);
  })
}

function createMembersElems(members) {
  const memberNames = members.map((member) => member.name);

  members.map((member, i) => (
    member = document.createElement('div'),
    member.classList.add('member-item'),
    member.innerText = memberNames[i],
    memberList.append(member)
  ));
}

function handleInputChange() {
  formInput.addEventListener('change', (event) => {
    inputValue = event.target.value
  })
}

function handleFormSubmit() {
  form.addEventListener('submit', createMember);
}

async function createMember(event) {
  event.preventDefault();
  const regex = inputValue.match(/^[a-zA-Z\s]*$/);

  if (regex && inputValue !== '') {
    const data = {
      key: 'name',
      value: inputValue,
    }

    try {
     const res = await axios.post('http://localhost:3500/member/add', data, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (res.data.error && !requestError) {
        createErrorMessage(res.data.error);
        requestError = true
      }

      if (res.data.id) {
        requestError = false
        clearAll();
        readMembersValues();
      }

    } catch (error) {
      console.error(error);
    }
  } else {
    alert('Seules des lettres sont autorisées.');
  }
}

function clearMembers() {
  members = []
  memberList.innerHTML = ''
}

function clearFormInput() {
  inputValue = ''
  formInput.value = ''
}

function createErrorMessage(message) {
  const errorField = document.createElement('p');
  errorField.classList.add('errorField');
  errorField.innerText = message
  form.append(errorField);
}

function clearErrorMessage() {
  const errorFields = document.querySelectorAll('.errorField');
  for (const errorField of errorFields) {
    form.removeChild(errorField)
  }
  requestError = false
}

function clearAll() {
  clearErrorMessage();
  clearFormInput();
  clearMembers();
}

document.addEventListener('DOMContentLoaded', init);