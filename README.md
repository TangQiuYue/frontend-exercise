# Tic Tac Toe - Frontend Recruitment

Objective: Enhance and refactor the Tic Tac Toe game with a focus on production-readiness. Candidates are invited to implement features and best practices suitable for a robust, deployable application. Feel free to refactor as you wish and also improve the UI's efficiency and aesthetic.

## To Do:

- [x] Add quick documentation to enable starting the project locally.
- [x] Implement logic to revert to a previous state of the game when clicking on a history item.
- [X] Draft a specification and implementation plan for dual-browser game (as if it were a Jira ticket), including technology choices and necessary points of attention.

## Documentation

To open game, open frontend-exercise\dist\index.html in your favourite browser!

> [!WARNING]  
> Game tested only in Chromium and Firefox, try on different browsers at your own risk

Assuming we had nodes packages in our repos:
Foe new devs, start here!

> [!WARNING]  
> Currently using Node v20, please make sure your Node greater than 20

npm install
npm run build
npm run start

## Draft a specification and implementation plan

As a user, I want to play Tic Tac Toe with my friend living in a different country.

 - Implement a server. Options vary based on how big we intend to grow our game plateforme.
> [!NOTE]  
>Do do: look Consider options like WebRtc and Express.js. List pros and cons, discuss alternatives

- consider the need for a secure server. Will others be able to join? Do we want the game to be anonymous or requires a login? Can people simply watch the game? 
- Should the games be recorded? What are possibilities of databases? 


