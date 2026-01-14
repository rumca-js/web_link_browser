let worker = null;
let db = null;
let object_list_data = null;   // all objects lists
let system_initialized = false;

let view_display_type = "search-engine";
let view_display_style = "style-light";
let view_show_icons = false;
let view_small_icons = false;
let user_age = 1;
let debug_mode = false;

let entries_direct_links = true;
let highlight_bookmarks = false;
let sort_function = "-page_rating_votes"; // page_rating_votes, date_published
let default_page_size = 200;

let entries_visit_alpha=1.0;
let entries_dead_alpha=0.5;


function getDefaultFileName() {
    return "top.zip";
}


function getFileList() {
    return ["top.zip",
	    "bookmarks.zip",
	    "music.zip",
	    "2024/01.zip",
	    "2024/02.zip",
	    "2024/03.zip",
	    "2024/04.zip",
	    "2024/05.zip",
	    "2024/06.zip",
	    "2024/07.zip",
	    "2024/08.zip",
	    "2024/09.zip",
	    "2024/10.zip",
	    "2024/11.zip",
	    "2024/12.zip",
	    "internet.db.zip",
    ];
}


function getDefaultFileLocation() {
    return "/data/";
}


function getFileVersion() {
    /* Forces refresh of the file */
    return "64";
}


function getSystemVersion() {
    return "0.9";
}


function getInitialSearchSuggestsions() {
    return [];
}


function notify(text) {
    console.log(text);
}

function debug(text) {
    if (debug_mode) {
      console.log(text);
    }
}


function getViewStyles() {
    return [
        "standard",
        "gallery",
        "search-engine",
        "content-centric",
        "links-only",
    ];
}


function getOrderPossibilities() {
    return [
        ['page_rating_votes', "Votes ASC"],
        ['-page_rating_votes', "Votes DESC"],
        ['page_rating_views', "Views ASC"],
        ['-page_rating_views', "Views DESC"],
        ['date_published', "Date published ASC"],
        ['-date_published', "Date published DESC"],
        ['followers_count', "Followers ASC"],
        ['-followers_count', "Followers DESC"],
        ['stars', "Stars ASC"],
        ['-stars', "Stars DESC"],
    ];
}


