all:
	npm run build:prod

upload:
	scp -rp dist  root@39.100.105.120:/data/Freemasonry/  
