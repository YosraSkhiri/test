## challenges

* Can't use filter field since is not defined by type PageQueryOptions, the API doesn't support filtering directly by partial text matching (like _like or _contains), that's why I had to fetch all posts and filter them on the server.
```
{
  "error": {
    "errors": [
      {
        "message": "Field \"filter\" is not defined by type \"PageQueryOptions\".",
        "locations": [
          {
            "line": 2,
            "column": 19
          }
        ],
        "extensions": {
          "code": "GRAPHQL_VALIDATION_FAILED"
        }
      }
    ]
  }
}
 ```

* Post doesn't have a date field in its scheme 
```
type Post {
  id: ID
  title: String
  body: String
  user: User
  comments(options: PageQueryOptions): CommentsPage
}
```

## how run the project
1. clone repo
2. npm i
3. npm run dev