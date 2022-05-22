import { gql } from "@apollo/client";

// write a GraphQL query for all countries

const paises = gql`
{
  countries {
    code
    capital
    name
    phone
    currency
    continent{
      name
    }
    languages{
      name
    }
  }
}
`




export default paises
