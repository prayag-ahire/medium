import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRoutes } from './routes/blog';
import { cors } from 'hono/cors';
// this is write becuse of the error of env this provide typescript splution
const app = new Hono();
app.use(cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRoutes);
app.get('/', (c) => {
    return c.text('helo hono');
});
export default app;
