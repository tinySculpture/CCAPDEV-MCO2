# CCAPDEV-MCO2

Changed from base HTML to using React and Express built with Vite.

Also, the app is now using Typescript, which is basically just javascript with types and interfaces and stuff, I 100% recommend downloading error lens on vscode (or some plugin for error detection) if you want less headaches. Typescript can be strict with its data types and syntax.

I'm sorry that I got this fixed very late, and highkey so much changed, but hopefully the readme will get you started for hwo to set it up on your PC.

I'm genuinely also trying to learn this stuff (lmao) but if you have questions, ask me or look it up on Google or Youtube or smth there's probably someone encountering the same problem as you are (trust me half of the things on this is looked up and is probably on stackoverflow or yt)

---
## How to set up
1. Clone repository on vscode or just using the github desktop thing
2. Go into the folder and do `npm install` to install all relevant packages.
  - If you get errors where some packages are not installed, install them manually, and pls tell me so I can try fixing the package file so it don't happen again.
  - If you add packages, make sure `package.json` and `package-lock.json` files are updated, and notify everyone so we can download the modules added.
  - (BTW there's like at least 5k files in node_modules when you download the packages, so don't delete the .gitignore file)
3. To start the project, just type in `npm run dev` to run the server at `localhost:3000`
4. That's pretty much it, glhf
---

__Notes__ _(Feel free to add stuff)_

- React, express and all front-end stuff has been added.
- I'm still figuring out color schemes, and the entire thing is built on bootstrap. If you want an easy way of making your own thing with bootstrap, I recommend using Bootstrap Studio (free with the Github student thing) and export the html, copy and paste what you need and edit the syntax.
- Hopefully most or all of front-end has been moved to react, but I will double check.
- Axios is ued for connecting the front-end to the back-end. Look up how to use axios and try following some guides online. This also means that there are some props in the react front-end that might be better removed. A lot of the front-end data is very rudimentary and temporary.

__TODO__

- [ ] Sign-up page front-end
- [ ] Import mongodb database
- [ ] Add Functionality for each page

post {
  comments: [
    uid: {
      uid: ""
      text: "",
      userid: "",
      createdAt: "",
      votes: ""
    }
  ]
}