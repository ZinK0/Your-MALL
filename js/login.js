// User Authentication Start Here
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
  // TODO: future update have to add two option like email and username
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

  let loginUsername = document.getElementById("login_name");
  let loginPassword = document.getElementById("login_password");
  let loginForm = document.querySelector("#login_form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let loginDATA = {
      username: loginUsername.value,
      password: loginPassword.value,
    };

    // Fetch registered users
    let registeredAccounts = await fetchSignedUpUser();
    // console.log(registeredAccounts);

    // You have to get the login success data for unlock the feature in ecommerce
    // TODO: separate the function for login success data
    if (checkRegisteredUser(loginDATA, registeredAccounts)) {
      alert("Login Success!!!");
      // Redirect to index.html
      window.location.href = "index.html";
    } else {
      alert("You haven't registered yet, please sign up...");
    }
  });
});
