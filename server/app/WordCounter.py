class WordCounter:
    def __init__(self):
        self.breakers = {}
        self.wb = set()
        self.wb.add(" ")
        # self.populateBreakers("() \"\"")
        # self.populateWB(",")
        
    def populateBreakers(self, breakers: str):
        temp = ""
        for c in breakers:
            if c == " ":
                if len(temp) == 2:
                    self.breakers[temp[0]] = temp[1]
                temp = ""
            else:
                temp += c
        if len(temp) == 2:
            self.breakers[temp[0]] = temp[1]
                
    def populateWB(self, wordbreaks: str):
        for c in wordbreaks:
            if c != " ":
                self.wb.add(c)

    def count(self, paragraph: str):
        count = 0
        totalCount = 0
        stack = []
        temp = ""
        for c in paragraph:
            if stack and c == stack[-1]:
                stack.pop()
                if temp:
                    totalCount += 1
                    temp = ""
            elif c in self.breakers:
                stack.append(self.breakers[c])
                if temp:
                    totalCount += 1
                    count += 1
                    temp = ""

            elif c in self.wb:
                if temp:
                    if not stack:
                        count += 1
                    totalCount += 1
                    temp = ""
            else:
                temp += c
        if temp:
            if not stack:
                count += 1
            totalCount += 1
        return count, totalCount