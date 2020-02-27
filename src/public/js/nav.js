const silerMenu = () => {
    const burgerIcon = document.querySelector(".burger");
    const navBarList = document.querySelector(".navbar-list");
    burgerIcon.addEventListener("click", () => {
        if (!burgerIcon.classList.contains("open")) {
            burgerIcon.classList.add("open");
            navBarList.classList.add("navbar-list-appear");
        } else {
            burgerIcon.classList.remove("open");
            navBarList.classList.remove("navbar-list-appear");
        }
    });
};

silerMenu();
