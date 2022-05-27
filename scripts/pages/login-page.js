// REVISAR COMENTARIOS


import { input  } from "../components/input";

function render() {

  const { loginError } = LoginPage.state;
  return `
    <main class="section">
      <section class="container">
        <h1 class="heading heading--lg text-center mb-4">Login</h1>
        <form class="flex flex-column gap-4 mb-4 js-login-form">

          ${input({
            label: "email",
            id: "email",
            type: "email",
            placeholder: "example@gmail.com",
            required: true,
            value: "team01@mail.com" // quitar el value al final
          })}

          ${input({
            label: "password",
            id: "password",
            type: "password",
            placeholder: "******",
            required: true,
            value: "123456" // quitar el value al final
          })}

          ${loginError ? 
            `<p class="text-center error-300">${loginError}</p>`: ''
          }

          <button class="button button--primary">Login</button>
        </form>
        <a href="#" class="block text-center js-signup-link">Create account</a>
      </section>
    </main>
  `;
}

function listenSubmitForm() {
  const form =  document.querySelector(".js-login-form")

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

      await STORE.fetchCategories()
      DOMHandler.load(HomePage)
    } catch (error) {
      // this.state.loginError = error.message
      LoginPage.state.loginError = error.message
      DOMHandler.reload()
    }
  })
}

const LoginPage = {
  toString() {
    // return render.call(this)
    return render()
  },
  addListeners() {
    // listenSubmitForm.call(this)
    return listenSubmitForm()
  },
  state: {
    loginError: null,
  }
}