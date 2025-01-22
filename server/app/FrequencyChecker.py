from collections import defaultdict
from collections import deque

class FrequencyChecker:
    def __init__(self):
        self.wb = set()
        self.sb = set()
        self.exceptions = set()
        self.populateExceptions("a, the, of")
        self.populateWB(", [ ] ( ) { } |")
        self.populateSB(". ? !")
        self.map = []
        self.index = 1
        
    def populateWB(self, wordbreaks: str):
        for c in wordbreaks:
            if c != " ":
                self.wb.add(c)
                
    def populateSB(self, sentencebreaks: str):
        for c in sentencebreaks:
            if c != " ":
                self.sb.add(c)
    
    def populateExceptions(self, exceptions: str):
        temp = ""
        for c in exceptions:
            if c == " " or c == ",":
                if temp:
                    self.exceptions.add(temp.upper())
                    temp = ""
            else:
                temp += c
        if temp:
            self.exceptions.add(temp.upper())

    def parse(self, paragraph: str):
        res = []
        self.map = [0]*(len(paragraph)+1)
        temp = ""
        for i in range(len(paragraph)):
            if paragraph[i] == ' ' or paragraph[i] in self.wb:
                if temp:
                    res.append([temp, i - len(temp), i - 1])
                    temp = ""
            elif paragraph[i] in self.sb:
                res.append(".")
            else:
                temp += paragraph[i].upper()
                
        if temp:
            res.append([temp, len(paragraph) - len(temp), len(paragraph) - 1])
        return res
        
    def getDuplicates(self, parsedList: list[list[str]], numS: int):
        count = 0
        front, back = 0,0
        window = defaultdict(deque)
        
        front = self.addToWindow(front, parsedList, numS, window)
        while front < len(parsedList):
            while parsedList[back] != '.':
                window[parsedList[back][0]].popleft()
                back += 1
            back += 1
            front = self.addToWindow(front, parsedList, 1, window)
        return self.map
    
    def getRanges(self, l: deque[list[int]]):
        if len(l) == 1:
            return []
        elif len(l) == 2:
            return l
        else:
            return [l[-1]]
    
    def addToWindow(self, front: int, parsedList: list[list[str]], numS: int, window: dict):
        count = 0
        while front < len(parsedList) and count < numS:
            val = parsedList[front]
            if val == '.':
                count += 1
            else:
                window[val[0]].append((val[1], val[2]))
                if not val[0] in self.exceptions:
                    for r in self.getRanges(window[val[0]]):
                        self.map[r[0]] += self.index
                        self.map[r[1]+1] -= self.index
                        self.index += 1
            front += 1
        return front
