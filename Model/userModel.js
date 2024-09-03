const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const { Password } = require('@mui/icons-material');

const userShcema = new mongoose.Schema({
    username:{
        type:String,
        required:[true , 'Username is required']
    },
    email:{
        type:String,
        required:[true, "Email ID is required"],
        unique:true
    },
    password:{
        type:String,
        require:[true,"Password is required"],
        minlength:[6,"Password should be 6 character"]
    },
    customerID:{
        type:String,
        default:''
    },
    subcription:{
        type:String,
        default:''
    }
});

// hash password
userShcema.pre("save",async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next()
});

// match password
userShcema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password,this.password);
}

// sign token
userShcema.methods.getSignToken = async function(res){
    const accessToken = JWT.sign(
        {id:this._id},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn:process.env.JWT_ACCESS_EXPIRIN}
    );
    const refreshToken = JWT.sign(       
         {id:this._id},
        process.env.JWT_REFRESH_TOKEN,
        {expiresIn:process.env.JWT_REFRESH_EXPIRIN}
    );
    res.cookie("refreshToken" , `${refreshToken}`,{
        maxAge:86700 * 7000,
        httpOnly : true
    });
    
};

const User = new mongoose.model('user',userShcema);

module.exports = User;