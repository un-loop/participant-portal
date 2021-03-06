export const questions = [
  'Understands the Big Picture of the Full Stack',
  'JavaScript Fundamentals',
  'Understands Version Control',
  'React Core Competencies',
  'NodeJs Core Competencies',
  'Database Core Competencies',
  'Problem Solving: Whiteboarding',
];

export const questionContent = [
  [
    'Describe the roles of Html,Javascript, and CSS in a webpage.',
    'What distinguishes a web application from a static webpage?',
    'In a full stack web application, what is the client-side code typically responsible for? The server side code?',
    'Name a few ways in which data can be sent to a server from a web browser.',
    'What frameworks might be used on the client to help manage modifying the DOM?',
    'What technologies might be used on the server to deliver web pages to the browser?',
  ],
  [
    'Explain the difference between var, let, and const?',
    'What is a closure?',
    'What is a prototype?',
    'How are apply, call, and bind methods on the function prototype used? Why would you use them?',
    'In a class method, what does "this" keyword refer to? In a top-level function?',
    'What is an anonymous function? An arrow function? What is "this" in each?',
  ],
  ['What is Git?', 'What are some advantages of using Git?'],
  [
    'What is a component?',
    'Name two ways you might define a component?',
    'Compare component properties versus state? How is each modified?',
    'What do we mean by the lifecycle" of a component? Talk about some lifecycle methods and what they are used for.',
  ],
  [
    'What is a module?',
    'How does a module expose its public interface?',
    'Are there different kinds of interfaces a module can expose?',
    'When/how is asynchronous code executed? (getting at the event loop)',
  ],
  [
    'Describe the difference between a relational DB and a json store such as Mongo.',
    'Describe the use of keys in both.',
    'How are relations between tables/collections established in either?',
    'Write a SQL query to return the top 5 results from a “People” table, sorted alphabetically by name, selecting “Name”, “Dob”, and “Email” fields.',
  ],
  [
    'Write a function in pseudocode that will format a string.',
    'It will take in two parameters, a format string, and an array of string replacements.',
  ],
];

export const rubricItems = [
  [
    '1) The student articulates that there are different technologies with varied roles, can name the technologies involved with different roles, but struggles to decide what technology or role is involved in a particular domain. Also struggles with understanding how the technologies fit together.',
    '2) While they may recognize technologies, the student cannot articulate roles of varying technologies, let alone be able to decide what technology to use for a particular need or how it fits into the bigger picture.',
    '3) The student articulates the varied technologies in a web stack, their roles, the roles of the client and server, how these technologies/roles fit together and can (mostly) decided where to implement varied needs such as authorization, validation, persistence, etc.',
  ],

  [
    '1) Does not understand core javascript concepts. May be able to say what is output in the sample code, but does not have an understanding of why. Does not know about classes/prototypes.',
    '2) Understands scope and this binding. May not know the hoisting difference between var and let, but knows what hoisting is. May not know closure or be able to articulate the concept (function plus context), but understands captured variables. Understands object encapsulation via classes/prototypes, but may not understand inheritance or clearly articulate the concepts.',
    '3) Can clearly articulate hoisting, scope, closures. Knows the role of “this” and can describe the value under varied circumstances. Knows OOP and FP features. May be squishy on the “...” operator, but recognizes it and has an idea of its use.',
  ],

  [
    '1) Does not understand the role of Git nor CD.',
    '2) Understands the role of Git but is fuzzy on the nature/purpose of continuous deployment',
    '3) Understands that git is a version control system (should use this exact term) in order to manage the history of versions of a code/package/repository',
  ],

  [
    '1) Fails to understand any of: what a component is, that there are lifecycle methods, what the difference between props and state is, or how to hook up an event callback',
    '2) Understands what components are and has an idea of their lifecycle. Has limited understanding of managing state, data binding, callbacks, and state lifting.',
    '3) Has a solid grasp of components, how to manage state, component lifecycle, event callbacks, and lifting state. May not fully understand state management, but does understand that it’s immutable though may not know the word.',
  ],

  [
    '1) Does not understand patterns. May know that async is code executed concurrently at a (possibly) later time, but does not know how and cannot write asynchronous code or identify when code is asynchronous.',
    '2) Has an understanding of modules, async code, and node-core. May miss that these are patterns established by Node’s runtime environment, may not be able to enumerate async methods or fully grasp when it runs.',
    '3) Is able to describe various methods of declaring async code and can describe when they run. Understands what EventEmitters and streams are and how to use them. Begins',
  ],

  [
    '1) Does not understand how data is organized in a database.',
    '2) Understands organization of data and relations between data entities in databases.',
    '3) Knows the difference between organization of data in document stores and relational DBs. Can successfully write a basic SQL query. Has a notion of ACID principles and how that relates to transactions.',
  ],

  [
    '1) Can’t arrive at a solution that even remotely prints out what’s required, even with subtle proctor hints and intervention.',
    '2) Gives a plausible solution but may have remaining bugs even after some hinting.',
    '3) Gives a correct solution with no bugs (eventually). If their solution started with bugs, can figure out that those bugs exist.May have bugs initially but ought to be able to test their functions by walking through line by line with mock data and find the bugs.',
  ],
];
