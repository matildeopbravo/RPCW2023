import json


def ord_cidade(cidade):
    return cidade["nome"]


f = open("mapa.json")
data = json.load(f)
cidades = data["cidades"]
ligacoes = data["ligações"]
cidades.sort(key=ord_cidade)


pagWeb = """
<!DOCTYPE html>
<html>
    <head>
        <title> Mapa Virtual </title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <h3> Índice </h3>
                    <a name="indice" />
                    <!-- Lista com  indice -->
                    <ul>
"""

for c in cidades:
    pagWeb += f"""
        <li>
            <a href="#{c['id']}"> {c['nome']} </a>
        </li>
    """

pagWeb += """
                        </ul>
                    </td>
                    <td width="70%">
"""

for c in cidades:
    pagWeb += f"""
                        <a name="{c['id']}"/>
                            <h3>{c['nome']}</h3>
                            <p> <b> população: </b> {c['população']} </p>
                            <p> <b> descrição: </b> {c['descrição']} </p>
                            <p> <b> distrito:</b> {c['distrito']} </p>
                            """
    for l in ligacoes:
        if l["origem"] == c["id"]:
            id_destino = l["destino"]
            for city in cidades:
                if city["id"] == id_destino:
                    nome_destino = city["nome"]
                    pagWeb += f"""<p><a href="#{id_destino}">{nome_destino} </a>
                    - {l["distância"]} km</p>"""
    pagWeb += """
                            <address> [<a href="#indice"> Voltar ao indice </a>]
                            </address>
                            <center>
                                <hr width="80%"/>
                            </center>
"""


pagWeb += """
                    </td>
                </tr>
            </table>

        </body>
    </html>

    """
print(pagWeb)
