const whiteList = [
    'https://www.youtube.com',
    'http://localhost:3500/'
];

const corsOptions = {
    origin: (origin,callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null,true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

module.exports = corsOptions;