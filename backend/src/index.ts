import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRoutes } from './routes/blog';
// this is write becuse of the error of env this provide typescript splution

const app = new Hono();

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRoutes)

app.get('/',(c)=>{
  return c.text('helo hono')
});

export default app;
