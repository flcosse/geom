# Vous allez créer une fonction permettant de calculer le produit d'une liste de nombres

# Ecrivez la fonction et testez avec le bouton > "Run" que le calcul est correct !
def produit_entiers(liste_entiers):
        somme = 1
        for i in liste_entiers:
            somme = somme * i
        return somme

# Ne touchez pas le code de vérification ci-dessous :)
assert 1 == produit_entiers([1, 1, 1])
assert 6 == produit_entiers([1, 2, 3])
assert 0 == produit_entiers([1, 2, 3, 90, 0])
