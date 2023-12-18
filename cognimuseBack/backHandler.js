// Import the Express module
import pool from './database.js'
import bcrypt from 'bcryptjs'
import express, { json } from 'express'
import cors from 'cors'
import axios from 'axios'

// Create an Express application instance
const app = express();

app.use(cors());
app.use(express.json())


// Define a port number
const port = 3000;
const saltRounds = 10;

// Define a route handler for the root path
app.post('/login', async (req, res) => {
  // Send a response to the client
  let { email, password } = req.body.data;
  // Hash the password before inserting it into the database

  console.log("request came");

  // const  {email, password} = req.body.data;

  // Query the database to find the user with the matching username
  pool.query("SELECT * FROM cognKitchen.USER WHERE email = ?", [email], (err, result) => {
    if (err) {
      // Handle errors
      console.log(err);
      return res.status(500).send("Server error");
    }

    if (result.length > 0) {
      // Get the hashed password from the database
      const hash = result[0].password;
      console.log(hash, password)

      // Compare the input password with the hashed password using bcrypt.compare function
      bcrypt.compare(password, hash, (err, match) => {
        if (err) {
          // Handle errors
          console.log(err);
          return res.status(500).send("Server error");
        }
        console.log(match)
        if (match) {
          // Passwords match, authenticate the user and redirect them to the home page
          console.log("Login successful");
          res.status(200).send("Success");
        } else {
          // Passwords do not match, display an error message and ask the user to try again
          console.log("Invalid password");
          res.status(400).send("Invalid username")
        }
      });
    } else {
      // No user found with the matching username, display an error message and ask the user to try again
      console.log("Invalid username");
      res.status(400).send("Invalid Username")
    }
  });

});

app.post('/signup', (req, res) => {


  // return res.send("Hello!");

  console.log(req.body.data);
  let { username, email, password } = req.body.data;

  console.log("request came!", password)


  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      // Handle errors
      console.log(err)
      return res.status(400).send("Error Occurred!");
      // console.error(err);
    } else {
      // Insert the hashed password into the database
      pool.query("INSERT INTO cognKitchen.USER (username, email, password) VALUES (?, ?, ?)", [username, email, hash], (err, result) => {
        if (err) {
          // Handle errors
          console.log(err)
          return res.status(400).send("Error Occurred!");
          // return console.error(err);
        } else {
          // Handle success
          // console.log(res)
          return res.status(200).send("Success!");

          // return console.log(result);

        }
      });
    }
  });

});

app.get('/hero', async (req, result) => {

  var heroPic = "https://storage.googleapis.com/aiurveda-2fb88.appspot.com/food-thumbnails/masala_dosa.jpg", heroName = "Masala Dosa";


  const apiUrl = "https://ayur-analytics-6mthurpbxq-el.a.run.app/get/all";

  // Call the API using fetch
  console.log("request recieved!");
  await axios(apiUrl)
    .then(async data => {

      // console.log(data.data)
      let index = Math.floor(Math.random() * 423);
      let recipe = data.data.recipesList[index];
      console.log(recipe)

      await axios(`https://ayur-analytics-6mthurpbxq-el.a.run.app/get/${recipe}`,{timeout : 1000000})
      .then(recRes => {
        console.log(recRes.data)
        heroPic = recRes.data.foodImage 
        heroName = recRes.data.foodName
        result.json({
          heroPic : heroPic,
          heroName : heroName,
        })
      })
      .catch(recErr => {
        console.log(recErr, "me")
        let imgLink = [
          "https://th.bing.com/th/id/OIG.LwGjadfbaP3oN.emIwc.?w=173&h=173&c=6&r=0&o=5&dpr=1.1&pid=ImgGn",
          "https://th.bing.com/th/id/OIG.hJaxCjpJSxHMe0m7fclW?pid=ImgGn",
          "https://th.bing.com/th/id/OIG.wF8MTXHPT3vDTgEvEqdl?pid=ImgGn",
          "https://th.bing.com/th/id/OIG.BNi_i61e0LL8TWsRaiGO?pid=ImgGn",
          "https://th.bing.com/th/id/OIG.7OsjjUBd7w3O6e62QdGR?pid=ImgGn",
          "https://th.bing.com/th/id/OIG.1PnHDibT1mLqUNGEfp0T?pid=ImgGn",
          "https://th.bing.com/th/id/OIG.3iC0Z22beVpCXRwk19Qk?pid=ImgGn",
          "https://th.bing.com/th/id/OIG.lfCXCASaQr2uRrxqDeM4?pid=ImgGn"
        ]
        result.json({
          heroPic : imgLink[Math.floor(Math.random()*7)],
          heroName : recipe,
          heroDescription : "Description not found",
          heroIngredients : Array(5).fill(["https://th.bing.com/th/id/OIG.YfPOt_1J.fWA6ORr_948?pid=ImgGn&w=1024&h=1024&rs=1", "Not found"])
        })
      })
      // result.json({
      //   heroPic : "https://storage.googleapis.com/aiurveda-2fb88.appspot.com/food-thumbnails/fish_tawa_fry.jpg",
      //   heroName : recipe
      // })

    }) // Update the state variable with the data
    .catch(error => console.error(error, "nome")); // Handle errors
    // result.status(400).send("Something went Wrong!")
})

