import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput,updateblogInput } from "@prayag01/common";


export const blogRoutes = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    },
    Variables:{
      userId:string
    }
  }>();

// middleware use in every route of blogRoutes
blogRoutes.use('/*',async(c,next)=>{
    const header = c.req.header("authorization") || "";
  
    try{
      const user = await verify(header ,c.env.JWT_SECRET);
  
    if(user){
      c.set("userId",user.id+"");
      await next();
    }else{
      c.status(403)
      return c.json({error: "unauthorized"});
    }
    }catch(error){
      c.status(403)
      return c.json({message: "you are not log in"})
    }
})

//  post http://127.0.0.1:8787/api/v1/blog
blogRoutes.post('/',async(c)=>{
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({message:"input is not correct"});
  }
  const autherId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

    const post = await prisma.post.create({
      data:{
        title:body.title,
        content:body.content,
        autherId:Number(autherId)
      },
    });
    return c.json({id:post.id});
  })
  
// put http://127.0.0.1:8787/api/v1/blog
  blogRoutes.put('/',async(c)=>{
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const {success} = updateblogInput.safeParse(body);
      if(!success){
        c.status(411);
        return c.json({message:"input is not correct"});
      }
    const post = await prisma.post.update({
      where:{
        id:body.id
      },
      data:{
        title:body.title,
        content:body.content,
        published:body.published
      },
    });
    return c.json({id:post.id});
  })


// get http://127.0.0.1:8787/api/v1/blog/bulk 
  blogRoutes.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const post = await prisma.post.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });
    return c.json(post);  
  })
  
//  get http://127.0.0.1:8787/api/v1/blog/4
blogRoutes.get('/:id',async(c)=>{
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

    const post = await prisma.post.findFirst({
      where:{
        id:Number(id)
      },
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });
    return c.json(post);
  })
