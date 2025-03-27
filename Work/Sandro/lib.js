// Expose functions to the global scope
window.print = print;
window.printH = printH;
window.printLn = printLn;
window.printHr = printHr;
window.printBr = printBr;

function printTest(conntent) {
    console.log(conntent);
}

function print(content, color, background,) {
    if (content === undefined) {
        content = '';
    }
    // Create a new span element
    const span = document.createElement('span');
    // Ensure content is a string
    content = String(content);
    // Set the text content of the span to the content
    if (content.includes(' ')) {
        content = content.replaceAll(/ /g, '\u00A0');
    }
    span.textContent = content;
    // Set the style of the span to have text color
    span.style.color = color;
    // Set the style of the span to have Background color
    span.style.backgroundColor = background;
    // Append the span to the body of the document
    document.body.appendChild(span);
}

function printH(level, content) {
    if (level < 1 || level > 6) {
        console.error('Invalid headline level. Please use a number between 1 and 6.');
        return;
    }
    // Create a new headline element
    const headline = document.createElement(`h${level}`);
    // Set the text content of the headline to the content
    headline.textContent = content;
    // Append the headline to the body of the document
    document.body.appendChild(headline);
}

function printLn(content, color, background) {
    if (content === undefined) {
        content = '';
    }
    // Create a new span element
    const span = document.createElement('span');
    // Ensure content is a string
    content = String(content);
    // Set the text content of the span to the content
    if (content.includes(' ')) {
        content = content.replaceAll(/ /g, '\u00A0');
    }
    span.textContent = content;
    // Set the style of the span to have text color
    span.style.color = color;
    // Set the style of the span to have Background color
    span.style.backgroundColor = background;
    // Append the span to the body of the document
    document.body.appendChild(span);
    // Create a new line break element
    const br = document.createElement('br');
    // Append the line break to the body of the document
    document.body.appendChild(br);
}

function printHr() {
    // Create a new horizontal rule element
    const hr = document.createElement('hr');
    // Append the horizontal rule to the body of the document
    document.body.appendChild(hr);
}

function printBr(amount) {
    if (amount === undefined || amount === 0) {
        amount = 1;
    }
    // Ensure amount is a number
    // parse to a int 
    // check if is not a number
    if (isNaN(amount)) {
        // amount = 0;
        alert('Please enter a number at printBr()');
    }
    // Range 
    if (amount < 0) {
        amount *= -1;
    } else if (amount > 100) {
        amount = 100;
    }

    //for loop to create multiple line breaks   
    for (let i = 0; i < amount; i++) {
        // Create a new line break element
        const br = document.createElement('br');
        // Append the line break to the body of the document
        document.body.appendChild(br);
    }
}