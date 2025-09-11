# Como rodar
**Requisito: Ter o [node](https://nodejs.org/en/download) instalado**

1. cd Front
2. npm install
3. npm run build
4. npm run dev

# Como rodar (Docker)
**Requisito: Ter o docker instalado. Links: [Windows](https://docs.docker.com/desktop/setup/install/windows-install/) ou [Linux](https://docs.docker.com/engine/install/)**

1. cd Front
2. docker build -t proj:front .
3. docker run -p [PORT]:5173 proj:front
