const addButton = document.getElementById("addButton");
const artikelInput = document.getElementById("artikel");
const anzahlInput = document.getElementById("anzahl");
const preisInput = document.getElementById("preis");
const kategorieInput = document.getElementById("kategorie");
const liste = document.getElementById("liste");
const gesamt = document.getElementById("gesamt");
const clearButton = document.getElementById("clearButton");
const darkModeButton = document.getElementById("darkModeButton");

let gesamtPreis = 0;
let darkMode = false;

addButton.addEventListener("click", addItem);

// Enter-Taste Funktionalität
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addItem();
    }
});

function addItem() {
    const artikel = artikelInput.value;
    const anzahl = parseInt(anzahlInput.value);
    const preis = parseFloat(preisInput.value);
    const kategorie = kategorieInput.value;

    // Eingabe überprüfen
    if (!artikel || isNaN(anzahl) || isNaN(preis)) {
        if (!artikel) artikelInput.classList.add("error"); else artikelInput.classList.remove("error");
        if (isNaN(anzahl)) anzahlInput.classList.add("error"); else anzahlInput.classList.remove("error");
        if (isNaN(preis)) preisInput.classList.add("error"); else preisInput.classList.remove("error");
        return;
    }

    // Eingabefelder zurücksetzen
    artikelInput.classList.remove("error");
    anzahlInput.classList.remove("error");
    preisInput.classList.remove("error");

    // Emoji für Kategorie
    let kategorieEmoji = "";
    switch (kategorie) {
        case "Obst": kategorieEmoji = ""; break;
        case "Gemüse": kategorieEmoji = ""; break;
        case "Drogerie": kategorieEmoji = ""; break;
        default: kategorieEmoji = "";
    }

    // Neues Element erstellen
    const new_li = document.createElement("li");

    // Checkbox erstellen
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true; // Standardmäßig ausgewählt
    new_li.appendChild(checkbox);

    // Textinhalt erstellen
    const gesamtArtikelPreis = anzahl * preis;
    const textNode = document.createTextNode(`${anzahl} x ${artikel} ${kategorieEmoji}: ${preis.toFixed(2)}€ p.P. ------ ${gesamtArtikelPreis.toFixed(2)}€`);
    new_li.appendChild(textNode);

    // Löschen-Button erstellen
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", () => {
        liste.removeChild(new_li);
        updatePreis();
    });
    new_li.appendChild(deleteButton);

    // Tooltip erstellen
    const tooltip = document.createElement("span");
    tooltip.classList.add("tooltip");
    const now = new Date();
    tooltip.textContent = `Hinzugefügt: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    new_li.appendChild(tooltip);

    liste.appendChild(new_li);

    // Gesamtpreis aktualisieren
    updatePreis();

    // Eingabefelder leeren
    artikelInput.value = "";
    anzahlInput.value = "";
    preisInput.value = "";
}

function updatePreis() {
    gesamtPreis = 0;
    const listItems = liste.querySelectorAll("li");
    listItems.forEach(item => {
        const checkbox = item.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            const preisText = item.textContent;
            const preisMatch = preisText.match(/------ (\d+\.\d+)€/);
            if (preisMatch) {
                gesamtPreis += parseFloat(preisMatch[1]);
            }
        }
    });
    gesamt.textContent = `Gesamt: ${gesamtPreis.toFixed(2)}€`;
}

clearButton.addEventListener("click", () => {
    liste.innerHTML = "";
    gesamtPreis = 0;
    updatePreis();
});

darkModeButton.addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode", darkMode);
});