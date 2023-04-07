const inputs = document.querySelectorAll(".input");
const btnEl = document.querySelector(".btn");
let errors = {
  first_name: [],
  last_name: [],
  email: [],
  password: [],
};
const regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

btnEl.addEventListener("click", () => {
  inputs.forEach((element) => {
    console.log(element);
    let inputValue = element.value;
    let inputName = element.getAttribute("name");
    let inputPlaceholder = element.getAttribute("placeholder");
    errors[inputName] = [];

    if (inputName === "email" && !validateEmail(inputValue)) {
      errors[inputName].push("Looks like this is not an email");
      element.classList.add("error_img");
    } else if (inputValue === "") {
      errors[inputName].push(`${inputPlaceholder} cannot be empty`);
      element.classList.add("error_img");
    } else {
      element.classList.remove("error_img");
    }

    populateErrors();
  });
});

const populateErrors = () => {
  const errorMsgList = document.querySelectorAll(".error_container");
  for (let elem of errorMsgList) {
    elem.remove();
  }

  for (let key of Object.keys(errors)) {
    let input = document.querySelector(`.${key}`);

    let messageContainer = document.createElement("div");
    messageContainer.classList.add("error_container");

    errors[key].forEach((error) => {
      let messageClass = "error_msg";
      messageContainer.innerHTML = `<p class="${messageClass}">${error}</p>`;
      input.parentNode.insertBefore(messageContainer, input.nextSibling);
    });
  }
};

const validateEmail = (email) => {
  if (regex.test(email)) {
    return true;
  }

  return false;
};
