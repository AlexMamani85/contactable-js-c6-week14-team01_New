// REVISAR COMENTARIOS
import { createUser } from "./../services/users-service.js"
import DOMHandler from "../dom-handler.js";
import { input  } from "./input.js";
import STORE from "../store.js";
import HomePage from "./../pages/homepage.js";
import currentPage from "../currentPageSession.js";

function render() {

  const { loginError } = SignUp.state;

  return `
        <h1 class="session__title">Signup</h1>
        <hr class="hr">
        <form class="session__form">
          <div class="form__input-container">
            ${input({
              type: "email",
              placeholder: "email",
              required: true,
            })}

            ${input({
              type: "password",
              placeholder: "password",
              required: true,
            })}

            ${loginError ? 
              `<p class="text-center error-300">${loginError}</p>`: ''
            }
          </div>
          <div class="session__buttons">
            <hr class="hr">
            <a href="#" class="button__link login">Login</a>
            <button class="button__link" type="submit">Create Account</button>
          </div>
        </form>
  `;
}

function listenSubmitForm() {
  const form = document.querySelector(".session__form")

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
  
      const { email, password } = event.target;
  
      const credentials = {
        email: email.value,
        password: password.value,
      }
  
      const user = await createUser(credentials)
      STORE.user = user
      // console.log(STORE)

      await STORE.filterContacts()
      DOMHandler.load(HomePage)
    } catch (error) {
      // this.state.loginError = error.message
      SignUp.state.loginError = error.message
      DOMHandler.reload()
    }
  })
}

function listenButtonLogin() {
  const button = document.querySelector(".login");

  button.addEventListener("click", event => {
    event.preventDefault();

    currentPage.page = "login";
    DOMHandler.reload();
  })
}

const SignUp = {
  toString() {
    // return render.call(this)
    return render()
  },
  addListeners() {
    // listenSubmitForm.call(this)
    listenSubmitForm(),
    listenButtonLogin()
  },
  state: {
    loginError: null
  }
}

export default SignUp