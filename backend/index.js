const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());
const dbPath = path.join(__dirname, "online_voting_db.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(4001, () => {
      console.log("Server Running at http://localhost:4001/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

//Registe_API!!!

app.post("/register", async (request, response) => {
  const { voter_name, voter_id, is_voted } = request.body;
  const hashedPassword = await bcrypt.hash(request.body.voter_id, 10);
  const selectUserQuery = `SELECT * FROM voter WHERE voter_name = '${voter_name}';`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    const createUserQuery = `
      INSERT INTO 
        voter (voter_name, voter_id, is_voted) 
      VALUES 
        (
          
          '${voter_name}',
          '${hashedPassword}',
          '${is_voted}'
          
          
        );`;
    const dbResponse = await db.run(createUserQuery);
    const newUserId = dbResponse.lastID;
    response.send(`Created new voter with ${newUserId}`);
  } else {
    response.status = 400;
    response.send("voter already exists");
  }
});

//Login_API!!!!

app.post("/login", async (request, response) => {
  const { voter_name, voter_id } = request.body;
  const selectUserQuery = `SELECT * FROM voter WHERE voter_name = '${voter_name}'`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    response.status(400);
    response.send("Invalid voter");
  } else {
    const isPasswordMatched = await bcrypt.compare(voter_id, dbUser.voter_id);
    if (isPasswordMatched === true) {
      response.send("Login Success!");
    } else {
      response.status(400);
      response.send("Invalid Password");
    }
  }
});

app.get("/voter/", async (request, response) => {
  const getUsersQuery = `
  SELECT
    *
  FROM
  voter
  ORDER BY
    id;`;
  const usersArray = await db.all(getUsersQuery);
  response.send(usersArray);
});


app.get("/candidates/", async (request, response) => {
  const getUsersQuery = `
  SELECT
    candidate_id, candidate_name, candidate_party, candidate_symbol
  FROM
  candidate
  ORDER BY
    candidate_id;`;
  const usersArray = await db.all(getUsersQuery);
  response.send(usersArray);
});

app.get("/results/", async (request, response) => {
  const getUsersQuery = `
  SELECT
    *
  FROM
  candidate
  ORDER BY
    count DESC
    ;`;
  const usersArray = await db.all(getUsersQuery);
  response.send(usersArray);
});



app.get("/user1/", (request, response) => {
  response.send("sudharshan");
});



//API-5 delete method
app.delete("/voter/:id/", async (request, response) => {
  const { id } = request.params;
  const delete1query = `DELETE FROM voter WHERE id = ${id};`;
  const res4 = await db.run(delete1query);
  response.send("voter Deleted");
});


app.delete("/candidate/:candidate_id/", async (request, response) => {
  const { candidate_id } = request.params;
  const delete2query = `DELETE FROM candidate WHERE candidate_id = ${candidate_id};`;
  const res1 = await db.run(delete2query);
  response.send("candidate Deleted");
});


app.post("/addcandidates", async (request, response) => {
  const { candidate_name, candidate_party, candidate_symbol, count } = request.body;
 
  const selectCandidateQuery = `SELECT * FROM candidate WHERE candidate_party = '${candidate_party}';`;
  const dbUser = await db.get(selectCandidateQuery);
  if (dbUser === undefined) {
    const createCanQuery = `
      INSERT INTO 
        candidate (candidate_name, candidate_party, candidate_symbol, count) 
      VALUES 
        (
          
          '${candidate_name}',
          '${candidate_party}',
          '${candidate_symbol}',
          ${count}
          
          
        );`;
    const dbResponse = await db.run(createCanQuery);
    const newUserId = dbResponse.lastID;
    response.send(`Created new candidate with ${newUserId}`);
  } else {
    response.status = 400;
    response.send("candidate already exists");
  }
});


app.put("/update", async (request, response) => {
  const { candidate_id, voter_name, voter_id } = request.body;
  
  const selectUserQuery = `SELECT * FROM voter WHERE (voter_name = '${voter_name}' AND is_voted = 'false');`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    response.status(400);
    response.send("no voters are present");
  } else {
    const isPasswordMatched = await bcrypt.compare(voter_id, dbUser.voter_id);
    if (isPasswordMatched === true) {
      
      const dbRes = `UPDATE candidate
                    SET count = count + 1
                   WHERE candidate_id = ${candidate_id};`;

      

      const dbRes1 = `UPDATE voter
                      SET is_voted = 'true'
                      WHERE voter_name = '${voter_name}';`;

      const result1 = await db.run(dbRes1);

      const result = await db.run(dbRes);

      response.status = 200;
      response.send("Update successful");
    } else {
      response.status(400);
      response.send("Invalid updates");
    }
    

  }
});

app.put("/updatevoter", async (request, response) => {
  // const {  voter_id } = request.body;
 
  const selectUserQuery = `UPDATE voter SET is_voted = 'false';`;
  const dbUser = await db.run(selectUserQuery);
  response.send("update changees");

});


app.post("/adminLogin", async (request, response) => {
  const { name, password } = request.body;
  const selectUserQuery = `SELECT * FROM admin WHERE password = '${password}' AND name = '${name}';`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    response.status(400);
    response.send("Invalid voter");
  } else {
    response.status(200);
      response.send("Login Success!");
   
  }
});






module.exports = app;