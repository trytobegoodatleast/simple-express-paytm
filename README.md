
# Build a basic version of PayTM

## Backend

### Signup (Registering a User)
- Validate input.
- Check if the username already exists.
- Hash the password.
- Store the user in the database.
- No token is generated here.
- Respond with a success message.

### Sign-In (Authenticating a User)
- Validate input.
- Find the user in the database.
- Compare the hashed password with the entered password.
- If correct, generate a token and send it to the user.
- The user can now use this token for protected routes (e.g., fetching profile data).

### Auth Middleware (Protecting Routes)
- Check for Token – Look at the request headers to see if a token is provided.
- Validate Format – Ensure the token starts with "Bearer " (correct format).
- Extract Token – Remove "Bearer " and get the actual token.
- Verify Token – Use jwt.verify() to check if the token is valid.
- Allow or Deny Access – If valid, add userId to req and continue; if not, return an error.
- Extract userId from the decoded token