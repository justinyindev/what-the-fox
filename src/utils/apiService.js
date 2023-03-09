import { GraphQLClient } from "graphql-request";

const endpoint = `${process.env.REACT_APP_API}/graphql`;

export const getHeadlines = async (startDate, endDate, page, limit) => {
  const client = new GraphQLClient(endpoint);
  if (startDate && endDate) {
    startDate = new Date(startDate).toISOString();
    endDate = new Date(endDate).toISOString();
  }

  const query = `
  query GetHeadlines($startDate: String, $endDate: String, $page: Int, $limit: Int) {
    headlines(startDate: $startDate, endDate: $endDate, page: $page, limit: $limit) {
      headlines {
        _id
        title
        url
        date
        image
        summary
      }
      pageInfo {
        currentPage
        totalPages
      }
    }
  }
`;

  const variables = {
    startDate,
    endDate,
    page,
    limit
  };

  const data = await client.request(query, variables);
  return data.headlines;
};
