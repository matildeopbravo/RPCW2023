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
        <p><b> Cronologia: </b> {arqelem.CRONO.text if arqelem.CRONO else ""} </p>
        <p><b> Lugar: </b> {arqelem.LUGAR.text}  </p>
        <p><b> Fregue: </b> {arqelem.FREGUE.text} </p>
        <p><b> Concel: </b> {arqelem.CONCEL.text}  </p>
        <p><b> CODADM: </b> {arqelem.CODADM.text if arqelem.CODADM else "" }</p>
        <p><b> Latitude: </b> {arqelem.LATITU.text if arqelem.LATITU else ""}  </p>
        <p><b> Longitude: </b> {arqelem.LONGIT.text if arqelem.LONGIT else ""} </p>
        <p><b> Acesso: </b> {arqelem.ACESSO.text if arqelem.ACESSO else ""} </p>
        <p><b> Quadro: </b> {arqelem.QUADRO.text if arqelem.QUADRO else ""} </p>
        <p><b> Desarq: </b> {arqelem.DESARQ.text if arqelem.DESARQ else ""} </p>
        <p><b> Interp: </b> {arqelem.INTERP.text if arqelem.INTERP else ""} </p>
        <p><b> Deposi: </b> {arqelem.DEPOSI.text if arqelem.DEPOSI else ""} </p>
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
    content += f"""
        <a href="/xml/{i}"> XML </a>
    """
    with open(f"htmls/arq{i}.html", "w") as file:
        file.write(begin + content + end)


def create_dir(dir_name):
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)


XML_DIR = "xmls"
HTML_DIR = "htmls"

create_dir(XML_DIR)
create_dir(HTML_DIR)

with open("arq_dataset.xml", "r", encoding="utf-8") as file:
    soup = bs(file, features="xml")
    arqsitios = soup.find_all("ARQELEM")
    i = 1
    for sitio in arqsitios:
        with open(f"xmls/arq{i}.xml", "w", encoding="utf-8") as arq_file:
            # criação ficheiro xml
            arq_file.write(str(sitio))
            # append ao ficheiro de índice
            pag_index += f"""
            <li>
                <a href="/html/{i}"> Arqueossitio {i} </a>
            </li>
            """
            # criação ficheiro html
            create_html_elem(sitio, i)
            # escrever sem a tag ARQELEM
            # arq_file.write("".join([str(s) for s in sitio.contents]).strip())
        i += 1
pag_index += """</ul>
        </body>
    </html>
"""
with open("index.html", "w", encoding="utf-8") as file:
    file.write(pag_index)
