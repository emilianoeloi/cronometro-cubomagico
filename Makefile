setup:
	npm install
test:
	npm test
run:
	yarn start
deploy:
	yarn run build; firebase deploy
