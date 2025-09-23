# How to run
**Prerequisite: [Node](https://nodejs.org/en/download) installed**

1. cd Front
2. npm install
3. npm run build
4. npm run dev

# How to run (Docker)
**Prerequisite: Docker installed. Links: [Windows](https://docs.docker.com/desktop/setup/install/windows-install/) / [Linux](https://docs.docker.com/engine/install/)**

1. cd Front
2. docker build -t proj:front .
3. docker run -p [PORT]:5173 proj:front
