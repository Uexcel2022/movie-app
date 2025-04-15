
import {app} from './app.js';

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});