app.get('/getNames', (req, res) => {
  // var heroPic = "https://storage.googleapis.com/aiurveda-2fb88.appspot.com/food-thumbnails/masala_dosa.jpg", heroName = "Masala Dosa";


  const apiUrl = "https://ayur-analytics-6mthurpbxq-el.a.run.app/get/all";

  // Call the API using fetch
  console.log("request recieved!");
  axios(apiUrl)
    .then(async data => {

      // console.log(data.data)
      // let index = Math.floor(Math.random() * 423);
      // let recipe = data.data.recipesList[index];
      
      // result.json({
      //   heroPic : "https://storage.googleapis.com/aiurveda-2fb88.appspot.com/food-thumbnails/fish_tawa_fry.jpg",
      //   heroName : recipe
      // })
      res.json({recipeList : data.data.recipesList})
    }) // Update the state variable with the data
    .catch(error => console.error(error, "nome")); // Handle errors
    // result.status(400).send("Something went Wrong!")
})

app.get('/fullDetails', (req, res) => {
  let recipe = req.query.foodName
  axios(`https://ayur-analytics-6mthurpbxq-el.a.run.app/get/${recipe}`)
      .then(recRes => {
        console.log(recRes.data)
        let heroPic = recRes.data.foodImage 
        let heroName = recRes.data.foodName
        res.json({
          heroPic : heroPic,
          heroName : heroName,
          heroDescription : recRes.data.foodDescription,
          heroIngredients : recRes.data.keyIngredients
        })
      })
      .catch(recErr => {
        console.log(recErr, "me")
        let imgLink = [
          "https://th.bing.com/th/id/OIG.LwGjadfbaP3oN.emIwc.?w=173&h=173&c=6&r=0&o=5&dpr=1.1&pid=ImgGn",
          "https://th.bing.com/th/id/OIG.hJaxCjpJSxHMe0m7fclW?pid=ImgGn",
          "https://th.bing.com/th/id/OIG.wF8MTXHPT3vDTgEvEqdl?pid=ImgGn",
          "https://th.bing.com/th/id/OIG.BNi_i61e0LL8TWsRaiGO?pid=ImgGn",
          "https://th.bing.com/th/id/OIG.7OsjjUBd7w3O6e62QdGR?pid=ImgGn",
          "https://th.bing.com/th/id/OIG.1PnHDibT1mLqUNGEfp0T?pid=ImgGn",
          "https://th.bing.com/th/id/OIG.3iC0Z22beVpCXRwk19Qk?pid=ImgGn",
          "https://th.bing.com/th/id/OIG.lfCXCASaQr2uRrxqDeM4?pid=ImgGn"
        ]
        res.json({
          heroPic : imgLink[Math.floor(Math.random()*7)],
          heroName : recipe,
          heroDescription : "Description not found",
          heroIngredients : Array(5).fill(["https://th.bing.com/th/id/OIG.YfPOt_1J.fWA6ORr_948?pid=ImgGn&w=1024&h=1024&rs=1", "Not found"])
        })
      })
})

app.get("/addfav", (req, res) => {

  let {email, food} = req.query
  console.log(food)
  
  pool.query("SELECT * FROM cognKitchen.fav WHERE email = ? AND food = ?", [email, food], (error, results) => {
    if (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }

    if (results.length === 0) {
        // The record does not exist, perform the insert
        pool.query("INSERT INTO cognKitchen.fav (email, food) VALUES (?, ?)", [email, food], (insertError, insertResult) => {
            if (insertError) {
                console.error(insertError);
                return res.status(500).send("Internal Server Error");
            }
            return res.status(200).send("success");
        });
    } else {
        // The record already exists, handle accordingly (delete or send a message)
        // For example, you can delete the existing record:
        pool.query("DELETE FROM cognKitchen.fav WHERE email = ? AND food = ?", [email, food], (deleteError, deleteResult) => {
            if (deleteError) {
                console.error(deleteError);
                return res.status(500).send("Internal Server Error");
            }
            return res.status(200).send("success");
        });

        // Alternatively, you can send a message indicating the duplicate entry
        // return res.status(400).send("Duplicate entry");
    }
});

})

app.get("/checkfav", (req, res) => {
  
  let {email, food} = req.query
  console.log(email, food)

  pool.query("select * from cognKitchen.fav where email=? and food=?",[email, food], (error, result, field) => {

    if(error){
      console.log(error);
      res.status(400).send("something went wrong!")
      return;
    }
    console.log(result, field, "isfav")
    if(result.length > 0){
      res.status(200).send("success")
    }else res.status(400).send("not favorite")
  })
})

app.get("/findfav", (req, res) => {

  let {email} = req.query

  pool.query("select food from cognKitchen.fav where email=?",[email], (error, result) => {

    if(error){
      console.log(error)
      res.json({
        fav : []
      })
      return
    }

    console.log(result)
    res.json({
      fav : result
    })
  })
})

// Start listening for requests on the port
app.listen(4000, () => {
  // Log a message when the server is ready
  console.log(`Server running`);
});