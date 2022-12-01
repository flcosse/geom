tva20 = "20%"
tva05 = "5%"
prix = float(input("Combien tu payes ? "))

while prix <= 0:
    print("Pas compris")
    prix = float(input("Combien tu payes ? "))

tva = input("Combien la TVA ? (20%/5%) ")

while tva not in(tva20,tva05):
    print("non ressaie")
    tva = input("Combien la TVA ? (20%/5%) ")

if tva == "20%":
    tva = 1.2
elif tva == "5%":
    tva = 1.05

total = 0
nb = int(input("Tu veux acheter combien de fois ? "))

if nb < 1 :
    print("Connais pas fdp")
    nb = int(input("Tu veux acheter combien de fois ? "))

for i in range(1,nb+1):
    if i >= 11:
        total = total + prix*tva + 1
        print(total, i)
    else:
        total = total + prix*tva
        print(total, i)

print(f"Paye {round(total,2)}€ tout de suite")