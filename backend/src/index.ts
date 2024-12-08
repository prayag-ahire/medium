import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode,sign,verify } from 'hono/jwt';

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string

  }
}>();
// this is write becuse of the error of env this provide typescript splution




app.get('/',(c)=>{
  return c.text('helo hono')
})

app.get('/api/v1/blog/', (c) => {
  const id = c.req.param('id');
  const id2 = c.req.query('ic');
  console.log(id2);
  console.log(id);
  return c.text('get blog route');
})

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name: body.name
    },
  });

  const token = await sign({ id: user.id },c.env.JWT_SECRET);
  console.log(token);
  return c.json({ jwt: token });
})

app.post('/api/v1/signin',(c)=>{
  return c.text('signin route');
})

app.post('/api/v1/blog',(c)=>{
  return c.text('new blog');
})

app.put('api/v1/blog',(c)=>{
  return c.text('edit blog');
})

app.get('api/v1/blog/:id',(c)=>{
  return c.text('this is the blog');
})



export default app
