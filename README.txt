To run the program, you may need:
  1. Visual Studio Code
  2. docker
  3. Install NodeJS
    - nvm install 12
    - nvm alias default 12

When download the source code, you may need to run the following commands:
  npm install
  docker-compose up -d
  npm run watch
  npm run watch:web

Other commands:
npm run gen  <-- auto generating the type of functions nad variables from api.ts and SQL tables,
				There would be some error but you should mannually modify the file(schema.types.ts) 
				In schema.types.ts, there will be errors in the lines of "IsTypeOfResolverFn".
				The error would say it allows only one argument but there will be two.
        so that manually remove arguments except ParentType.

docker-compose down
			<-- when modify typeORM or schema.*** files, should compose "down" with the command
				 and then "up" (docker-compose up -d)


When running the code in Visual Studio Code, connecting the page with localhost:3005 in Chrome

1. Login page - there are pre-made accounts from '/server/src/db/migrations/V1.4__Add_user.sql',
				a user can login with one of the accounts from the table
2. Public chat - the public chat is allowing to communicate other people.
		in each user's input, the bad words will be monitored.
		If multiple verbal abuses have been done multiple times(6 times),
		a user will be banned from the chat.
		Also, there are two features: emoji and each user' chat history.
		emoji buttons provide users to be able to use multiple emojis in the chat
		chat history button for each user is that it displays only a chosen user's chat history.



SQL tables:
	User    - (join relation between chat and badwordpattern); both are oneToMany
	Chat    -  all users' chat history is saved into the table
	bad_Word_Pattern - bad words' patterns are saved into the table. 
	emoji
