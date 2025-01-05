const login = async(req, res)=>{
    try{
        const {username, password} = req.body;
        console.log("username: " + username + "password: " + password)

        if(username === "laibakhan" && password==="administrator11."){
            res.status(200).send("OK")
        }
       
    }catch(err){
        res.status(404).send(err)
    }
}

module.exports = {
    login
}