const quizData = [{
    "category": "Programing",
    "question": "What is the output of 'typeof NaN'?",
    "correct_answer": "number",
    "difficulty": "medium",
    "incorrect_answers": [
        "undefined",
        "string",
        "object"
    ],
    "type": "multiple"
},
{
    "category": "Programing",
    "question": "Which method is used to convert a JSON string into a JavaScript object?",
    "correct_answer": "JSON.parse()",
    "difficulty": "easy",
    "incorrect_answers": [
        "JSON.stringify()",
        "JSON.object()",
        "JSON.convert()"
    ],
    "type": "multiple"
},
{
    "category": "Programing",
    "question": "What will be the output of 'console.log(0.1 + 0.2 === 0.3)'?",
    "correct_answer": "false",
    "difficulty": "medium",
    "incorrect_answers": [
        "true",
        "undefined",
        "NaN"
    ],
    "type": "multiple"
},
{
    "category": "Programing",
    "question": "'useEffect' is used for what purpose in React?",
    "correct_answer": "'Side effects in functional components'",
    "difficulty": "medium",
    "incorrect_answers": [
        "'Managing state'",
        "'Rendering components'",
        "'Handling events'"
    ],
    "type": "multiple"
},
{
    "category": "Programing",
    "question": "'What is JSX?'",
    "correct_answer": "'A syntax extension for JavaScript'",
    "difficulty": "easy",
    "incorrect_answers": [
        "'A JavaScript library'",
        "'A CSS framework'",
        "'A type of HTML'"
    ],
    "type": "multiple"
},
{
    "category": "Programing",
    "question": "'What does the 'key' prop do in React?'",
    "correct_answer": "'Helps identify which items have changed'",
    "difficulty": "medium",
    "incorrect_answers": [
        "'Sets the component's ID'",
        "'Defines the component's style'",
        "'Controls the component's visibility'"
    ],
    "type": "multiple"
},
{
    "category": "Programing",
    "question": "'Which HTML element is used to define an unordered list?'",
    "correct_answer": "<ul>",
    "difficulty": "easy",
    "incorrect_answers": [
        "<ol>",
        "<li>",
        "<list>"
    ],
    "type": "multiple"
},
{
    "category": "Programing",
   "question":"What does the <meta> tag represent in HTML?", 
   "correct_answer":"Metadata about the HTML document", 
   "difficulty":"medium", 
   "incorrect_answers":[ 
      "Defines the main content", 
      "Links external stylesheets", 
      "Creates a navigation menu" 
   ], 
   "type":"multiple" 
},
{
   "category":"Programing", 
   "question":"Which attribute is used to specify an image's source?", 
   "correct_answer":"src", 
   "difficulty":"easy", 
   "incorrect_answers":[ 
      "href", 
      "link", 
      "alt" 
   ], 
   "type":"multiple" 
},
{
   "category":"Programing", 
   "question":"What property is used to change the background color in CSS?", 
   "correct_answer":"background-color", 
   "difficulty":"easy", 
   "incorrect_answers":[ 
      "bgcolor", 
      "color", 
      "background" 
   ], 
   "type":"multiple" 
},
{
   "category":"Programing", 
   "question":"Which CSS property controls the text size?", 
   "correct_answer":"font-size", 
   "difficulty":"easy", 
   "incorrect_answers":[ 
      "text-size", 
      "text-style", 
      "font-weight" 
   ], 
   "type":"multiple" 
},
{
   "category":"Programing", 
   "question":"What does 'flex-direction: column;' do in CSS Flexbox?", 
   "correct_answer":"Arranges items vertically", 
   "difficulty":"medium", 
   "incorrect_answers":[ 
      "Arranges items horizontally", 
      "Makes items wrap", 
      "Increases item spacing" 
   ], 
   "type":"multiple"
},
{
     "category":"Programing",  
     "question":"What file is used to define routes in Next.js?",  
     "correct_answer":"pages/index.js",  
     "difficulty":"easy",  
     "incorrect_answers":[  
         "pages/app.js",  
         "/routes/index.js",  
         "/src/pages.js"
     ],
     "type":"multiple"
},
{
     "category":"Programing",  
     "question":"'getStaticProps' is used for what purpose?",  
     "correct_answer":"'Fetching data at build time'",  
     "difficulty":"hard",  
     "incorrect_answers":[  
         "'Fetching data on client-side'",  
         "'Fetching data at runtime'",  
         "'Fetching data on server-side'"
     ],
     "type":"multiple"
},
{
     "category":"Programing",  
     "question":"'What is a Static Site Generation (SSG)?'",  
     "correct_answer":"'Pre-rendering pages at build time'",  
     "difficulty":"medium",  
     "incorrect_answers":[  
         "'Dynamic rendering on each request'",  
         "'Client-side rendering only'",  
         "'Server-side rendering only'"
     ],
    "type":"multiple"
},
{
    "category": "Programing",
    "question": "What does the <meta> tag provide in an HTML document?",
    "correct_answer": "Metadata about the document",
    "difficulty": "easy",
    "incorrect_answers": [
        "Styling for the document",
        "Content structure",
        "Interactive features"
    ],
    "type": "multiple"
},
{
    "category": "Programing",
    "question": "What does the 'z-index' property do in CSS?",
    "correct_answer": "Controls the stack order of elements",
    "difficulty": "medium",
    "incorrect_answers": [
        "Sets the transparency of an element",
        "Adjusts the element's position",
        "Defines the size of an element"
    ],
    "type": "multiple"
},
{
    "category": "Programing",
    "question": "What is a closure in JavaScript?",
    "correct_answer": "A function that remembers its lexical scope even when executed outside of it",
    "difficulty": "hard",
    "incorrect_answers": [
        "A loop with a defined scope",
        "A function executed immediately",
        "A function without parameters"
    ],
    "type": "multiple"
},
{
    "category": "Programing",
    "question": "Which data structure is used to implement a queue in Python?",
    "correct_answer": "Collections.deque",
    "difficulty": "medium",
    "incorrect_answers": [
        "List",
        "Set",
        "Dictionary"
    ],
    "type": "multiple"
},
{
    "category": "Programing",
    "question": "Which command is used to create a new database in PostgreSQL?",
    "correct_answer": "CREATE DATABASE",
    "difficulty": "easy",
    "incorrect_answers": [
        "NEW DATABASE",
        "ADD DATABASE",
        "INIT DATABASE"
    ],
    "type": "multiple"
},
{
    "category": "Programing",
    "question": "What does the 'useEffect' hook do in React?",
    "correct_answer": "Performs side effects in function components",
    "difficulty": "medium",
    "incorrect_answers": [
        "Manages component state",
        "Handles component rendering",
        "Fetches data on the server"
    ],
    "type": "multiple"
},
{
    "category": "Programing",
    "question": "What is the purpose of 'getServerSideProps' in Next.js?",
    "correct_answer": "Fetching data at request time",
    "difficulty": "hard",
    "incorrect_answers": [
        "Fetching data at build time",
        "Fetching data in the client browser",
        "Fetching data on a CDN"
    ],
    "type": "multiple"
},
{
    "category": "Programing",
    "question": "What does the 'render()' function do in Django?",
    "correct_answer": "Renders an HTML template with a context dictionary",
    "difficulty": "medium",
    "incorrect_answers": [
        "Handles HTTP requests",
        "Defines URL patterns",
        "Creates a database model"
    ],
    "type": "multiple"
},
{
    "category": "HTML",
    "question": "What is the purpose of the <a> tag in HTML?",
    "correct_answer": "To create hyperlinks",
    "difficulty": "easy",
    "incorrect_answers": [
        "To create a paragraph",
        "To add images",
        "To style text"
    ],
    "type": "multiple"
},
{
    "category": "HTML",
    "question": "Which attribute is used to uniquely identify an element in HTML?",
    "correct_answer": "id",
    "difficulty": "easy",
    "incorrect_answers": [
        "class",
        "name",
        "data"
    ],
    "type": "multiple"
},
{
    "category": "CSS",
    "question": "Which property is used to change the background color of an element?",
    "correct_answer": "background-color",
    "difficulty": "easy",
    "incorrect_answers": [
        "color",
        "background-style",
        "background-image"
    ],
    "type": "multiple"
},
{
    "category": "CSS",
    "question": "What does the 'flex' property in CSS represent?",
    "correct_answer": "Flexibility of an element in a flex container",
    "difficulty": "medium",
    "incorrect_answers": [
        "Element's position",
        "Element's float behavior",
        "Element's opacity"
    ],
    "type": "multiple"
},
{
    "category": "JavaScript",
    "question": "What is 'this' keyword in JavaScript?",
    "correct_answer": "The object that is executing the current function",
    "difficulty": "medium",
    "incorrect_answers": [
        "The parent object",
        "A reference to the global object",
        "The function's return value"
    ],
    "type": "multiple"
},
{
    "category": "JavaScript",
    "question": "Which method converts a JSON string into a JavaScript object?",
    "correct_answer": "JSON.parse()",
    "difficulty": "easy",
    "incorrect_answers": [
        "JSON.stringify()",
        "Object.fromJSON()",
        "Object.parseJSON()"
    ],
    "type": "multiple"
},
{
    "category": "Python",
    "question": "Which keyword is used to define a function in Python?",
    "correct_answer": "def",
    "difficulty": "easy",
    "incorrect_answers": [
        "function",
        "define",
        "func"
    ],
    "type": "multiple"
},
{
    "category": "Python",
    "question": "What does the 'len()' function do in Python?",
    "correct_answer": "Returns the number of items in an object",
    "difficulty": "easy",
    "incorrect_answers": [
        "Returns the length of a string only",
        "Returns the data type of an object",
        "Returns the index of an item"
    ],
    "type": "multiple"
},
{
    "category": "PostgreSQL",
    "question": "Which SQL statement is used to remove rows from a table in PostgreSQL?",
    "correct_answer": "DELETE",
    "difficulty": "easy",
    "incorrect_answers": [
        "DROP",
        "REMOVE",
        "TRUNCATE"
    ],
    "type": "multiple"
},
{
    "category": "PostgreSQL",
    "question": "What is a foreign key in PostgreSQL?",
    "correct_answer": "A constraint that links two tables together",
    "difficulty": "medium",
    "incorrect_answers": [
        "A unique identifier for each record",
        "A temporary key for queries",
        "A key used to encrypt data"
    ],
    "type": "multiple"
},
{
    "category": "React",
    "question": "What does 'useState' in React do?",
    "correct_answer": "Manages state in a functional component",
    "difficulty": "easy",
    "incorrect_answers": [
        "Fetches data from an API",
        "Performs side effects",
        "Handles routing in an app"
    ],
    "type": "multiple"
},
{
    "category": "React",
    "question": "What is the virtual DOM in React?",
    "correct_answer": "A lightweight copy of the real DOM",
    "difficulty": "medium",
    "incorrect_answers": [
        "A database for storing data",
        "A real DOM element",
        "A function for updating state"
    ],
    "type": "multiple"
},
{
    "category": "Next.js",
    "question": "What is the purpose of 'getStaticPaths' in Next.js?",
    "correct_answer": "To define dynamic routes for static generation",
    "difficulty": "medium",
    "incorrect_answers": [
        "To fetch data at runtime",
        "To manage client-side routing",
        "To handle server-side rendering"
    ],
    "type": "multiple"
},
{
    "category": "Next.js",
    "question": "What is the default routing mechanism in Next.js?",
    "correct_answer": "File-based routing",
    "difficulty": "easy",
    "incorrect_answers": [
        "Component-based routing",
        "Dynamic routing only",
        "Manual configuration routing"
    ],
    "type": "multiple"
},
{
    "category": "Django",
    "question": "What is the primary purpose of Django models?",
    "correct_answer": "To define the structure and behavior of database data",
    "difficulty": "medium",
    "incorrect_answers": [
        "To handle HTTP requests",
        "To manage user authentication",
        "To render templates"
    ],
    "type": "multiple"
},
{
    "category": "Django",
    "question": "Which command is used to create a new app in Django?",
    "correct_answer": "python manage.py startapp",
    "difficulty": "easy",
    "incorrect_answers": [
        "python manage.py startproject",
        "django-admin startproject",
        "django-admin startapp"
    ],
    "type": "multiple"
},
{
    "category": "HTML",
    "question": "Which attribute specifies an alternate text for an image in HTML?",
    "correct_answer": "alt",
    "difficulty": "easy",
    "incorrect_answers": [
        "title",
        "src",
        "description"
    ],
    "type": "multiple"
},
{
    "category": "CSS",
    "question": "What does the 'position: fixed;' property do?",
    "correct_answer": "Positions an element relative to the viewport",
    "difficulty": "medium",
    "incorrect_answers": [
        "Positions an element relative to its parent",
        "Allows the element to scroll with the page",
        "Centers the element on the page"
    ],
    "type": "multiple"
},
{
    "category": "JavaScript",
    "question": "Which function is used to schedule code to run after a delay in JavaScript?",
    "correct_answer": "setTimeout()",
    "difficulty": "easy",
    "incorrect_answers": [
        "setInterval()",
        "clearTimeout()",
        "schedule()"
    ],
    "type": "multiple"
},
{
    "category": "Python",
    "question": "Which method is used to add an item to a list in Python?",
    "correct_answer": "append()",
    "difficulty": "easy",
    "incorrect_answers": [
        "add()",
        "insert()",
        "push()"
    ],
    "type": "multiple"
},
{
    "category": "PostgreSQL",
    "question": "Which command is used to view the structure of a table in PostgreSQL?",
    "correct_answer": "\\d table_name",
    "difficulty": "medium",
    "incorrect_answers": [
        "\\s table_name",
        "\\dt table_name",
        "\\table table_name"
    ],
    "type": "multiple"
},
{
    "category": "React",
    "question": "What does 'React.Fragment' do?",
    "correct_answer": "Groups a list of children without adding extra nodes to the DOM",
    "difficulty": "medium",
    "incorrect_answers": [
        "Wraps a component with a style",
        "Renders conditional content",
        "Handles errors in components"
    ],
    "type": "multiple"
},
{
    "category": "Next.js",
    "question": "Which API in Next.js enables middleware-like functionality?",
    "correct_answer": "Middleware API",
    "difficulty": "hard",
    "incorrect_answers": [
        "getInitialProps",
        "useMiddleware",
        "apiMiddleware"
    ],
    "type": "multiple"
},
{
    "category": "Django",
    "question": "What is the purpose of Django's 'Migrations'?",
    "correct_answer": "To propagate changes in models to the database schema",
    "difficulty": "medium",
    "incorrect_answers": [
        "To optimize database queries",
        "To back up database data",
        "To create new models"
    ],
    "type": "multiple"
}
]
export default quizData;