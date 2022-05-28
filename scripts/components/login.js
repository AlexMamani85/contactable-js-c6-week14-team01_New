// REVISAR COMENTARIOS
import { login } from "../services/sessions-service.js";
import DOMHandler from "../dom-handler.js";
import { input  } from "./input.js";
import STORE from "../store.js";
import HomePage from "./../pages/homepage.js";
import currentPage from "../currentPageSession.js";

function render() {

  const { loginError } = Login.state;

  return `
        <h1 class="session__title">Login</h1>
        <hr class="hr">
        <form class="session__form">
          <div class="form__input-container">
            ${input({
              type: "email",
              placeholder: "example@gmail.com",
              required: true,
              value: "team01@mail.com" // quitar el value al final
            })}

            ${input({
              type: "password",
              placeholder: "******",
              required: true,
              value: "123456" // quitar el value al final
            })}

            ${loginError ? 
              `<p class="text-center error-300">${loginError}</p>`: ''
            }
          </div>
          <div class="session__buttons">
            <hr class="hr">
            <a href="#" class="button__link signup">Signup</a>
            <button class="button__link" type="submit">Login</button>
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
  
      const user = await login(credentials)
      STORE.user = user
      // console.log(STORE)

      await STORE.filterContacts()
      DOMHandler.load(HomePage)
    } catch (error) {
      // this.state.loginError = error.message
      Login.state.loginError = error.message
      DOMHandler.reload()
    }
  })
}

function listenButtonSignup() {
  const button = document.querySelector(".signup");

  button.addEventListener("click", event => {
    event.preventDefault();

    currentPage.page = "signup";
    DOMHandler.reload();
  })
}

const Login = {
  toString() {
    // return render.call(this)
    return render()
  },
  addListeners() {
    // listenSubmitForm.call(this)
    listenSubmitForm(),
    listenButtonSignup()
  },
  state: {
    loginError: null
  }
}

export default Login