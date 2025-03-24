const addButton = document.getElementById("addButton");
const artikelInput = document.getElementById("artikel");
const anzahlInput = document.getElementById("anzahl");
const preisInput = document.getElementById("preis");
const liste = document.getElementById("liste");
const gesamt = document.getElementById("gesamt");
const clearButton = document.getElementById("clearButton");

let gesamtPreis = 0;

addButton.addEventListener("click", () => {
    const artikel = artikelInput.value;
    const anzahl = anzahlInput.value;
    const preis = preisInput.value;

    // Eingabeüberprüfung
    if (!artikel || !anzahl || !preis) {
        if (!artikel) artikelInput.style.borderColor = "red";
        if (!anzahl) anzahlInput.style.borderColor = "red";
        if (!preis) preisInput.style.borderColor = "red";
        return;
    }

    // Eingabefelder zurücksetzen
    artikelInput.style.borderColor = "";
    anzahlInput.style.borderColor = "";
    preisInput.style.borderColor = "";

    // Neues Element erstellen
    const new_li = document.createElement("li");

    // Checkbox erstellen
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true; // Standardmäßig ausgewählt
    new_li.appendChild(checkbox);

    // Textinhalt erstellen
    const textNode = document.createTextNode(`${anzahl} x ${artikel}: ${preis}€ p.P. ------ ${anzahl * preis}€`);
    new_li.appendChild(textNode);

    // Löschen-Button erstellen
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", () => {
        liste.removeChild(new_li);
        updatePreis();
    });
    new_li.appendChild(deleteButton);

    liste.appendChild(new_li);

    // Gesamtpreis aktualisieren
    updatePreis();

    // Eingabefelder leeren
    artikelInput.value = "";
    anzahlInput.value = "";
    preisInput.value = "";
});

function updatePreis() {
    gesamtPreis = 0;
    const listItems = liste.querySelectorAll("li");
    listItems.forEach(item => {
        const checkbox = item.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            const preisText = item.textContent;
            const preisMatch = preisText.match(/(\d+)€$/);
            if (preisMatch) {
                gesamtPreis += parseInt(preisMatch[1]);
            }
        }
    });
    gesamt.textContent = `Gesamt: ${gesamtPreis}€`;
}

clearButton.addEventListener("click", () => {
    liste.innerHTML = "";
    gesamtPreis = 0;
    updatePreis();
});