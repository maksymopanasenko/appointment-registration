function filterCards() {
    const cards = document.querySelectorAll(".col-sm-6");
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const statusSelect = document.getElementById("statusSelect").value;
    const urgencySelect = document.getElementById("urgencySelect").value;
    const text = document.getElementById('no-item');

    let counter = 0;

    cards.forEach(card => {
        const doctorElement = card.querySelector("[data-prop=doctor]");
        const nameElement = card.querySelector("[data-prop=name]");
        const purposeElement = card.querySelector("[data-prop=reason]");
        const descriptionElement = card.querySelector("[data-prop=description]");
        const statusElement = card.querySelector(".check-box");
        const urgencyElement = card.querySelector("[data-prop=urgency]");

        const doctor = doctorElement ? doctorElement.textContent.toLowerCase() : "";
        const name = nameElement ? nameElement.textContent.toLowerCase() : "";
        const purpose = purposeElement ? purposeElement.textContent.toLowerCase() : "";
        const description = descriptionElement ? descriptionElement.textContent.toLowerCase() : "";
        const urgencyText = urgencyElement ? urgencyElement.textContent.toLowerCase() : "";

        const containsSearchTerm =
            doctor.includes(searchInput) ||
            name.includes(searchInput) ||
            purpose.includes(searchInput) ||
            description.includes(searchInput);

        const isStatusElementChecked = statusElement ? statusElement.checked : false;
        const isStatus = (!statusSelect || statusSelect === "Select the status") || 
        (statusSelect === "1" && !isStatusElementChecked) ||
        (statusSelect === "2" && isStatusElementChecked);

        const isUrgent =
            (!urgencySelect || urgencySelect === "Select the urgency") ||
            (urgencySelect === "3" && urgencyText.includes("urgent")) ||
            (urgencySelect === "4" && urgencyText.includes("priority")) ||
            (urgencySelect === "5" && urgencyText.includes("regular"));

        if (containsSearchTerm && isStatus && isUrgent) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
            counter++;
        }
    });
    if (cards.length === 0) return;
    if (counter == cards.length) {
        text.innerText = 'No records found';
        text.classList.remove('d-none');
    } else {
        counter = 0;
        text.classList.add('d-none');
        text.innerText = 'No items have been added';
    }
}

export default filterCards;