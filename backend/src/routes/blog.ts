import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRoutes = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    }
  }>();


blogRoutes.use('/*',async(c,next)=>{
    const header = c.req.header("authorization") || "";
  
    const response = await verify(header ,c.env.JWT_SECRET)
  
    if(response.id){
      await next()
    }else{
      c.status(403)
      return c.json({error: "unauthorized"})
    }
})
  
blogRoutes.post('/',async(c)=>{
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

    const post = await prisma.post.create({
      data:{
        title:body.title,
        content:body.content,
        autherId:body.autherId
      },
    });
    return c.json({id:post.id});
  })
  
  blogRoutes.put('/',async(c)=>{
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
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


  blogRoutes.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const post = await prisma.post.findMany();
    return c.json(post);  
  })
  
  
blogRoutes.get('/:id',async(c)=>{
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

    const post = await prisma.post.findFirst({
      where:{
        id:id
      },
    });
    return c.json(post);
  })
