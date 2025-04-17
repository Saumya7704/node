const express = require("express") //express....
const mongoose = require("mongoose")
const cors = require("cors")
const ordersRoute = require("./src/routes/OrderRoutes")
//express object..
const app = express()
app.use(cors())// *
app.use(express.json()) //to accept data as json...


//import role routes
const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

//userRoutes
const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state", stateRoutes)
//http://localhost:3000/addState
//http://localhost:3000/state/addState


const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city", cityRoutes) //http://localhost:3000/city/addCity


const areaRoutes = require("./src/routes/AreaRoutes")
app.use("/area", areaRoutes) //http://localhost:3000/area/add

const CategoryRoutes = require("./src/routes/CategoryRoutes")
app.use("/category", CategoryRoutes) //http://localhost:3000/category/add

const SubCategoriesRoutes = require("./src/routes/SubCategoryRoutes")
app.use("/subCategory", SubCategoriesRoutes)//http://localhost:3000/subcategory/add

const ProductRoutes = require("./src/routes/ProductRoutes")
app.use("/product", ProductRoutes)

app.use('/api', ordersRoute);

mongoose.connect("mongodb://127.0.0.1:27017/NODE")
    .then(() => {
        console.log("✅ Database connected");
    })
    .catch((err) => {
        console.error("❌ Failed to connect to database:", err);
        process.exit(1); // Optional: exit if DB connection is critical
    });





//server creation...
const PORT = 3000
app.listen(PORT, () => {
    console.log("server started on port number ", PORT)
})