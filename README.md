# geo-contacts-fe

Geo-contacts is a single-page web application (SPA) that allows users to see a list of contacts and visualize their locations on a map.

## Technologies Used

- Vue 3
- Typescript
- Pinia
- Vite
- Bootstrap 5
- Popper.js
- Vue-Axios
- Leaflet

## Project Setup

### Prerequisites

- Node.js
- Yarn
- Docker (optional)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd geo-contacts
```

```bash
# Install dependencies
yarn install
```

### Compile and Hot-Reload for Development

```bash
yarn dev
```

Alternatively, you can use Docker to start the development server:
```bash
docker-compose up vueapp-dev --build
```

### Build for Production

```bash
docker-compose up vueapp-prod nginx-prod --build
```

### Access

- Development: [localhost:3000](http://localhost:3000)
- Production: [localhost:80](http://localhost:80)

### Run Unit Tests with [Vitest](https://vitest.dev/)

```bash
yarn test:unit
```

### Lint with [ESLint](https://eslint.org/)

```bash
yarn lint
```
