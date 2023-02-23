from os import write
import os
import lxml
from bs4 import BeautifulSoup as bs

dir_name = "arqs"

if not os.path.exists(dir_name):
    os.makedirs(dir_name)

with open("arq.xml", "r", encoding="utf-8") as file:
    soup = bs(file, features="xml")
    arqsitios = soup.find_all("ARQELEM")
    i = 1
    for sitio in arqsitios:
        with open(f"arqs/arq{i}.xml", "w", encoding="utf-8") as arq_file:
            arq_file.write(str(sitio))
            # escrever sem a tag ARQELEM
            # arq_file.write("".join([str(s) for s in sitio.contents]).strip())
        i += 1
