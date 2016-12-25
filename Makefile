setup:
	npm install
test-update:
	npm test -- -u
test:
	npm test
run:
	npm start
deploy:
	npm run build; firebase deploy
