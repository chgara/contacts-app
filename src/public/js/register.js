const eraseError = () => {
    const btn = document.querySelectorAll(".error-btn");
    const msg = document.querySelectorAll(".error-msg");

    btn.forEach((boton, currentValue) => {
        boton.addEventListener("click", () => {
            msg[currentValue].classList.add("none");
        });
    });
};
eraseError();
