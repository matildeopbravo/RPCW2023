from os import write
import os
import lxml
from bs4 import BeautifulSoup as bs

pag_index = """
<!DOCTYPE html>
<html>
    <head>
        <title> Index de Arqueossitios </title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Index de Arqueossitios </h1>
        <table>
               <ul>
"""


def create_html_elem(arqelem, i):
    begin = f"""<!DOCTYPE html>
        <html>
            <head>
                <title> Arqueossitio {i}</title>
                <meta charset="utf-8"/>
            </head>
                <body>"""

    end = """</body>
        </html>"""

    content = f"""
        <h1> Arqueossitio {i} </h1>
        <p><b> Identidade: </b> {arqelem.IDENTI.text} </p>
        <p><b> Descrição: </b> {arqelem.DESCRI.text} </p>
        <p><b> Crono: </b> {arqelem.CRONO.text if arqelem.CRONO else ""} </p>
        <p><b> Lugar: </b> {arqelem.LUGAR.text}  </p>
        <p><b> Fregue: </b> {arqelem.FREGUE.text} </p>
        <p><b> Concel: </b> {arqelem.CONCEL.text}  </p>
        <p><b> CODADM: </b> TODO </p>
        <p><b> Latitude: </b> TODO </p>
        <p><b> Longitude: </b> TODO </p>
        <p><b> Acesso: </b> TODO </p>
        <p><b> Quadro: </b> TODO </p>
        <p><b> Desarq: </b> TODO </p>
        <p><b> Interp: </b> TODO </p>
        <p><b> Deposi: </b> TODO </p>
        <p><b> Biblio: </b></p>
        <ul>
        """
    for entry in arqelem.find_all("BIBLIO"):
        content += f"""
                <li> {entry.text} </li>
        """
    content += f"""
        </ul>
        <p><b> Autor: </b> {arqelem.AUTOR.text} </p>
        <p><b> Data: </b> {arqelem.DATA.text} </p>
    """
    with open(f"htmls/arq{i}.html", "w") as file:
        file.write(begin + content + end)


def create_dir(dir_name):
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)


xml_dir = "xmls"
html_dir = "htmls"

create_dir(xml_dir)
create_dir(html_dir)

with open("arq_dataset.xml", "r", encoding="utf-8") as file:
    soup = bs(file, features="xml")
    arqsitios = soup.find_all("ARQELEM")
    i = 1
    for sitio in arqsitios:
        with open(f"xmls/arq{i}.xml", "w", encoding="utf-8") as arq_file:
            arq_file.write(str(sitio))
            pag_index += f"""
            <li>
                <a href="{i}"> Arqueossitio {i} </a>
            </li>
            """
            create_html_elem(sitio, i)
            ##print(sitio.IDENTI.text)
            # escrever sem a tag ARQELEM
            # arq_file.write("".join([str(s) for s in sitio.contents]).strip())
        i += 1
pag_index += f"""</ul>
        </body>
    </html>
"""
print(pag_index)
