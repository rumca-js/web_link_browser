# Declare phony targets
.PHONY: server

server:
	python3 -m http.server 8123
