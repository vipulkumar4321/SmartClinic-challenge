const express = require("express");
const app = express();
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
const multer = require("multer");
const csvParse = require("csv-parse");

app.use(cors());

// Configure multer to handle file upload in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const supabaseUrl = "https://qopldjkdnxzevntbibra.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvcGxkamtkbnh6ZXZudGJpYnJhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjYyNzQ2MiwiZXhwIjoyMDQyMjAzNDYyfQ.fLr5TIQQJjErsGyYLZnsPkfq_pF9EIUwl6m2vwgtIKc";
const supabase = createClient(supabaseUrl, supabaseKey);

app.post("/users/upload", upload.single("file"), async (req, res) => {
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
          return; // Skip the first row with headers
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
          creation_date: creationDate, // Adding formatted creation date
        };
      });

      try {
        const { data: insertedUsers, error } = await supabase
          .from("users")
          .insert(data);

        if (error) {
          console.error("Error inserting data into the database:", error);
          return res
            .status(500)
            .send({ message: "Error inserting data into the database." });
        }

        res.send({ message: "File uploaded and data inserted successfully." });
      } catch (error) {
        console.error("Database error:", error);
        res.status(500).send({ message: "Database error." });
      }
    });

    parser.on("error", (error) => {
      console.error("CSV parsing error:", error);
      res.status(500).send({ message: "Error parsing CSV file." });
    });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send({ message: "Error processing file." });
  }
});

app.get("/users", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, phones, creation_date");

    if (error) {
      console.error("Error retrieving data from the database:", error);
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
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
