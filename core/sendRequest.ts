import axios from 'axios'

// const GRAPHQL_API = "http://localhost:5000/graphql"
// const GRAPHQL_API = "https://pne-eshop-api-v2.azurewebsites.net/graphql" 

const GRAPHQL_API = "https://pne-eshop-api-v3.azurewebsites.net/graphql" 

export const sendRequest = async (query: string) => {
  
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      "Access-Control-Allow-Origin": '*', 
      "Authorization": token ? `Bearer ${ token }` : ""
    }
  }

  try {
    const queryResult = await axios.post(
      GRAPHQL_API,
      {
        query: query
      },
      {
        headers: config.headers
      }
    )
  
    return queryResult.data.data
  
  } catch (error) {
    console.error(error)
    return null
  }
}