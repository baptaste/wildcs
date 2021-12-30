import axios from 'axios'

const memberItems = document.querySelectorAll('.member-item');
let members = [];

async function getMembersFromAPI() {
  try {
    const membersData = await axios.get('http://localhost:3500/members');
    return membersData.data.rows;
  } catch (error) {
    console.log(error);
  }
}

function readMembersValue() {
  getMembersFromAPI()
  .then((res) => {
    console.log('res :' , res);
    members = res;
  })
  .finally(() => {
    createMemberElems(members);
  })
}

function createMemberElems(members) {
  const memberNames  = members.map((member) => member.name)
  memberItems.forEach((item, i) => item.innerText = memberNames[i])
}

document.addEventListener('DOMContentLoaded', readMembersValue);