

# 1) Clona el repo
git clone https://github.com/GerardoCL31/ConsultarCryptos
cd ConsultarCryptos

# 2) Instala dependencias
npm install

# 3) (opcional) hacer ejecutable en Unix:
chmod +x index.js

# 4) Crea el comando `crytowatch` en tu máquina:
npm link        # (lo desinstalas con npm unlink -g crytowatch)
# o ejecuta sin link: node index.js precio bitcoin usd

# 5) Prueba:
crytowatch precio bitcoin usd
crytowatch precio eth           # usa EUR por defecto
