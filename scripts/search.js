
function isEntrySearchHit(entry, searchText) {
    if (entry.link) {
        return isEntrySearchHitEntry(entry, searchText);
    }
}


function isEntrySearchHitEntry(entry, searchText) {
    if (!entry)
        return false;

    if (searchText.includes("=")) {
        return isEntrySearchHitAdvanced(entry, searchText);
    }
    else {
        return isEntrySearchHitGeneric(entry, searchText);
    }
}


function isEntrySearchHitGeneric(entry, searchText) {
    if (entry.link && entry.link.toLowerCase().includes(searchText.toLowerCase()))
        return true;

    if (entry.title && entry.title.toLowerCase().includes(searchText.toLowerCase()))
        return true;

    if (entry.description && entry.description.toLowerCase().includes(searchText.toLowerCase()))
        return true;

    if (entry.tags && Array.isArray(entry.tags)) {
        const tagMatch = entry.tags.some(tag =>
            tag.toLowerCase().includes(searchText.toLowerCase())
        );
        if (tagMatch) return true;
    }

    return false;
}


function isEntrySearchHitAdvanced(entry, searchText) {
    let operator_0 = null;
    let operator_1 = null;
    let operator_2 = null;

    if (searchText.includes("==")) {
        const result = searchText.split("==");
        operator_0 = result[0].trim();
        operator_1 = "==";
        operator_2 = result[1].trim();
    }
    else {
        const result = searchText.split("=");
        operator_0 = result[0].trim();
        operator_1 = "=";
        operator_2 = result[1].trim();
    }

    let ignore_case = true;
    let thing_to_check = "";

    if (operator_0 == "tag")
    {
        if (entry.tags && Array.isArray(entry.tags)) {
            if (operator_1 == "=") {
                const tagMatch = entry.tags.some(tag =>
                    tag.toLowerCase().includes(operator_2.toLowerCase())
                );
                if (tagMatch) return true;
            }
            if (operator_1 == "==") {
                const tagMatch = entry.tags.some(tag =>
                    tag.toLowerCase() == operator_2.toLowerCase()
                );
                if (tagMatch) return true;
            }
        }
    }

    if (operator_0 == "title")
    {
        thing_to_check = entry.title;
    }
    if (operator_0 == "link")
    {
        thing_to_check = entry.link;
    }
    if (operator_0 == "description")
    {
        thing_to_check = entry.description;
    }
    if (operator_0 == "language")
    {
        thing_to_check = entry.language;
    }

    if (operator_1 == "=" && thing_to_check && thing_to_check.toLowerCase().includes(operator_2.toLowerCase()))
        return true;
    if (operator_1 == "==" && thing_to_check && thing_to_check.toLowerCase() == operator_2.toLowerCase())
        return true;

    return false;
} 


function sortEntries(entries) {
    console.log(`Sorting using ${sort_function}`);
    const sortFields = [
        'link',
        'title',
        'page_rating_votes',
        'followers_count',
        'stars',
        'view_count',
        'upvote_ratio',
        'upvote_diff',
        'upvote_view_ratio',
    ];

    const isDescending = sort_function.startsWith('-');
    const field = isDescending ? sort_function.slice(1) : sort_function;

    if (sort_function == "-date_published") {
        entries = entries.sort((a, b) => {
            if (a.date_published === null && b.date_published === null) {
                return 0;
            }
            if (a.date_published === null) {
                return 1;
            }
            if (b.date_published === null) {
                return -1;
            }
            return new Date(b.date_published) - new Date(a.date_published);
        });
    }
    else if (sort_function == "date_published") {
        entries = entries.sort((a, b) => {
            if (a.date_published === null && b.date_published === null) {
                return 0;
            }
            if (a.date_published === null) {
                return -1;
            }
            if (b.date_published === null) {
                return 1;
            }
            return new Date(a.date_published) - new Date(b.date_published);
        });
    }
    else if (sortFields.includes(field)) {
        entries.sort((a, b) => {
            const aVal = a[field] ?? 0;
            const bVal = b[field] ?? 0;

            return isDescending
                ? bVal - aVal
                : aVal - bVal;
        });
    }

    return entries;
}
