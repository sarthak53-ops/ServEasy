const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");


const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sarthakbhatnagar53@gmail.com",
    pass: "huew mtua onab rohd"
  }
});
function updateInventory(items){

    const inventory = JSON.parse(fs.readFileSync("inventory.json"));
  
    items.forEach(item => {
  
      if(inventory[item.name] !== undefined){
  
        inventory[item.name] -= item.quantity;
  
        if(inventory[item.name] <= 5){
          console.log("Low stock alert for:", item.name);
        }
  
      }
  
    });
  
    fs.writeFileSync("inventory.json", JSON.stringify(inventory,null,2));
  
  }

app.post("/send-bill", async (req, res) => {

  const {email,name,total,time,items} = req.body;



  const mailOptions = {
    from: "sarthakbhatnagar53@gmail.com",
    to: email,
    subject: "Your Restaurant Bill",
    text: `
Hello ${name},

Thank you for your order.

Items:
${items}

Total: ₹${total}

Estimated Preparation Time: ${time} minutes

Thanks for visiting!
`
  };

  try{
    await transporter.sendMail(mailOptions);
    res.send("Email sent");
  }
  catch(err){
    console.log(err);
    res.status(500).send("Email failed");
  }

});

app.listen(3000,()=>{
  console.log("Email server running on port 3000");
});