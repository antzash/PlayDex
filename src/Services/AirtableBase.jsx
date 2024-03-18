// AirtableBase.jsx

import Airtable from "airtable";

const AirtableBase = new Airtable({
  apiKey:
    "patIYvoZHW065FUJY.d51a77f3370e4fbbb7acbdc5705e19670ef3fccc073ab702a84c655a97f8edca",
}).base("appj5w7yJ6SBxrbjv");

// Function to add games to airtable
const addGameToAirtable = async (game, status) => {
  try {
    await AirtableBase("Wishlist").create([
      {
        fields: {
          "Game Name": game.name,
          Status: status,
          "Background Image": game.background_image,
          "Parent Platforms": game.parent_platforms
            .map((platform) => platform.platform.name)
            .join(", "), // Add this line
        },
      },
    ]);
    console.log("Game added to Airtable:", game.name);
  } catch (error) {
    console.error("Error adding game to Airtable:", error);
  }
};

// Function to fetch games from Airtable
const fetchGamesFromAirtable = async () => {
  try {
    const records = await AirtableBase("Wishlist").select().all();
    return records.map((record) => ({
      id: record.id,
      name: record.get("Game Name"),
      status: record.get("Status"),
      background_image: record.get("Background Image"),

      // Add other fields as necessary
    }));
  } catch (error) {
    console.error("Error fetching games from Airtable:", error);
    return [];
  }
};

// Function to remove game from Airtable
const removeGameFromAirtable = async (recordId) => {
  try {
    await AirtableBase("Wishlist").destroy(recordId);
    console.log("Game removed from Airtable:", recordId);
  } catch (error) {
    console.error("Error removing game from Airtable:", error);
  }
};

// Function to update a game's status in Airtable
const updateGameStatusInAirtable = async (recordId, newStatus) => {
  try {
    await AirtableBase("Wishlist").update(recordId, {
      Status: newStatus,
    });
    console.log("Game status updated in Airtable:", recordId);
  } catch (error) {
    console.error("Error updating game status in Airtable:", error);
  }
};

export {
  addGameToAirtable,
  fetchGamesFromAirtable,
  removeGameFromAirtable,
  updateGameStatusInAirtable,
};
