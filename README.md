# React-Board


## Project description

Given the basic application scaffolding, **your goal is to build a simple task management
tool similar to [Trello](https://trello.com/en)**. If you haven't heard about Trello up
until now, now would be a good time to go check it out.

Worry not, you don't have to build a fully-featured clone of Trello. While there are
a few functional requirements you will have to meet but we'd like to encourage you to
make it your own unique creation in the first place.

Now, without further ado, go ahead and [set up a new Trello account for free](https://trello.com/signup).
Other than getting some inspiration, you'll also be using Trello to manage your project
until your own app is ready for the prime time. Your project coordinator should've given
you access to a templated Trello board which reflects the best practices in the world
of digital project management.

### Functional Requirements

These are non-negotiable project requirements that you HAVE TO meet to consider your
project shippable:

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


### Bring Your Own Idea™️

As stated earlier, you're more than encouraged to come up with your own enhancements
and features. Here are a few examples for additional features we thought are nice
to have:

- Copy
- Move to another board
- Share
- Stats
- Users
- Code-splitting



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

2. Make a copy of [data/database.json.dist](data/database.json.dist) and rename it to `data/database.json`
3. ```npm install```
4. ```npm run start:server```
5. ```npm run start:client```
6. Head out to the Trello board, pick a task and start working on it, then rinse and repeat.
7. ```code REPONAME``` and install the recommended extension



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
