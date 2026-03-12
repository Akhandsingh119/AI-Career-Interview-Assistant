const userModel = require('../Model/user.model');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const tokkenBlacklist=require('../Model/blacklist.model')


const RegisterController = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(401).json({
                    message: "Username already exists"
                });
            }

            if (existingUser.email === email) {
                return res.status(401).json({
                    message: "Email already exists"
                });
            }
        }

        // Hash password
        const hash = await bcrypt.hash(password, 10);

        // Create new user
      const user=await userModel.create({
            username,
            email,
            password: hash
        });

    const token = jwt.sign(
  { id: user._id },
  process.env.JWT_TOKEN_SECREA,   
  { expiresIn: "2d" }
);

res.cookie("token", token, {
  httpOnly: true,      
  secure: false,       
  sameSite: "lax",
  maxAge: 2 * 24 * 60 * 60 * 1000
})
   
   res.status(200).json({
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
   })

    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
};

async function loginUserController(req, res) {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {[]
        return res.status(400).json({
            message: "Invalid Login"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Wrong password"
        })
    }

const token = jwt.sign(
  { id: user._id },
  process.env.JWT_TOKEN_SECREA,   
  { expiresIn: "2d" }
);

res.cookie("token", token, {
  httpOnly: true,      
  secure: false,       
  sameSite: "lax",
  maxAge: 2 * 24 * 60 * 60 * 1000
})


   res.status(200).json({
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
   })
}

async function logoutUserController(req,res){
    const {token}=req.cookies

    if(token){
        await tokkenBlacklist.create({token})
        res.clearCookie("token")

    }

    res.status(200).json({
        message:"user logout sucessfully"
    })

}

async function getMeController(req,res)
{
   const user=await userModel.findById(req.user._id)

   res.status(200).json({
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
   })
}

module.exports ={ RegisterController,loginUserController,logoutUserController,getMeController};