import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  default_Student_password: process.env.DEFAULT_STUDENT_PASSWORD,
};
