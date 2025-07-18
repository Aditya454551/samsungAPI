// const express = require("express")

// const port = 3000;

// const app = express()
// app.use(express.json());

// const students = [{
//   name:"Rishi",
//   age:5,
//   gender:"M",
//   id: 1
// },
// {name:"R",age:50,gender:"F"},
// {name:"M",age:20,gender:"O"}
// ]

// app.put("/student",(req,res)=>{
//   const {name,age,gender} = req.body;
//   const data = {name,age,gender}
//   students.push(data)
//   res.status(201).json({result:students})
// })
// app.get("/student",(req,res)=>{
//   res.status(201).json({result:students})
// })
// app.patch("/student",(req,res)=>{
//   const {name,age,gender} = req.body;
//   const data = {name,age,gender}

//   const foundIndex = students.findIndex((e)=>e.name===name)

//   students[foundIndex] = data

//   res.status(201).json({result:students})
// })

// app.delete("/student",(req,res)=>{
//    const {name} = req.body;
//    const resp= students.filter((e)=>e.name !==name)
//   res.status(201).json({result:resp})
// })

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});


// const express = require("express");
// const port = 3000;

// const app = express();
// app.use(express.json());


// console.log(myReq())


// const employees = [{
//   name: "Aditya",
//   salary: 50000,
//   age: 23,
//   id: 1
// },
// {
//   name:"keshav",
//   salary:45000,
//   age:24,
//   id:2
// },
// {
//   name:"Labdhi",
//   salary:40000,
//   age:22,
//   id:3
// },
// ];
// app.use(express.json()); 

// app.put("/employee", (req, res) => {
//   const { name, salary, age } = req.body;
//   const id = employees.length+1;
//   const data = { name, salary, age,id };
//   employees.push(data);
//   res.status(201).json({ result: employees })
// })

// app.get("/employee", (req,res) => {
//   res.status(201).json({ result:employees })
// })

// app.patch("/employee", (req,res) => {
//   const {name,salary,age,id} = req.body;
//   const data = {name,salary,age,id}

//   const foundIndex = employees.findIndex((e) =>e.id===id)
//   employees[foundIndex] = data
//   res.status(201).json({ result:employees})
// })

// app.delete("/employee", (req,res) => {
//   const { id } = req.body;
//   const resp = employees.filter((e) =>e.id!==id)
//   res.status(201).json({result:resp})
// })

// app.listen(port, () => {
//   console.log(`Server running at ${port} `);
// });


 async function apicall() {
    var response = await fetch("https://api.agify.io/?name=meelad");

    var data = await response.json();

    var coverdata = 
    consoler.log(data);
    console.log(data.count);
    console.log(data.name);
    console.log(data.age);
   
}

apicall();