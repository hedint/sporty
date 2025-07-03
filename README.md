# Sporty

The app deployed here https://hedint.github.io/sporty/ .

## AI usage
- I used the free version of GitHub Copilot as an auto-completion tool to speed up development.
- I used ChatGPT to generate base `fetch` and `cache` wrappers, which I then modified to meet the project requirements.
- Also, it helps me polish this README file :) 

## Architecture and Design Decisions

### App architecture
I aimed to make the app more scalable and maintainable, closer to a real-world application.
- I explore `thesportsdb` docs and implemented a simple wrapper around the API to make it easier to use.
- All API calls and related TypeScript types are placed in separate files to keep components clean and focused on rendering.
- I added a basic caching layer to reduce redundant API calls and enhance performance.
- State management is handled using `Pinia`. While a simple composable could suffice for this assignment, Pinia provides a solid foundation for future growth and complexity.

### UI design
I chose to use `PrimeVue` as the UI library.
Although I hadn't worked with it before (I usually use custom design systems), I had heard positive feedback and wanted to give it a try.


In addition, I implemented several UI/UX features not explicitly required by the task, including:
- Loading indicators
- Error handling
- Responsive layout
- Empty states

### CI/CD

I set up a simple CI/CD pipeline to automatically build and deploy the app to `GitHub Pages`.

The app is here: [https://hedint.github.io/sporty/](https://hedint.github.io/sporty/)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
