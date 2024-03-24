# CCAPDEV-MCO2

## Notable changes from MCO1 to MCO2
1. The languages used in the application changed from base HTML to using React and Express built with Vite.
2. The application now uses TypeScript. It is highly recommended to download `Error Lens` on VS Code or any plugins for error detection, as TypeScript can be strict with its data types and syntax. 
3. The application now has a database connected to it via MongoDB. 
4. The application implemented MVC architecture. 

---
## How to set up
1. Clone the repository on VS Code or open with GitHub desktop. Else, you may download the ZIP file, then extract it. 
2. Open the folder and type `npm install` into the terminal to install all relevant packages.
  - If you get errors where some packages are not installed, install them manually. 
  - If you add packages, make sure `package.json` and `package-lock.json` files are updated, and notify everyone so we can download the modules added.
  - BTW there's like at least 5k files in node_modules when you download the packages, so don't delete the .gitignore file
3. To start the project, just type in `npm run dev` to run the server at `localhost:3000`
4. That's pretty much it, glhf
---

__Notes__ _(Feel free to add stuff)_

- React, express and all front-end stuff has been added.
- I'm still figuring out color schemes, and the entire thing is built on bootstrap. If you want an easy way of making your own thing with bootstrap, I recommend using Bootstrap Studio (free with the Github student thing) and export the html, copy and paste what you need and edit the syntax.
- Hopefully most or all of front-end has been moved to react, but I will double check.
- Axios is used for connecting the front-end to the back-end. Look up how to use axios and try following some guides online. This also means that there are some props in the react front-end that might be better removed. A lot of the front-end data is very rudimentary and temporary.

__TODO__

- [ ] Search post, user
- [ ] Create post. The latest post must be placed at the top of the home page
- [ ] Edit post, comment (and replies) 
- [ ] Delete post, comment (and replies)
- [ ] Report post, comment (and replies)
- [ ] user dashboard - where a user can view the posts made & total amount of votes
- [ ] admin dashboard - see the posts reported, delete reported posts which are deemed  inappropriate by the admin
- [ ] Sign-up page front-end, field validation
- [ ] log-in validation (password: salt and hash in mongodb, password and username validation)
- [ ] Import mongodb database
- [ ] Add Functionality for each page
