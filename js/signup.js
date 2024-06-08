$(document).ready(function () {
  async function fetchSignedUpUser() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/ZinK0/Your-MALL/main/data/signedup_user.json"
      );
      const registeredAccounts = await response.json();
      return registeredAccounts;
    } catch (error) {
      console.error("Error fetching the signed user:", error);
      return [];
    }
  }

  // Function to check user input name and password in array for registered or new
  function checkRegisteredUser(toCheck, registeredUsers) {
    let found = false;
    for (const user of registeredUsers) {
      if (
        user.username === toCheck.username &&
        user.password === toCheck.password
      ) {
        found = true;
        console.log("Founded!!!");
        break; // No need to continue loop if user is found
      }
    }
    return found;
  }

  // Store registeredUser array for localstorage
  function storeLocal(regUsers) {
    let stringData = JSON.stringify(regUsers);
    localStorage.setItem("registeredUser", stringData);
  }

  let signupBtn = document.querySelector("#signup_btn");
  let signupForm = document.querySelector("#signup_form");
  let signupUsername = document.getElementById("signup_name");
  let signupPassword = document.getElementById("signup_password");

  // Sign UP Logic Start Here
  // This event will check the username and password for new user and register and store local storage.
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let signupDATA = {};
    signupDATA.username = signupUsername.value;
    signupDATA.password = signupPassword.value;

    let registeredAccounts = await fetchSignedUpUser();
    console.log(registeredAccounts);
    // Check the register data in the array if there return already register
    // or push to registerAccounts to save.
    // TODO: Check also in local storage.

    if (checkRegisteredUser(signupDATA, registeredAccounts)) {
      alert("Already SingUP!");
    } else {
      console.log("You haven't register yet, now registered");
      registeredAccounts.push(signupDATA);
      storeLocal(registeredAccounts);
    }

    signupUsername.value = "";
    signupPassword.value = "";
  });
});
