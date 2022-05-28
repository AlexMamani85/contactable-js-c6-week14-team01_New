import Login from "../components/login.js" 
import SignUp from "../components/signup.js";
import currentPage from "../currentPageSession.js";

function render() {
  const page = currentPage.page;
  return `
    <main class="session-container">
      ${page === "login" ? Login : ""}
      ${page === "signup" ? SignUp : ""}
    </main>
  `
}

const LoginPage = {
  toString() {
    return render();
  },
  addListeners() {
    if(currentPage.page === "login") Login.addListeners();
    if(currentPage.page === "signup") SignUp.addListeners();
  }
}

export default LoginPage