import requests
import random

wordFound = False

words = requests.get("https://raw.githubusercontent.com/tabatkins/wordle-list/main/words").text.split("\n")
word = random.choice(words)

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