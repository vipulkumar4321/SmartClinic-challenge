const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.URL;
const supabaseKey = process.env.KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Insert users into the database
exports.insertUsers = async (users) => {
  try {
    const { data, error } = await supabase.from("users").insert(users);

    return { data, error };
  } catch (error) {
    console.error("Database error:", error);
    return { error };
  }
};

// Get users from the database
exports.getUsers = async () => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, phones, creation_date");

    return { data, error };
  } catch (error) {
    console.error("Database error:", error);
    return { error };
  }
};
