var answerWords = new XMLHttpRequest()
answerWords.open("GET","https://raw.githubusercontent.com/RetroCoder13/wordle/main/7lettersjs/words.txt",false);
answerWords.send()
var words = answerWords.responseText.toLowerCase().split("\n")
const word = words[Math.floor(Math.random()*words.length)]
var letters = {}
for(let i=0;i<7;i++){
    let letter = word[i]
    if(letters[letter]){
        letters[letter] += 1
    } else {
        letters[letter] = 1
    }
}

let alphabet = document.getElementById('alphabet')
for(let i=0;i<26;i++){
    let div = document.createElement('div')
    div.innerHTML = String.fromCharCode(97+i)
    div.id = "letter-" + String.fromCharCode(97+i)
    alphabet.append(div)
}

var inputWord = ""
var attempt = 1
var letter = 0

document.addEventListener("keydown",function(e){
    if(e.key == "Enter"){
        let attemptLetters = JSON.parse(JSON.stringify(letters))
        if(words.includes(inputWord) && letter == 7){
            update(attempt,inputWord,word,attemptLetters,0)
            attempt += 1
            letter = 0
            inputWord = ""
            if(attempt > 8){
                document.writeln("The correct answer is: " + word)
            }
        }
    } else if(e.key == "Backspace"){
        if(letter > 0){
            letter -= 1
        }
        document.getElementById(`row-${attempt}`).children[letter].innerHTML = ""
        inputWord = inputWord.substring(0,inputWord.length-1)
    } else if (letter < 7 && e.key.charCodeAt(0) >= 97 && e.key.charCodeAt(0) <= 122) {
        inputWord += e.key
        document.getElementById(`row-${attempt}`).children[letter].innerHTML = e.key.toUpperCase()
        letter += 1
    }
})

function update(row,inputWord,word,attemptLetters,letter){
    document.getElementById(`row-${row}`).children[letter].style.animation = "flip .5s forwards"
    setTimeout(function(){
        if(inputWord[letter] == word[letter] && attemptLetters[inputWord[letter]] > 0){
            document.getElementById(`row-${row}`).children[letter].style.backgroundColor = "green"
            document.getElementById(`letter-${inputWord[letter]}`).style.backgroundColor = "green"
            attemptLetters[inputWord[letter]] -= 1
        } else if(word.includes(inputWord[letter]) && attemptLetters[inputWord[letter]] > 0){
            document.getElementById(`row-${row}`).children[letter].style.backgroundColor = "yellow"
            document.getElementById(`letter-${inputWord[letter]}`).style.backgroundColor = "yellow"
            attemptLetters[inputWord[letter]] -= 1
        } else {
            document.getElementById(`row-${row}`).children[letter].style.backgroundColor = "lightgray"
            document.getElementById(`letter-${inputWord[letter]}`).style.backgroundColor = "lightgray"
        }
        if(letter <= 7){
            update(row,inputWord,word,attemptLetters,letter+1)
        }
    },250)
}