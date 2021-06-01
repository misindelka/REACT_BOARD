# ReactBoard
![Snímka obrazovky 2021-06-01 o 8 51 02](https://user-images.githubusercontent.com/82036512/120279246-810ecf80-c2b6-11eb-95ae-108170d8d77f.png)
![Snímka obrazovky 2021-06-01 o 8 48 42](https://user-images.githubusercontent.com/82036512/120279029-43aa4200-c2b6-11eb-911c-043469fe06f7.png)


## Project description

**ReactBoard** is a student project with aim to create collaboration tool that organizes your projects into boards. In one glance, **ReactBoard** tells you what's being worked on, who's working on what, and where something is in a process. Imagine a white board, filled with lists of sticky notes, with each note as a task for you and your team. Now imagine that you can take that whiteboard anywhere you go on your smartphone, and can access it from any computer through the web. That's **ReactBoard**!

### Functionality

- Creating new boards
- Editing boards
- Deleting boards
- Creating new lists within a board
- Editing lists
- Delete a list
- Creating new cards within a list
- Edit a card
- Archiving cards
- Drag and drop cards between lists

### Environment Setup

1. Clone the repository 

   ```sh
   git clone https://github.com/USERNAME/REPONAME.git
   # or use ssh
   git clone git@github.com:USERNAME/REPONAME.git

   # optionally add this template as an upstream remote
   git remote add upstream https://github.com/sudolabs-io/bootcamp-final-assignment.git
   # or use ssh
   git remote add upstream git@github.com:sudolabs-io/bootcamp-final-assignment.git
   ```

3. Make a copy of [data/database.json.dist](data/database.json.dist) and rename it to `data/database.json`
4. ```npm install```
5. ```npm run start:server```
6. ```npm run start:client```
7. Head out to the Trello board, pick a task and start working on it, then rinse and repeat.
8. ```code REPONAME``` and install the recommended extension


## Documentation

- <https://github.com/typicode/json-server#table-of-contents>
- <https://vitejs.dev/>
- <https://chakra-ui.com/docs/getting-started>
- <https://react-icons.github.io/react-icons/>
- <https://reactrouter.com/web/guides/quick-start>

## Known Issues

### The site is not reloading on change to source files

Open [vite.config.js](vite.config.js) and uncomment the relevant section that enables polling.

### Esbuild is failing to build the project on Windows

You'll need to run `node node_modules/esbuild/install.js` in the root of your project.

## Contributors

Michal Sindelka - https://github.com/misindelka
Vladimir Tomko - https://github.com/VladimirTomko
