build:
	webpack --config webpack.config.js

lint:
	eslint --ext .js,.ts . --fix

style:
	sass --watch sass:css