lieux = {
    "Musée du Louvre":[1000,"Visite",10],
    "Centre commercial":[500,"Shopping",75],
    "Stade":[2000,"Football",50],
    "Parc":[50,"Balade",5],
    "Bibliothèque":[200,"Lecture",15],
    "Bar":[750,"Soirée",25]
}

print("Activités proposées \n")
for i in lieux:
    print(f"{lieux[i][1]} - {lieux[i][2]}€")
    
stype = input("\nActivité 1 : ").title()
stype2 = input("Activité 2 : ").title()
budget = float(input("Budget : "))
sorties = []

for key, values in lieux.items():
    if (budget >= values[2] and stype ==  values[1]) or (budget >= values[2] and stype2 ==  values[1]):
        sorties.append([key, values[0], values[1], values[2]])
    elif (budget*1.1 >= values[2] and stype ==  values[1]) or (budget*1.1 >= values[2] and stype2 ==  values[1]):
        choix = input("C'est un peu cher, ça passe ? ").lower()
        if choix == "oui":
            sorties.append([key, values[0], values[1], values[2]])
        else:
            print("Compris.\n")

for i in sorties:
    note = []
    if i[-1] <= 25:
        note.append(5)
    else:
        note.append(3)
    if i[1] <= 500:
        note.append(5)
    else:
        note.append(3)
    i.insert(0,(note[0]*3 + note[1]*2) / (5))
    if str(i[0])[-1] == "0":
        i[0] = int(i[0])

tiret = "-"*23
sorties.sort(reverse=True)

if len(sorties) == 0:
    print("\n0 résultat")
else:
    print(f"\nRésultats \n{tiret}")

for i in sorties:
    print(f"Score : {i[0]}/5\nActivité : {i[3]}\nLieu : {i[1]}\nPrix : {i[4]}€\nDistance : {i[2]}m\n{tiret}")