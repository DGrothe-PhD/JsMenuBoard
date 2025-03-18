import json

# going to paste next week's email raw text here.
rawTextInfo="""
KW 	Lieferdatum 	Menge 	Bezeichnung 	Menü Nummer 	Lieferart 	Preis 	Summe
12 	Mo., 17.03.2025 	2 	
Maultaschen (vegetarisch)
	M5 	Mehrweg 	9,50 € 	19,00 €
12 	Di., 18.03.2025 	1 	
Klassischer Sauerbraten
	M4 	Mehrweg 	11,80 € 	11,80 €
12 	Di., 18.03.2025 	1 	
Schweinegulasch
	M2 	Mehrweg 	10,50 € 	10,50 €
12 	Mi., 19.03.2025 	2 	
Bratwurst
	M2 	Mehrweg 	10,50 € 	21,00 €
12 	Do., 20.03.2025 	1 	
Germknödel
	M8 	Mehrweg 	9,40 € 	9,40 €
12 	Do., 20.03.2025 	1 	
Deftiger Erbseneintopf
	M6 	Mehrweg 	9,40 € 	9,40 €
12 	Fr., 21.03.2025 	2 	
Gekochte Eier
	M2 	Mehrweg 	10,50 € 	21,00 €
"""

# Convert raw text to json
WhatTheyOrdered = {}

def add_menu(i, date, number, description, amount):
    WhatTheyOrdered[str(i)] = {\
        "date" : date,\
        "number" : number,\
        "description" :  description,\
        "amount" : amount\
    }

i = 0
number = ""
amount = 0
description = ""
for line in rawTextInfo.split("\n"):
    if line.strip() == "":
        continue
    if line.startswith("KW"):
        continue
    if line[0].isdigit():
        date = line[4:6]
        amount = line[-3:].strip()
        continue
    if line[0] == '\t':
        number = line[1:4].rstrip()
        # so here we go.
        i += 1
        add_menu(i, date, number, description, amount)
    description = line.rstrip()
    #add_menu(i, date, number, description, amount)
    

json_string = json.dumps(WhatTheyOrdered)

with open("./menuOrdered.json", "w") as outputFile:
    outputFile.writelines(json_string)