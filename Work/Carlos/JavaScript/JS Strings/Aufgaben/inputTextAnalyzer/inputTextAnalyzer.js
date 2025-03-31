


let collator = new Intl.Collator("de-AT", { collation: "phonebk" });

function textAnalyzer(){

    let targetCustomText = document.getElementById("inputText").value;
    console.log("Input text:", targetCustomText); // Debugging: Log the input text
    
    let cleanedText = cleanText(targetCustomText);
    console.log("Cleaned text:", cleanedText); // Debugging: Log the cleaned text
    

    textSplitter(cleanedText);

    wordCounter(cleanedText);

    shortestWord(cleanedText);

    longestWord(cleanedText);

    findMostFrequentWord(cleanedText);

    findFirstLexicographicalWord(cleanedText);

    findLastLexicographicalWord(cleanedText);


}

//----------------------------------


function cleanText(customText){

   let cleanedText = customText
   .replace(/\[.*?\]|ⓘ|/g, "")  
   .replace(/[—ˈ'–/();:.,?!"ⓘ-]+/g, " ")
   .replace(/\s+/g, " ")
   .replace(/\s+$/,"")

   return cleanedText;

}


function textSplitter(cleanedText){
    let startIndexWord = 0

    while (startIndexWord >= 0){
            let endIndexWord = cleanedText.indexOf(" ", startIndexWord) 
            let word = ""
           
            if (endIndexWord >= 0){
                word = cleanedText.substring(startIndexWord, endIndexWord)
                console.log("Word:", word); // Debugging: Log each word
                startIndexWord = endIndexWord + 1

            } else {
                word = cleanedText.substring(startIndexWord)  
                console.log("Word:", word); // Debugging: Log the last word 
                startIndexWord = -1

            }
    }
}


function wordCounter(cleanedText){

    let startIndexWord = 0
    let wordCounter = 0

    while (startIndexWord >= 0){
            let endIndexWord = cleanedText.indexOf(" ", startIndexWord) 
            let word = ""
            wordCounter++;
           
            if (endIndexWord >= 0){
                word = cleanedText.substring(startIndexWord, endIndexWord)
                //console.log("Word Counter:", wordCounter + " " + word); // Debugging: Log each word
                startIndexWord = endIndexWord + 1

            } else {
                word = cleanedText.substring(startIndexWord)  
                console.log("Total of words in the text: " + wordCounter); // Debugging: Log the last word 
                startIndexWord = -1

            }
    }

}

function shortestWord(cleanedText){

    let startIndexWord = 0
    let shortestWord = "";
    let shortestWordLength = Infinity;

    while (startIndexWord >= 0){
        let endIndexWord = cleanedText.indexOf(" ", startIndexWord) 
        let word = ""
       
        if (endIndexWord >= 0){
            word = cleanedText.substring(startIndexWord, endIndexWord)
            startIndexWord = endIndexWord + 1

        } else {
            word = cleanedText.substring(startIndexWord)  
            startIndexWord = -1

        }

        if (word.length < shortestWordLength){
            shortestWord = word
            shortestWordLength = word.length
            
        } else if (word.length === shortestWordLength && !shortestWord.includes(word)){
            shortestWord += ", " + word
            
        }

    }
        console.log("The shortest word in the text is " + "\"" + shortestWord + "\"");

}

function longestWord(cleanedText){

    let startIndexWord = 0
    let longestWord = "";
    let longestWordLength = "";

    while (startIndexWord >= 0){
        let endIndexWord = cleanedText.indexOf(" ", startIndexWord) 
        let word = ""
       
        if (endIndexWord >= 0){
            word = cleanedText.substring(startIndexWord, endIndexWord)
            startIndexWord = endIndexWord + 1

        } else {
            word = cleanedText.substring(startIndexWord)  
            startIndexWord = -1

        }  

        if (word.length > longestWordLength){
            longestWord = word
            longestWordLength = word.length
        } else if (word.length == longestWordLength && !longestWord.includes(word)){
            longestWord += ", " + word
        }

    }

        console.log("The longest word in the text is " + "\"" + longestWord + "\"");



}

function wordRepeats(wordToCount){


}

function findFirstLexicographicalWord(cleanedText){

    let startIndexWord = 0;
    let firstLexicographicalWord = null;

    while (startIndexWord >= 0) {
        let endIndexWord = cleanedText.indexOf(" ", startIndexWord);
        let word = "";

        if (endIndexWord >= 0) {
            word = cleanedText.substring(startIndexWord, endIndexWord);
            startIndexWord = endIndexWord + 1;
        } else {
            word = cleanedText.substring(startIndexWord);
            startIndexWord = -1;
        }

        if (/^[a-zA-ZäöüÄÖÜß]+$/.test(word) && word.length >= 2) {

            if (firstLexicographicalWord === null || collator.compare(word, firstLexicographicalWord) < 0) {
                firstLexicographicalWord = word;
            }


        }
        
    }

    console.log("First lexicographical word which is at least 2 letters long: \"" + firstLexicographicalWord + "\"");
    
}

function findLastLexicographicalWord(cleanedText) {
    let startIndexWord = 0;
    let lastLexicographicalWord = null;

    while (startIndexWord >= 0) {
        let endIndexWord = cleanedText.indexOf(" ", startIndexWord);
        let word = "";

        if (endIndexWord >= 0) {
            word = cleanedText.substring(startIndexWord, endIndexWord);
            startIndexWord = endIndexWord + 1;
        } else {
            word = cleanedText.substring(startIndexWord);
            startIndexWord = -1; // Exit the loop after processing the last word
        }

        // Regular Expression: Exclude words that contain numbers
        if (/^[a-zA-ZäöüÄÖÜß]+$/.test(word) && word.length >= 2) {
            // Initialize lastLexicographicalWord with the first valid word
            if (lastLexicographicalWord === null || collator.compare(word, lastLexicographicalWord) > 0) {
                lastLexicographicalWord = word;
            }
        }
    }

    console.log("Last lexicographical word which is at least 2 letters long: \"" + lastLexicographicalWord + "\"");
}


function findMostFrequentWord(cleanedText) {

    let startIndexWord = 0;
    let mostFrequentWord = null;
    let highestCount = 0;

    while (startIndexWord >= 0) {
        let endIndexWord = cleanedText.indexOf(" ", startIndexWord);
        let word = "";

        if (endIndexWord >= 0) {
            word = cleanedText.substring(startIndexWord, endIndexWord);
            startIndexWord = endIndexWord + 1;
        } else {
            word = cleanedText.substring(startIndexWord);
            startIndexWord = -1; // Exit the loop after processing the last word
        }

        // Clean and validate the word (exclude numbers and ensure it's at least 2 letters long)
        if (/^[a-zA-ZäöüÄÖÜß]+$/.test(word) && word.length > 2 && word.toLowerCase() !== "the") {
            word = word.toLowerCase(); // Convert to lowercase to count case-insensitively

            // Count occurrences of the current word
            let count = 0;
            let innerStartIndex = 0;

            while (innerStartIndex >= 0) {
                let innerEndIndex = cleanedText.indexOf(" ", innerStartIndex);
                let innerWord = "";

                if (innerEndIndex >= 0) {
                    innerWord = cleanedText.substring(innerStartIndex, innerEndIndex);
                    innerStartIndex = innerEndIndex + 1;
                } else {
                    innerWord = cleanedText.substring(innerStartIndex);
                    innerStartIndex = -1; // Exit the loop after processing the last word
                }

                // Clean and validate the inner word
                if (/^[a-zA-ZäöüÄÖÜß]+$/.test(innerWord) && innerWord.length >= 2) {
                    innerWord = innerWord.toLowerCase(); // Convert to lowercase

                    if (innerWord === word) {
                        count++; // Increment count if the words match
                    }
                }
            }

            // Update the most frequent word if the current word has a higher count
            if (count > highestCount) {
                mostFrequentWord = word;
                highestCount = count;
            }
        }
    }

        console.log("The most frequent word in the text is: " + "\"" + mostFrequentWord + "\"" + ". It appears " + highestCount + " times in the text.");

}