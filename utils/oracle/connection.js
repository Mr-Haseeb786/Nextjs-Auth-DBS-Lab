"use server";

const oracledb = require("oracledb");
let connection;

export async function connect({ username, password, email }) {
  try {
    connection = await oracledb.getConnection({
      user: "system",
      password: process.env.db_pass,
      connectString: "mr-hx-pc:1521/xepdb1",
    });
  } catch (error) {
    console.log("Failed to connect to DB: ", error);
    return;
  }

  try {
    const result = await connection.execute(
      `SELECT * FROM profiles WHERE USERNAME like :username AND PASSWORD like :password AND EMAIL like :email`,
      {
        username: `%${username}%`,
        password: `%${password}%`,
        email: `%${email}%`,
      }
    );
    // setTime out to mock loading interface
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));
    await promise;
    console.log(result.rows);
    return result.rows[0];
  } catch (error) {
    console.log("Failed to execute query: ", error);
    return;
  }

  // await connection.close();
}

export const closeConnection = async () => {
  try {
    await connection.close();
  } catch (error) {
    console.log("Failed to close connection: ", error);
    return;
  }
};
