import Login from "../components/login.js" 
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
    if(currentPage==="login") Login.addListeners();
    if(currentPage==="signup") SignUp.addListeners();
  }
}

export default LoginPage