 const adminAuth = (req,res,next) => {
    console.log("admin auth checking...")
    const token = "xyz";
    const isAdminAuthorized = token === "xyz"

    if(!isAdminAuthorized){
     res.status(401).send("admin is not authorized")
    } else {
        next()
    }

}

 const userAuth = (req,res,next) => {
    console.log("admin auth checking...")
    const token = "xyfz";
    const isAdminAuthorized = token === "xyz"

    if(!isAdminAuthorized){
     res.status(401).send("admin is not authorized")
    } else {
        next()
    }

}

module.exports = {
    adminAuth,
    userAuth
}