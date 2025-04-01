import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { SignupInput,SigninInput } from "@prayag01/common";

export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    }
  }>();

  userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const {success} = SignupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({message:"input is not correct"});
    }
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
        name: body.name
      },
    });
  
    const token = await sign({ id: user.id },c.env.JWT_SECRET);
    console.log(token);
    return c.json({ jwt: token });
  })
  
  userRouter.get("/alluser",async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const user = await prisma.user.findMany(
      {
      select:{
        email:true,
        name:true,
        id:true
      }
    });
    return c.json(user);

  })




  userRouter.post('/signin',async (c)=>{
  
  // this is importent to initialize prisma client
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    //get body in json format
    const body = await c.req.json();
    const {success} = SigninInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({message:"input is not correct"});
    }
    // find user in database 
    const user = await prisma.user.findUnique({
      where:{
        email:body.username,
        password:body.password
      }
    });
    //if user is not exist
    if(!user){
      c.status(403);
      return c.json({"message":"user is not exist create new user"})
    }
    const jwt = await sign({id:user.id},c.env.JWT_SECRET);
    return c.json({jwt})
  
    
  })