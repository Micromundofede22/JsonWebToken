import passport from "passport" //traigo libreria
import local from 'passport-local' //traigo estrategia de la libreria
import UserModel from '../dao/models/user.model.js'
import GitHubStrategy from "passport-github2"
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth"
import passport_jwt from "passport-jwt"
import { createHash, isValidPassword,extractCookie, JWT_PRIVATE_KEY, generateToken } from '../utils.js'


const LocalStrategy = local.Strategy
const JWTStrategy= passport_jwt.Strategy    
const ExtractJWT = passport_jwt.ExtractJwt //extrae token de cookie


const initializePassport = () => {                                

    // CONFIG REGISTER
    passport.use('registerPass', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'                                       
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body

        try {
            // BUSCA USUARIO YA REGISTRADO 
            const user = await UserModel.findOne({ email: username })   
            if (user) {
                console.log('Usuario ya existe')                    
                return done(null, false)                             
                
            }
            // SI NO EXISTE USUARIO, SE REGISTRA UNO NUEVO
            const newUser = {
                first_name, last_name, email, age, password: createHash(password)
            }
            const result = await UserModel.create(newUser)
            return done(null, result)                               
        } catch (err) {
                           
        }
    }))

    // CONFIG LOGIN
    passport.use('loginPass', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ email: username }) 
            if (!user) {   
                return done(null, false)
            }
            if (!isValidPassword(user, password)) return done(null, false) 

            const token= generateToken(user) //generatetoken importado de utils, donde mete los datos del user en un token
            user.token= token //a user le agrego este atributo token, asi el user que me devuelve passport ya esta dentro de un token

            return done(null, user) 
        } catch (err) {

        }
    }))

    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.d5fe56e994ba152a",                                  
        clientSecret: "3ae4422147ceb4569eeec50d72d28d2a78a1e29a",          
        callbackURL: "http://localhost:8080/githubcallback"                
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        try {
            const user = await UserModel.findOne({ email: profile._json.email }) 
            const token= generateToken(user) 
            user.token= token
            if (user) return done(null, user) 

            const newUser = await UserModel.create({                            
                first_name: profile._json.name,
                email: profile._json.email,
                password: " ",                                                  
                role: "user",
                servicio: "GitHub"
            })
            token= generateToken(newUser) 
            newUser.token= token 

            return done(null, newUser)
        } catch (err) {
            return done(`Error to login with GitHub => ${err.message}`)
        }
    }))


    passport.use("googlePass", new GoogleStrategy({
        clientID: "677009444232-m39194megnhvte4295dih3j2hhjit2cf.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8080/googlecallback"
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await UserModel.findOne({ email: profile._json.email }) 

                const token= generateToken(user) 
                 user.token= token 
                if (user) return done(null, user)                                    
                const newUser = await UserModel.create({                            
                    first_name: profile._json.name,
                    email: profile._json.email,
                    password: " ",                                                   
                    role: "user",
                    servicio: "Google",
                    photograph: profile._json.picture
                })

                 token= generateToken(newUser) 
                 newUser.token= token 

                return done(null, newUser)
            } catch (err) {
                return done(`Error to login with Google => ${err.message}`)
            }
        }
    )
    );

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([extractCookie]), //extractCookie importado de utils
        secretOrKey: JWT_PRIVATE_KEY //constante de clave secreta importada de utils
    }, async(jwt_payload, done) => {
        done(null, jwt_payload)//devuelve contenido del jwt
    }))




    passport.serializeUser((user, done) => {                 
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {          
        const user = await UserModel.findById(id)
        done(null, user)
    })
}

export default initializePassport