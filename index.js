console.log('hello world');
// Define the GraphQL query
const query = `
query($number: Int!){
  teamByNumber(number:$number) {
    schoolName
  }
}
`;
// Define variables for the query
const variables = {
  number: 23381 // Replace with the desired team number
};

// Define the endpoint and optional headers (adjust Authorization if needed)
const endpoint = 'https://api.ftcscout.org/graphql'; // Replace with the actual endpoint
const headers = {
  'Content-Type': 'application/json',
};

async function fetchData() {
  try {
    // Make the request to the GraphQL API
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ query, variables })
    });

    // Parse the response
    const result = await response.json();

    // Check for errors
    if (result.errors) {
      console.error('Errors:', result.errors);
    } else {
      // Log the data
      console.log('Data:', result.data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the function
fetchData();
