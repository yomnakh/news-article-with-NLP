// function checkForName(inputText) {
//     console.log("::: Running checkForName :::", inputText);
//     let names = [
//         "Picard",
//         "Janeway",
//         "Kirk",
//         "Archer",
//         "Georgiou"
//     ];

//     if(names.includes(inputText)) {
//         alert("Welcome, Captain!");
//     }
//     else {
//         alert("Enter a valid captain name");
//     }
// }

// export { checkForName };

export function validateUrl(url) {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)' + // Protocol (http or https)
        '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*\\.)+[a-zA-Z]{2,}|' + // Domain name
        '(\\d{1,3}\\.){3}\\d{1,3}))' + // OR IPv4
        '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // Port and Path
        '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // Query String
        '(\\#[-a-zA-Z\\d_]*)?$', 'i' // Fragment Identifier
    );
    return urlPattern.test(url);
}
