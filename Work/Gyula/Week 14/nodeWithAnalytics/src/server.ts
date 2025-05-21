import express from 'express';

const app = express();
const port = 3000;


const trackingMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const data = {
      path: req.path,
      method: req.method,
      status: res.statusCode,
      duration: Date.now() - start,
      userAgent: req.headers['user-agent'],
      referer: req.headers['referer'] || '',
      ip: req.ip,
      timestamp: new Date(),
    };
    // Send data to analytics service asynchronously
    process.nextTick(() => {
      console.log('Analytics data:', data);
      // analyticsService.log(data);
    });
  });
  next();
};

app.use(trackingMiddleware);
app.use(express.static('public'));

/*
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
*/

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


