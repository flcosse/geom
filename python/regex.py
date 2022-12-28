from datetime import datetime
startTime = datetime.now()
oui = [i for i in range(10000000)]
def distance(l):
    total = 0
    dist = [0]*len(i)
    for i in range(len(l)):
        try:
            total = total + l[i] + l[i+1]
            dist[i] = total 
        except:
            pass
    return dist

print(datetime.now() - startTime)