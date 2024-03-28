var request = new XMLHttpRequest()
request.open("GET","https://raw.githubusercontent.com/tabatkins/wordle-list/main/words",false);
request.send()
var words = request.responseText.split("\n")
const word = words[Math.floor(Math.random()*words.length)]

var inputWord = ""
var attempt = 1
var letter = 0

document.addEventListener("keydown",function(e){
    if(e.key == "Enter"){
        if(words.includes(inputWord) && letter == 5){
            for(let i=0;i<5;i++){
                if(inputWord[i] == word[i]){
                    document.getElementById(`row-${attempt}`).children[i].style.backgroundColor = "green"
                } else if(word.includes(inputWord[i])){
                    document.getElementById(`row-${attempt}`).children[i].style.backgroundColor = "yellow"
                } else {
                    document.getElementById(`row-${attempt}`).children[i].style.backgroundColor = "lightgray"
                }
            }
            attempt += 1
            letter = 0
            inputWord = ""
        }
    } else if(e.key == "Backspace"){
        if(letter > 0){
            letter -= 1
        }
        document.getElementById(`row-${attempt}`).children[letter].innerHTML = ""
        inputWord = inputWord.substring(0,inputWord.length-1)
    } else if (letter < 5) {
        inputWord += e.key
        document.getElementById(`row-${attempt}`).children[letter].innerHTML = e.key
        letter += 1
    }
})