import app from './app';
import config from './config';
import dbConnection from './db';

const server = async () => {
  try {
    dbConnection(config.db_url as string);

    app.listen(config.port, () => {
      console.log(`server is listening on ${config.port}`);
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

server();
