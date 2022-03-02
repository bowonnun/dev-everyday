import client from '../components/Apollo/apolloClient'
import gql from 'graphql-tag'

const CHECKOUT_MUTATION = gql`
mutation ($input: CreateOrderInput!) {
    createOrder(input: $input) {
      clientMutationId
      order {
        id
        orderId
        refunds {
          nodes {
            amount
          }
        }
        shipping {
          address1
          address2
          city
          company
          country
          email
          firstName
          lastName
          phone
          postcode
          state
        }
        billing {
          address1
          address2
          city
          company
          country
          email
        }
        lineItems {
          nodes {
            product {
              id
              name
              description
              type
              onSale
              
              slug
              image {
                id
                sourceUrl
                altText
              }
            }
            variation {
              id
              variationId
              name
              description
              type
              onSale
              price
              regularPrice
              salePrice
              image{
                id
                sourceUrl
                altText
              }
              attributes {
                nodes {
                  id
                  attributeId
                  name
                  value
                }
              }
            }
            quantity
          }
        }
        couponLines {
          nodes {
            discount
            code
          }
        }
        shippingLines {
          nodes {
            orderId
            total
            methodTitle
          }
        }
        customerNote
        subtotal
        discountTotal
        total
        date
        hasShippingAddress
      }
    }
  }
`;

export default CHECKOUT_MUTATION;