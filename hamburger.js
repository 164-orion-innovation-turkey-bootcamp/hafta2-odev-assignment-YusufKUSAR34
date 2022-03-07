//stock list created.
let listOfMaterials =
{
    lettuce:5,
    pickle:5,
    packageSauce:5,
    onion:5,
    meatball:5,
    chicken:5,
    tomato:5,
    bread:5,
    potato:5,
    cola:5
}

let isShopOpen = true;//Is the burger open or not? variable
let meal="";  //I will keep the Meat or Chicken query variable
let foodDegree="";//The variable I will keep the cooking degree query is.
let materials=""; //The variable I will keep the query of the ingredients to be added to the burger.
let orderContent = ["pickle","onion","lettuce","tomato"];//so that the customer can choose the ingredients that will be in the burger.
const input = require('console-read-write');  //The structure that allows us to receive data in the console.
                                              //It can be installed with the command (npm i --save console-read-write).

/*  The class that handles the order processing. */
 class Order
{
  
       static async getOrder()  //method of taking an order
       {
          console.log("Welcome to Yusuf Burger.\n");
          console.log("Can I take your order? How many pieces would you like to order?");
       
          let numberOfOrders=await input.read(); //It is used to get the number of orders.
          Stock.stockControl(numberOfOrders); //The stock control method in the stock class is called and the order number is sent.
        
       }    
       static async isMeatballorChickenChoice() //The method that makes the choice of meatball or chicken.
       {
          console.log("Please Choose Meat... chicken / meatball ")
          meal = await input.read(); 
          if(meal==='meatball')
          {
            console.log("How about the cooking situation? little / medium / much ...\n") 
            foodDegree = await input.read(); 
            console.log(`\n What ingredients would you like to have in your burger?\n${orderContent}\n`);
            materials = await input.read();    
            await Order.meatballFood(foodDegree,materials);  //If it is meatballs, the meatball meal method is called and cooking degree and ingredients are sent to this method.                              
          }
          else if(meal === "chicken"){  
            console.log(`\nWhat ingredients would you like to have in your burger?\n${orderContent}\n`);
            materials = await input.read();                                 
            await Order.chickenFood(materials); //If it's chicken, I call my chickenMeal function.
        }
        else{
            throw "There is no such product.\n" 
        }
       }
       static async meatballFood(foodDegree,materials)//Actions to be taken if the choice of burger is meatballs.
       {
        if (foodDegree === "little") {   //degree control with the data we get from the user.
            return Promise.all([                //It's the Promise.all method that does the real work here.
                  WorkProcess.process(2000, () => {                       
                    console.log("Meatballs are ready undercooked.\n");
                }),
                WorkProcess.process(2000, () => {
                    console.log(`${materials} added\n`)
                }),
                WorkProcess.process(5000, () => {
                    console.log("Potatoes were fried.\n")
                }),
                WorkProcess.process(2000, () => {
                    console.log("The drink is prepared.\n")
                })
            ]);
        }

       else if (foodDegree === "medium") {     //The same procedures were repeated depending on the choice of cooking meatballs.
            return Promise.all([
                WorkProcess.process(3000, () => {
                    console.log("Meatballs are ready medium cooked.\n");
                }),
                WorkProcess.process(2000, () => {
                    console.log(`${materials} added\n`)
                }),
                WorkProcess.process(5000, () => {
                    console.log("Potatoes were fried\n")
                }),
                WorkProcess.process(2000, () => {
                    console.log("The drink is prepared\n")
                })
            ]);
        }
    
        if (foodDegree === "much") {            //The same procedures were repeated depending on the choice of cooking meatballs.
            return Promise.all([
                WorkProcess.process(4000, () => {
                    console.log("The meatballs are ready well cooked.\n");
                }),
                WorkProcess.process(2000, () => {
                    console.log(`${materials} added\n`)
                }),
                WorkProcess.process(5000, () => {
                    console.log("Potatoes were fried\n")
                }),
                WorkProcess.process(2000, () => {
                    console.log("The drink is prepared\n")
                })
            ]);
        }
           
       }
        static async chickenFood(materials)  //Actions to be taken if the choice of burger is chicken.
        {
            return Promise.all([
                WorkProcess.process(3000, () => {
                    console.log("The chicken is ready.\n");
                }),
                WorkProcess.process(2000, () => {
                    console.log(`${materials} added\n`)
                }),
                WorkProcess.process(5000, () => {
                    console.log("Potatoes were fried\n")
                }),
                WorkProcess.process(2000, () => {
                    console.log("The drink is prepared\n")
                })
            ]);
        }
        
        static async sosAndProducts()  //The method of Put the Sauces and Products on the Serving Tray.
        {
            console.log("Sauces and products were placed on the serving tray.")
        }
        static async customerServed() //The Serve the Customer method.
        {
            console.log("Served to the customer... Enjoy your meal..\n");
        }
   
}

/*This class was created for stock operations. */
class Stock{
    static async stockControl(numberOfOrders)//A method that performs stock control according to the number of incoming orders.
    {  
     
          if(numberOfOrders<=0 ||numberOfOrders>5) //If the number of orders is greater than 5, it will give an error.
          {
             console.log("Sorry, there are not enough items in stock.\n");
             throw 'We are waiting for you again.';
          }
          else
          {
            console.log("There are enough products in stock. Stock control was done.\n");
          }
     
         
    }
}
/* This class was created for business process operations. */
class WorkProcess
{
    static  async  process (time, work) {  //The method that sets the duration of the incoming transaction.
        return new Promise((resolve, reject) => {
          if (isShopOpen) {
            setTimeout(() => {
              resolve(work());
            }, time);
          } else {
            reject(console.log('Yusuf Burger is closed!'));
          }
        });
      };
}

  //The work process has been started.
  WorkProcess.process(1000, Order.getOrder)
  .then(() => {
    return WorkProcess.process(3000,Stock.stockControl);
  })
  .then(() => {
    return WorkProcess.process(1000,Order.isMeatballorChickenChoice);
  })
 .then(() => {
    return WorkProcess.process(1000,Order.sosAndProducts);
  }).then(() => {
    return WorkProcess.process(1000,Order.customerServed);
  })
