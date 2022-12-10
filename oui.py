import os

lieux = {
    "Lyon":[1000,"football",50],
    "Saint-Etienne":[1200,"musée",15],
    "Givors":[1500,"restaurant",30],
    "Giers":[2000,"basket",20],
}

sortie1 = input("Quel genre de sortie ? ").lower()
sortie2 = input("Quel genre de sortie (2)? ").lower()
budget = float(input("Tu peux payer combien ? "))

classement = []

#value[0] = distance
#value[1] = sortie
#value[2] = prix
for key, values in lieux.items():
    if budget >= values[2] and sortie1 == values[1]:
        classement.append(list([key, values[0], values[2], values[1]]))
    elif budget >= values[2] and sortie2 == values[1]:
        classement.append(list([key, values[0], values[2], values[1]]))

#classement[0] = ville
#classement[1] = distance
#classement[2] = prix
#classement[3] = sortie
#classement[4] = note
for i in range(len(classement)):
    if classement[i][1] <= 1000:
        classement[i].append(1)
    else:
        classement[i].append(0.5)
    if classement[i][2] <= 20:
        classement[i][4] = classement[i][4] + 1
    else:
        classement[i][4] = classement[i][4] + 0.5
    if classement[i][3] == sortie1:
        classement[i][4] = classement[i][4] + 1
    elif classement[i][3] == sortie2:
        classement[i][4] = classement[i][4] + 0.5

os.system('CLS')
tiret = "-" * 30

#tri par score décroissant   
classement = sorted(classement, key=lambda x: x[4], reverse=True)

#mise en phrase de la liste
if len(classement) < 1:
    print("Pas de résultat (sale pauvre) (ou écris mieux)")
else:
    for i in classement:
        print(f"Score : {i[4]}\nProposition de lieu : {i[0]}\nDistance : {i[1]}m\nPrix de l'activité : {i[2]}€\nType d'activité : {i[3].title()}\n{tiret}")
