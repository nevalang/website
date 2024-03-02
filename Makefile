.PHONY: prod
prod:
	@hugo

.PHONY: dev
dev:
	@hugo server clean --disableFastRender --logLevel info