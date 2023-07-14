# NBC-DVD
*If you want to watch Frozen on DVD, you gotta get some Monsta Cables. Gold Plated. D-V-D, baby!*
    —Jimmy Fallon

This is the programming assignment given to me by the good folks at NBC Universal to see if I can follow the given instructions

## Overall Page Requirements
  Create a React site that has the following pages:
  - Home Page
  - Details Page
  - List Page

The site should be able to navigate between **Home** and **List** through a _nav bar_. 

### Home Page
  The Home page should show the following:
  - Feature DVDs from the JSON
    - Feature products will show name and image.
    - Display imaged in a carousel
  - A user should be able to click the feature product and go to the detail page.
  - A user should also be able to navigate to the List page.

### Detail Page
  - The list should be filterable:
    - All items
    - By category
  - The list should be sortable:
    - By category
    - Alphabetically by title
  - If the query string ?admin=true is added, the user should see:
    - A button next to each DVD that allows me to delete.
    - A link to Add at the top of the list that opens a modal to and allows me to add a new dvd to the list
      - The inputs will be:
        - Name (String)
        - Category (String)
        - Featured (boolean)
    
