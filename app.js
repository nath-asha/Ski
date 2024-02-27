import express from 'express';
import { urlencoded, json } from 'body-parser';
import { connect } from 'mongoose';
import userRoutes from './routes/userRoutes';
import errorMiddleware from './middleware/errorMiddleware';

require('dotenv').config();

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use('/users', userRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
