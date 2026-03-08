document.getElementById("btn-login").addEventListener("click", function () {
  // 1. get the name input
  const inputUserName = document.getElementById("input-username");
  const userName = inputUserName.value;
  console.log(userName);

  // 2. get the password input
  const inputPassword = document.getElementById("input-password");
  const password = inputPassword.value;
  console.log(password);
  // 3. match password & name
  if (userName == "admin" && password == "admin123") {
    // 3-1. true::>> alert > Homepage
    alert("Login Success");

    window.location.assign("home.html");
  } else if (userName !== "admin" && password == "admin123") {
    // 3-2. false::>> alert > return
    alert("Username is not Found");
    return;
  } else {
    alert("Password is incorrect");
    return;
  }
});
