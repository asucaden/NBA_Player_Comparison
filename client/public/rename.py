import os

folder = "/home/caden/Documents/NBA_Comparision_Projects/NBA_Player_Comparision/client/public/"

for count, filename in enumerate(os.listdir(folder)):
    oldname = folder + filename
    newname = folder + filename.replace(" ", "-")
    os.rename(oldname, newname)
