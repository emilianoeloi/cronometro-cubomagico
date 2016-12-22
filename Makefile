setup:
	npm install
test:
	npm test
run:
	npm start
deploy:
	npm run build; firebase deploy
