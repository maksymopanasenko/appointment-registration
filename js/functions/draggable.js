function draggAndDropp(selector) {
    $(selector).sortable({
        containment: "document",
        helper: "clone",
        cursor: "grab",
        tolerance: 'pointer',
        placeholder: "placeholder",
        start: (event, ui) => {
            ui.placeholder.height(ui.item.height()-20);
        } 
    });
}

export default draggAndDropp;