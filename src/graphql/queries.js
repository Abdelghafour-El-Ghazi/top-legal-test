import { gql } from "@apollo/client";

export const COMMITSQUERY = gql`
  query repository($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            history(first: 100) {
              edges {
                cursor

                node {
                  id
                  pushedDate
                  oid
                  parents(first: 1) {
                    nodes {
                      oid
                    }
                  }
                  author {
                    name
                    avatarUrl
                    date
                    email
                    user {
                      login
                    }
                  }
                  committedDate
                  message
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const MORECOMMITSQUERY = gql`
  query repository($name: String!, $owner: String!, $cursor: String) {
    repository(name: $name, owner: $owner) {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            history(first: 100, after: $cursor) {
              edges {
                cursor
                node {
                  id
                  pushedDate
                  oid
                  parents(first: 1) {
                    nodes {
                      oid
                    }
                  }
                  author {
                    name
                    avatarUrl
                    date
                    email
                    user {
                      login
                    }
                  }
                  committedDate
                  message
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const USERQUERY = gql`
  query user($login: String!) {
    user(login: $login) {
      bio
      avatarUrl
      company
      followers {
        totalCount
      }
      following {
        totalCount
      }
      location
      name
      repositories {
        totalCount
      }
      createdAt
    }
  }
`;

export const ONECOMMITQUERY = gql`
  query node($id: ID!) {
    node(id: $id) {
      ... on Commit {
        author {
          avatarUrl
          name
          user {
            login
          }
        }
        oid
        parents(first: 1) {
          nodes {
            oid
          }
        }
        message
        changedFiles
        deletions
        url
        committedDate
        pushedDate
        additions
      }
    }
  }
`;
