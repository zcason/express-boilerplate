import { listen } from './app';
import { PORT } from './config';

listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})