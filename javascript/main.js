var answerWords = new XMLHttpRequest()
answerWords.open("GET","https://gist.githubusercontent.com/slushman/34e60d6bc479ac8fc698df8c226e4264/raw/cf702f098856c72a81d79f69b11f0a8c333e7d2f/wordle-list",false);
answerWords.send()
var possibleWords = new XMLHttpRequest()
possibleWords.open("GET","https://raw.githubusercontent.com/tabatkins/wordle-list/main/words",false);
possibleWords.send()
var words = possibleWords.responseText.split("\n")
var answers = eval(answerWords.responseText)
const word = answers[Math.floor(Math.random()*answers.length)]
var letters = {}
for(let i=0;i<5;i++){
    let letter = word[i]
    if(letters[letter]){
        letters[letter] += 1
    } else {
        letters[letter] = 1
    }
}

var inputWord = ""
var attempt = 1
var letter = 0

document.addEventListener("keydown",function(e){
    if(e.key == "Enter"){
        let attemptLetters = JSON.parse(JSON.stringify(letters))
        if(words.includes(inputWord) && letter == 5){
            for(let i=0;i<5;i++){
                if(inputWord[i] == word[i] && attemptLetters[inputWord[i]] > 0){
                    document.getElementById(`row-${attempt}`).children[i].style.backgroundColor = "green"
                    attemptLetters[inputWord[i]] -= 1
                } else if(word.includes(inputWord[i]) && attemptLetters[inputWord[i]] > 0){
                    document.getElementById(`row-${attempt}`).children[i].style.backgroundColor = "yellow"
                    attemptLetters[inputWord[i]] -= 1
                } else {
                    document.getElementById(`row-${attempt}`).children[i].style.backgroundColor = "lightgray"
                }
            }
            attempt += 1
            letter = 0
            inputWord = ""
            if(attempt > 6){
                document.writeln("The correct answer is: " + word)
            }
        }
    } else if(e.key == "Backspace"){
        if(letter > 0){
            letter -= 1
        }
        document.getElementById(`row-${attempt}`).children[letter].innerHTML = ""
        inputWord = inputWord.substring(0,inputWord.length-1)
    } else if (letter < 5 && e.key.charCodeAt(0) >= 97 && e.key.charCodeAt(0) <= 122) {
        inputWord += e.key
        document.getElementById(`row-${attempt}`).children[letter].innerHTML = e.key
        letter += 1
    }
})