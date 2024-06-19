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

  let userProfile;

  function checkRegisteredUser(toCheck, registeredUsers) {
    let found = false;
    for (const user of registeredUsers) {
      if (
        user.username === toCheck.username &&
        user.password === toCheck.password
      ) {
        userProfile = user.userprofile;
        found = true;
        console.log("Founded!!!");
        console.log("User Profile", user.userprofile);
        break; // No need to continue loop if user is found
      }
    }
    return found;
  }

  // console.log(userProfile);

  let loginUsername = document.getElementById("login_name");
  let loginPassword = document.getElementById("login_password");
  let loginForm = document.querySelector("#login_form");

  // Get userprofile
  // function getUserProfile (to) {
  //   for (const user of registeredUsers) {
  //     if user.username === input
  //   }
  // }
  // Save Login State
  function saveLoginState() {
    let loginState = {
      name: loginUsername.value,
      state: "True",
    };

    localStorage.setItem("loginState", JSON.stringify(loginState));
  }

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
      saveLoginState();
      // Redirect to index.html
      window.location.href = "index.html";
    } else {
      alert("You haven't registered yet, please sign up...");
    }
  });
});
