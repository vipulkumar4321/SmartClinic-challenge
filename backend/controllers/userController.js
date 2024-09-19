const csvParse = require("csv-parse");
const { insertUsers, getUsers } = require("../models/userModel");

// Upload users from CSV
exports.uploadUsers = async (req, res) => {
  const file = req.file;

  if (!file || !file.buffer) {
    return res
      .status(400)
      .send({ message: "No file uploaded or file buffer is missing." });
  }

  try {
    const parser = csvParse.parse(file.buffer.toString(), {
      delimiter: ",",
      trim: true,
      columns: false,
    });

    const users = [];
    let isFirstRow = true;

    parser.on("data", (row) => {
      if (isFirstRow) {
        const headers = row.map((cell) => cell.toLowerCase().trim());
        if (
          headers.includes("name") &&
          headers.includes("email") &&
          headers.includes("phones")
        ) {
          isFirstRow = false;
          return;
        }
      }

      if (row.length >= 3) {
        users.push({
          name: row[0],
          email: row[1],
          phones: row[2].split(/[| |-]/),
        });
      }
    });

    parser.on("end", async () => {
      const data = users.map((user) => {
        const creationDate = new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        });

        return {
          name: user.name,
          email: user.email,
          phones: user.phones.join(","),
          creation_date: creationDate,
        };
      });

      const response = await insertUsers(data);
      if (response.error) {
        return res
          .status(500)
          .send({ message: "Error inserting data into the database." });
      }
      res.send({ message: "File uploaded and data inserted successfully." });
    });

    parser.on("error", (error) => {
      console.error("CSV parsing error:", error);
      res.status(500).send({ message: "Error parsing CSV file." });
    });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send({ message: "Error processing file." });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const { data, error } = await getUsers();

    if (error) {
      return res
        .status(500)
        .send({ message: "Error retrieving data from the database." });
    }

    res.json({ users: data });
  } catch (error) {
    console.error("Error retrieving data from the database:", error);
    res
      .status(500)
      .send({ message: "Error retrieving data from the database." });
  }
};
