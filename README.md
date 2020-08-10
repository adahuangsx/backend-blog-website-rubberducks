The front-end pages are in https://glitch.com/~react-frontend ~

1. GET /user<br>
   get all user information

2. GET /user/:userId<br>
   get a user's information

3. PATCH /user/:userId<br>
   update a user's information

4. PATCH /user/:userId/follow/:followingId<br>
   let a user follow another user

5. PATCH /user/:userId/unfollow/:followingId<br>
   let a user unfollow another user

6. GET /user/:userId/isfollowing/:followingId<br>
   check whether a user is following another user

7. POST /signup<br>
   body:{
   <br>"\_id",
   <br>"password",
   <br>"nickname",
   <br>"description",
   <br>"amdin",
   <br>"avatarURL"
   }<br>
   register a new user

8. GET /signup<br>
   go to signup page

9. POST /login<br>
   body:{
   <br>"\_id",
   <br>"password"
   }<br>
   log in to the website

10. GET /login<br>
    go to login page

11. GET /user/recommendedBlogs<br>
    get the recommended blogs in which the user might be interested

12. GET /blogs<br>
    retrieve all blogs in the blog list

13. Get /blogs/{id} <br>
    retrieve specific blog according to id

14. Post /blogs <br>
    Create new blog

15. Put /blogs/{id} <br>
    Edit blogs with such id

16. Delete /blogs/{id} <br>
    Delete blogs with id
