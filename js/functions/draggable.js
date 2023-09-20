function draggAndDropp(selector) {
    $(selector).sortable({
        containment: "document",
        helper: "clone",
        cursor: "grab",
        tolerance: 'pointer'
    });
}

export default draggAndDropp;