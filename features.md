- User register
- user login
- user profile page with: whatever data
- homepage
- index view of something
- detail view of something
- crud operations
- one to many relationship - example: comments
- many to many relationship - example: category


User stories:
1. I login/register
2. i can see my account
3. my account show what?:
  -food log history
    - table
    - chart (base line for healthy intake)



Food log
X1. enter food (dropdown with real time search) ONLY SINGLE ENTRY
X2. portion (grams)
X3. date (date)

then we can combine by day and display daily total (weekly, monthly)


We have a fixed (mvp) standard intake
Add weight model and ability
add floating plus button to add new log entry

X portion unit conditional on the type of food - replaced with portion helper data, showing how much in grams

X add history button to navbar and history page with just all logs listed in descending order
X for that we will need get all logs view and the get single(for edit)


X add view to food model in order to get names and id for front end selector
X when component mounts (create or edit log) run api request to get table of all foods
X user selects name and selection gives us id.


TODO:
- my account
  - layout
  - chart
X secure route
X replace requests with token from Auth
X navbar burger
X logout functionality
- table rows - links to log edit
- add datetime field to log entry
- log edit form
- log history multiply by portion
- register component extra details
- change models to restrict empty entries
- handle errors after models restriction
- add standard diet values
- styling:
  - logo
  - fonts
  - slogan 
  - style register
  - style 
- refactor and de-structure
- remove console.logs