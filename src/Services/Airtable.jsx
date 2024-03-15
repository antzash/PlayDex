const AIRTABLE_API_KEY = 'your_airtable_api_key';
const AIRTABLE_BASE_ID = 'your_airtable_base_id';
const AIRTABLE_TABLE_NAME = 'your_airtable_table_name';

const airtableService = {
 addGameToWishlist: async (game) => {
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          // Add the fields you want to store for the game
          'Game Name': game.name,
          // ... other fields
        }
      })
    });
    const data = await response.json();
    return data;
 },

 getWishlistedGames: async () => {
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`
      }
    });
    const data = await response.json();
    return data.records;
 },

 // Add other methods as needed, such as removeGameFromWishlist
};

export default airtableService;