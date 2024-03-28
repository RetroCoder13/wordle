import requests
import random

wordFound = False

words = requests.get("https://raw.githubusercontent.com/tabatkins/wordle-list/main/words").text.split("\n")
answers = eval(requests.get("https://gist.githubusercontent.com/slushman/34e60d6bc479ac8fc698df8c226e4264/raw/cf702f098856c72a81d79f69b11f0a8c333e7d2f/wordle-list").text)
word = random.choice(answers)

attempts = 0
while not wordFound and attempts < 6:
    inputWord = input("")
    if inputWord in words:
        letterPlaces = ""
        if inputWord == word:
            wordFound = True
        else:
            for index,character in enumerate(inputWord):
                if character == word[index]:
                    letterPlaces += "G"
                elif character in word:
                    letterPlaces += "Y"
                else:
                    letterPlaces += " "
            print(letterPlaces)
        attempts += 1
    else:
        print("Not in word list")
        continue
print("The word is: "+ word)