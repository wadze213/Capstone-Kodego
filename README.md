# Capstone-Kodego

This project was made in the context of Kodego's full stack bootcamp capstone project.

# Intro

For Kodego's capstone project our team decided to create an MVP for a startup that was founded by [wadze213](https://github.com/wadze213).  
The startup business consisted of created recipe kits and offering them, allowing busy adults and inexperienced cooks to enjoy a unique recipe, with the added convenience of grocery done and measured for them and an easy to follow recipe.  
When building an MVP, it is important to take a step back and carfully think about what would be the most important features for the base layer of the final app.  
In this case, we built a recipe sharing web app only featuring the core aspects of the most nescessary bits of the platform. This includes a home page, user authentification and registration, recipe creation and recipe browsing. We also built the recipe creation form to capture data in a way that will allow us to easily implement the additional features that will make the final app.  

# Team

- [wadze213](https://github.com/wadze213)
- [Gu-ren](https://github.com/Gu-ren)
- [AlexPacaldo](https://github.com/AlexPacaldo)

# Quick start guide

1. Install dependecies 

```powershell
cd .\server\
npm i 
cd..
cd .\client\
npm i
cd..
```

2. Start mySQL server

3. Start client  

In a new terminal:  

```powershell
cd .\client\
npm start
cd..
```

4. Start server

In a new terminal:  

```powershell
cd .\server\
npm run devStart
cd..
```

## Tech stack

- **Front-end** : React.js 
- **Server** : Node.js + Express
- **Database** : mySQL

## Folder structure

client/  
├── public/  
├── src/  
│   ├── assets/  
│   └── components/  
│   └── img/  
│   └── pages/  
│   └── styles/  
│   └── App.js  
│   └── cindex.js  
server/  
├── controllers/  
├── images/  
├── routes/  
├── index.js  

# Work attribution 

- [Client](https://github.com/wadze213/Capstone-Kodego/blob/main/client/README.md)
- [Server](https://github.com/wadze213/Capstone-Kodego/blob/main/server/README.md)

# Continued development 

The next development steps for us will be to add features such as grocery generation based on recipe in menu, a web-crawler to fetch product pricing accross a range of online supermarkets to compare prices and more social media like features to better assess the success of recipes.  
Another step that we are carefully considering is to move our database from mySQL to supaBase, allowing us to simplify our stack and directly work with cloud databases.  