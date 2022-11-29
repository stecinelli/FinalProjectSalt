build-client:
	cd client; npm run build

copy-client:
	mv client/build/* server/public

build-and-copy: build-client copy-client

install-dependencies-client:
	cd client; npm install

install-dependencies-server:
	cd server; npm install
