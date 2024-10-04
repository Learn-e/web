## Summary

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)

## About

Learn-e is a platform that allows online trainers to create their training courses and put them up for sale, a large number of tools provide rigorous tracking for each student.

## Features

- Create your own training course with a variety of formats to deliver your lessons
- Sequence your training to deliver information at the right time and avoid overloading your students with new concepts
- Private chat to facilitate communication with your students
- Community chat to promote mutual help
- Student tracking with numerous statistics to measure their progress in the training course

## Installation

### Prerequisites

- Docker Engine (https://docs.docker.com/engine/install/)
- Docker Compose (https://docs.docker.com/compose/install/)
- Make (https://www.geeksforgeeks.org/how-to-install-make-on-ubuntu/)

### Getting Started

Create .env file and add this line :

```bash
  NEXT_PUBLIC_API_URL="link_to_api"
```

Simply execute the following commands to launch the project :

```bash
  make build && make up
```

To verify that the project has been correctly initialized and started :

```bash
  make logs
```

## Tech Stack

- Next.js 14 (with app router)
- TypeScript
- TailwindCSS
- Shadcn/ui
- Zustand

## Contributing

- Slim OURLISSENE (@slimourlissene)
- Enzo MOYON (@moyonenzo)
- Julien PATERNA (@julienpaterna)
- Mohamed-Nour Achour (@mohamed75xx)
- Adam SALAMA (@adamslma)
- Noah LUSEVA (@noahluseva)
- Ethan BRUNET (@tseacen)
