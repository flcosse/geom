import random
import time

capitals = {'Alabama': 'Montgomery', 'Alaska': 'Juneau', 'Arizona': 'Phoenix',
'Arkansas': 'Little Rock', 'California': 'Sacramento', 'Colorado': 'Denver',
'Connecticut': 'Hartford', 'Delaware': 'Dover', 'Florida': 'Tallahassee',
'Georgia': 'Atlanta', 'Hawaii': 'Honolulu', 'Idaho': 'Boise', 'Illinois':
'Springfield', 'Indiana': 'Indianapolis', 'Iowa': 'Des Moines', 'Kansas':
'Topeka', 'Kentucky': 'Frankfort', 'Louisiana': 'Baton Rouge', 'Maine':
'Augusta', 'Maryland': 'Annapolis', 'Massachusetts': 'Boston', 'Michigan':
'Lansing', 'Minnesota': 'Saint Paul', 'Mississippi': 'Jackson', 'Missouri':
'Jefferson City', 'Montana': 'Helena', 'Nebraska': 'Lincoln', 'Nevada':
'Carson City', 'New Hampshire': 'Concord', 'New Jersey': 'Trenton', 'New Mexico': 'Santa Fe', 'New York': 'Albany',
'North Carolina': 'Raleigh', 'North Dakota': 'Bismarck', 'Ohio': 'Columbus', 'Oklahoma': 'Oklahoma City',
'Oregon': 'Salem', 'Pennsylvania': 'Harrisburg', 'Rhode Island': 'Providence',
'South Carolina': 'Columbia', 'South Dakota': 'Pierre', 'Tennessee':
'Nashville', 'Texas': 'Austin', 'Utah': 'Salt Lake City', 'Vermont':
'Montpelier', 'Virginia': 'Richmond', 'Washington': 'Olympia', 'West Virginia': 'Charleston', 'Wisconsin': 'Madison', 
'Wyoming': 'Cheyenne'}

file = random.randint(0, 34)

for i in range(35):
    dico = list(capitals.keys())
    random.shuffle(dico)
    f =  open(f"C:/Users/Florian/Desktop/doc/test_{i}.txt","w")
    for i in dico:
        f.write(i)
        f.write('\n')
        f.flush()
        
controle = open(f"C:/Users/Florian/Desktop/doc/test_{file}.txt")
point = 0
essai = 50

for i in controle:
    print(f"{point}/50 - {essai} restants")
    i = i[:-1]
    print(f"Quelle est la capitale de {i} ? \n")
    rep = [random.choice(list(capitals.values())) for i in range(3)]

    while capitals[i] in rep or len(rep) != len(set(rep)):
        print("ALERTE ROUGE "*10)
        rep = [random.choice(list(capitals.values())) for i in range(3)]

    rep.append(capitals[i])
    lettre = ["A","B","C","D"]
    random.shuffle(rep)

    for k,j in zip(lettre,rep):
        print(f"{k} : {j}")

    test = dict(zip(lettre,rep))

    guess = "B"

    try: 
        if capitals[i] == test[guess]:
            print("Bonne réponse\n")
            point = point + 1
            essai = essai - 1
        else:
            print(f"Non, la capitale est {capitals[i]}\n")
            essai = essai - 1
    except:
        print("Rien compris bolosse (met une lettre)\n")
        essai = essai - 1

    time.sleep(.05)

print(f"Résultat : {point}/50")