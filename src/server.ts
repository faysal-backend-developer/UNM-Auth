import app from './app';
import config from './config';
import dbConnection from './db';

const run = async () => {
  try {
    await dbConnection(config.db_url as string);
    app.listen(
      config.port,

      () => {
        console.log(`listening on ${config.port}`);
      },
    );
  } catch (error) {
    console.log(error);
  }
};

run();
