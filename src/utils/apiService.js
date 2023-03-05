import { GraphQLClient } from "graphql-request";

const endpoint = `${process.env.REACT_APP_API}/graphql`;

export const getHeadlines = async (startDate, endDate) => {
  const client = new GraphQLClient(endpoint);
  if (startDate && endDate) {
    startDate = new Date(startDate).toISOString();
    endDate = new Date(endDate).toISOString();
  }

  const query = `
    query GetHeadlines($startDate: String, $endDate: String) {
      headlines(startDate: $startDate, endDate: $endDate) {
        _id
        title
        url
        date
        image
        summary
      }
    }
  `;

  const variables = {
    startDate,
    endDate,
  };

  const data = await client.request(query, variables);
  return data.headlines;
};

export const getSummary = async (title, url) => {
  const client = new GraphQLClient(endpoint);

  const query = `
    query GetSummary($title: String, $url: String) {
      summary(title: $title, url: $url) {
        _id
        title
        url
        date
        image
        summary
      }
    }
  `;

  const variables = {
    title,
    url,
  };
  const data = await client.request(query, variables);
  return data.summary;
};
