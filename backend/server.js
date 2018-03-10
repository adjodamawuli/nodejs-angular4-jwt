


//import { read } from 'fs';

const express=require('express');
const app=express();
const bodyParser=require('body-parser');

let data=require('./jobs');
//console.log('data:', data.jobs);

let initialJobs= data.jobs;
let addedJobs=[];

users =[
    {id:1,email:'adjodalefort@gmail.com',nickname:'adjodalefort', password:'adjodalefort',role:'admin'},
    {id:2,email:'test@test.com',nickname:'test user', password:'test',role:'user'}
];
//const fakeUser={id:1,email:'test@test.com',nickname:'adjodalefort', password:'test'};

const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';

const jwt = require('jsonwebtoken');

const getAllJobs=()=>{
    return [...addedJobs,... initialJobs];
}

app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization ');
    next();
})



const api=express.Router();
const auth=express.Router();



auth.post('/login', (req, res) => {
    if(req.body) {
        const email = req.body.email.toLowerCase();
        const password = req.body.password.toLowerCase();
        console.log(`email=${email}`);
        console.log(`password=${password}`);
        const index =users.findIndex(user => user.email === email);

        console.log(`index=${index}`);

        if( index !== -1 && users[index].password ===password){
            let user=users[index];
            let token='';
            console.log(user);
           
            if(user.email === 'adjodalefort@gmail.com'){
              token = jwt.sign({iss: 'http://localhost:4201',role:'admin',email:req.body.email},secret);
             console.log(`if token =${token}`);
            }else{
              token = jwt.sign({iss: 'http://localhost:4201',role:'user',email:req.body.email},secret);
             console.log(`else token=${token}`);
            }
             delete req.body.password;
             //res.json({success:true, data:req.body});   
             console.log(`debut d envoi du token =${token}`);

             res.json({success:true,token:token});
             console.log(`token envoyé =${token}`)
        }else{
            res.json({success:false,message:'identifiants incorrects'});
        }
    }else{
        res.status(500).json({success:false,message:'données manquantes'});
    }
});

  auth.post('/register', (req,res) => {
    console.log('req.body',req.body);
    if(req.body){
        const email = req.body.email.toLowerCase().trim();
        const password = req.body.password.toLowerCase().trim();
        const nickname=req.body.nickname.trim();

        users = [ {id:Date.now(),email:email,password:password}, ...users];
        res.json({success:true,users:users});
    }else{
        res.json({success:false,message:'la création a échouée !'});
    }
  });


api.get('/jobs',(req,resp) =>{
    //resp.json(data.jobs);
    resp.json(getAllJobs());
});

const checkUserToken =(req,res,next) =>{
    //Authorization: Bearer azeaezl
    if(!req.header('authorization')){
        return res.status(401).json({success:false,message:"Header d'authentification manquant"});
    }
    console.log('req.header', req.header('Authorization'));
    const authorizationParts = req.header('Authorization').split(' ');
    let token = authorizationParts[1];
    console.log('token',token);

     jwt.verify(token,secret,(err,decodedToken) => {
        if(err){
            console.log(err);
            return res.status(401).json({success:false,message:'token non valid'});
        }else{
            console.log('decodedToken',decodedToken);
            //console.log(`decodedToken: ${decodedToken}`)
            next();
        }
    });
    
};


api.post('/jobs',checkUserToken,(req,res) =>{
    console.log("**************post*****************");
    const job=req.body;
    addedJobs =[job, ...addedJobs];
    console.log(addedJobs);
    console.log('total nb of jobs:', getAllJobs().length);
    res.json(job);
});


api.get('/search/:term/:place?',(req, res) => {
    const term=req.params.term.toLowerCase();
    let place = req.params.place;
    let jobs = getAllJobs().filter( j => (j.description.toLowerCase().includes(term) ||j.title.toLowerCase().includes(term) ));
    console.log(`---------------:${place}`); 
    if(place){
        
        place = place.toLowerCase().trim();
        jobs =jobs.filter(j => (j.city.toLowerCase().includes(place) ));
        console.log(`---------length: ${jobs.length}`);
    }
    res.json({success : true, jobs});
})
api.get('/jobs/:id',(req,res)=>{
    
    const id=parseInt(req.params.id,10);
    const job=getAllJobs().filter(j=>j.id===id);

    if(job.length ===1){
        res.json({success:true,job:job[0]});
    }else{
         res.json({ success: false, message: `pas de job ayant pour id ${id}`});
    }
});

  

app.use('/api',api);//localhost/4201/api/jobs
app.use('/auth', auth);
const port =4201;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})