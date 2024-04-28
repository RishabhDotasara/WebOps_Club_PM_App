const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");

//get data from the file
const filepath = "mess.json";
const navigate = "navigate.json"

let menu;
let navigation;


fs.readFile(filepath, "utf-8", (err, data) => {
  if (err) {
    console.log("Error loading the data.");
    return;
  }

  try {
    console.log("Data retreived successfully!\n");
    menu = JSON.parse(data);
    console.log("Parsed into json");
  } catch (error) {
    console.log(error); 
  }
}); 

fs.readFile(navigate, "utf-8", (err, data) => {
  if (err) {
    console.log("Error loading the data.");
    return;
  }

  try {
    console.log("Data retreived successfully!\n");
    navigation = JSON.parse(data);
    console.log("Parsed into json");
  } catch (error) {
    console.log(error); 
  }
}); 
console.log(navigation)


//return the whole file without any filter.
app.get("/",(req,res)=>{
    //This is the navigator for the server, that tells what are the endpoints
    res.json(navigation);
})
app.get("/menu", (req, res) => {
    var data = menu;
    if (req.query)
    {
        const { type, week, day, time } = req.query;
        console.log(type,week,day,time);

        if (type != null)
        {
            console.log("Type:",type);
            data = menu[type];
            if (week != null)
            {
                data = data[week]
                if (day!=null)
                {
                    data = data[day];
                    if(time!=null)
                    {
                        data = data[time];
                    }
                }
            }
        }
    }
    // console.log("data",data);
    res.json(data);
  
});



app.listen(PORT, () => {
  console.log("Server listening at PORT ", PORT);
});
