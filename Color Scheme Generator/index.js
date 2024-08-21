let isDarkModeActive = false;

document.addEventListener("click", (e) => {
    if (e.target.id === 'get-scheme') {
        const inputColorEl = document.getElementById("input-color");
        const inputColorValue = inputColorEl.value;
        const optionsModeEl = document.getElementById("select-mode");
        const optionsModeValue = optionsModeEl.value;
        sendSchemeRequest(inputColorValue, optionsModeValue);
    } else if (e.target.id === "switch-mode" && !isDarkModeActive) {
        document.body.classList.add("dark-mode");
        isDarkModeActive = true;
    } else if (e.target.id === "switch-mode" && isDarkModeActive) {
        document.body.classList.remove("dark-mode");
        isDarkModeActive = false;
    }
});

function sendSchemeRequest(colorValue, modeValue) {
    const cleanedColorValue = colorValue.replace('#', '');
    fetch(`https://www.thecolorapi.com/scheme?hex=${cleanedColorValue}&format=json&mode=${modeValue}&count=5`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
        .then(result => result.json())
        .then((data) => {
            renderScheme(data);
        });
}

function renderScheme(data) {
    let colorHtml = '';
    data.colors.forEach((color) => {
        colorHtml += `
        <div class="container">
            <h3 class="switch">${color.name.value}</h3>
            <h4 class="switch">${color.hex.value}</h4>
            <div class="color-bar" style="background: ${color.hex.value}"></div>
        </div>
        `;
    });
    document.getElementById("color-response").innerHTML = colorHtml;
}
