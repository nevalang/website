.PHONY: prod
prod:
	@hugo

.PHONY: dev
dev:
	@hugo server --logLevel info