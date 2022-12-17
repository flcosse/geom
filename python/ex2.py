import os
lieux = {
    "Musée":[25,"Visite",25],
    "Centre commercial":[5,"Shopping",15],
    "Stade":[100,"Football",50],
    "Parc":[50,"Promenade",5]
}

print("Activités proposées :\n")

stype = input("Activité 1 : ").title()
stype2 = input("Activité 2 : ").title()
budget = float(input("Budget : "))
sorties = [] 

for key, values in lieux.items():
    if budget >= values[2] and stype ==  values[1] or budget >= values[2] and stype2 ==  values[1]:
        sorties.append([key, values[0], values[1], values[2]])
    elif budget*1.1 >= values[2] and stype ==  values[1] or budget*1.1 >= values[2] and stype2 ==  values[1]:
        choix = "oui"
        if choix == input("C'est un peu cher bg, ça passe ? "):
            sorties.append([key, values[0], values[1], values[2]])
        else:
            print("Compris.\n")

for i in sorties:
    note = []
    if i[-1] <= 25:
        note.append(15)
    else:
        note.append(12)
    if i[1] <= 50:
        note.append(12)
    else:
        note.append(10)
    i.append((note[0]*3 + note[1]*2) / (3+2))

for i in sorties:
    if i[0] in list(lieux.keys()):
        lieux[i[0]] += [i[4]]

aucun = []
for items, values in lieux.items():
    try:
        aucun.append(values[3])
    except:
        pass

os.system("cls")
tiret = "-"*30
print(f"\nRésultat : \n{tiret}")

if len(aucun) == 0:
    print("0 résultat")
    
for i,j in zip(list(lieux.values()),list(lieux.keys())):
    if len(i) == 4:
        print(f"Score : {i[-1]}\nActivité : {i[1]}\nLieux : {j}\nPrix : {i[2]}€\nDistance : {i[0]}km")
        print(tiret)