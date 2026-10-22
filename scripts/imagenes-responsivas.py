# Genera versiones más chicas de las imágenes WebP de public/img (foto-480.webp, foto-800.webp, ...)
# y escribe src/data/variantes.js, que usa srcSet() (src/imagenes.js) para que el celular
# descargue la versión de su tamaño.
#
# Uso (requiere Python 3 con Pillow):  python scripts/imagenes-responsivas.py
# Correrlo de nuevo cada vez que se agregue o reemplace una imagen en public/img.
import os, re, glob, json
from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(RAIZ, 'public', 'img')
SALIDA = os.path.join(RAIZ, 'src', 'data', 'variantes.js')
VARIANTE = re.compile(r'-\d+\.webp$')

def anchos(nombre, ancho):
    if os.path.basename(nombre).startswith('equipo-'):
        return [120]                       # se muestran a 44 px
    if os.path.basename(nombre).startswith('logo-'):
        return []
    # solo si ahorra al menos 15 % respecto al original
    return [w for w in (480, 640, 800, 1200) if w <= ancho * 0.85]

variantes = {}
for ruta in sorted(glob.glob(os.path.join(IMG, '**', '*.webp'), recursive=True)):
    if VARIANTE.search(ruta):
        continue
    im = Image.open(ruta)
    lista = anchos(ruta, im.width)
    if not lista:
        continue
    url = '/img/' + os.path.relpath(ruta, IMG).replace('\\', '/')
    base = ruta[:-5]
    entrada = []
    for w in lista:
        destino = f'{base}-{w}.webp'
        if not os.path.exists(destino) or os.path.getmtime(destino) < os.path.getmtime(ruta):
            im.convert('RGB').resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(destino, 'WEBP', quality=78, method=6)
        entrada.append([w, url[:-5] + f'-{w}.webp'])
    entrada.append([im.width, url])
    variantes[url] = entrada
    print(f'{url}: ' + ', '.join(f'{w}w {os.path.getsize(base + f"-{w}.webp") // 1024} KB' for w in lista) + f', original {im.width}w {os.path.getsize(ruta) // 1024} KB')

with open(SALIDA, 'w', encoding='utf-8', newline='\n') as f:
    f.write('// Generado por scripts/imagenes-responsivas.py — no editar a mano.\n')
    f.write('// imagen original → [[ancho, ruta], ...] de menor a mayor (el último es el original)\n')
    f.write('export const VARIANTES = {\n')
    for url, entrada in variantes.items():
        f.write(f'  {json.dumps(url)}: {json.dumps(entrada)},\n')
    f.write('};\n')
print(f'\n{len(variantes)} imágenes con versiones para celular -> src/data/variantes.js')
