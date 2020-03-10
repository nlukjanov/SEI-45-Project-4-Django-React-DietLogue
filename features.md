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

X for that we will need get all logs view and the get single(for edit)

TODO:
X user selects name and selection gives us id.
X when component mounts (create or edit log) run api request to get table of all foods
X add view to food model in order to get names and id for front end selector
X add history button to navbar and history page with just all logs listed in descending order
X portion unit conditional on the type of food - replaced with portion helper data, showing how much in grams
X my account
  X layout
  - chart

X secure route
X replace requests with token from Auth
X navbar burger
X logout functionality
X table rows - links to log edit
X add datetime field to log entry
X log edit form
X log history multiply by portion
X register component extra details
X change models to restrict empty entries
X handle errors after models restriction
X add standard diet values  
X add diet depending on age
- add baseline for healthy daily intake
- footer
X styling:
  X logo
  - fonts
  X slogan 
  X style register
- refactor and de-structure
X remove console.logs
- replace moment js with something lighter or built myself
- refactor new and edit component to separate form
X style table rows to show as link
