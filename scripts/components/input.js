export function input({type, placeholder = "", required = false, value = false}) {
  return `
      <input
        type="${type ? type : "text" }"
        placeholder="${placeholder}"
        class="session__input"
        name="${type}"
        ${value ? `value="${value}"` : ""}
        ${required ? "required" : ""}
      >
  `
}