build-client:
	cd client; npm run build

copy-client:
	mv client/build/* server/public

build-and-copy: build-client copy-client

install-dependencies-client:
	cd client; npm install

install-dependencies-server:
	cd server; npm install

build-prod: install-dependencies-client build-client
	rm -rf deploy
	mkdir deploy
	cp -r server/* deploy/
	mv client/build/* deploy/public/
	cd deploy; npm install
