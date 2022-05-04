import {
  getDatabase,
  ref,
  set,
  child,
  get,
  onValue,
} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.7.0/firebase-database.min.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8kApsCnp31epp8Sdzg3th-TYrNjYcMNY",
  authDomain: "djns-dc35c.firebaseapp.com",
  databaseURL:
    "https://djns-dc35c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "djns-dc35c",
  storageBucket: "djns-dc35c.appspot.com",
  messagingSenderId: "192876513475",
  appId: "1:192876513475:web:8a581e11af4921eb817a76",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const data = ref(getDatabase());
const db = getDatabase(app);

var USER_NAME = document.getElementById("name");
var LAST_NAME = document.getElementById("surname");
//7var PASSWORD = document.getElementById("password");
//var STATUS = document.getElementById("name");
var DEPARTMENT = document.getElementById("department");
//var CONFIRM_BEFORE = document.getElementById("name");
var TITLE = document.getElementById("title");
var SUBDEPARTMENT = document.getElementById("subdepartment");
var REGISTER_BUTTON = document.getElementById("register");
REGISTER_BUTTON.onclick = function () {
  let allAreFilled = true;
  document
    .getElementById("userForm")
    .querySelectorAll("[required]")
    .forEach(function (i) {
      if (!allAreFilled) return;
      if (!i.value) {
        allAreFilled = false;
        return;
      }
    });
  if (!allAreFilled) {
    alert("Fill all the fields");
  } else if (allAreFilled) {
    newUser();
  }
};

async function newUser() {
  var count = await get(child(data, "count/users/"));

  set(ref(db, "count/"), {
    users: count.val() + 1,
  });

  set(ref(db, `users/${count.val() + 1}/`), {
    GivenName: USER_NAME.value,
    Surname: LAST_NAME.value,
    AccountPassword: "DataIt2022!",
    Enabled: true,
    Department: DEPARTMENT.value,
    SubDepartment: SUBDEPARTMENT.value,
    Title: TITLE.value,
    Confirm: false,
  });
}
