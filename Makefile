build:
	cd contracts;sozo build;
	cp contracts/target/dev/manifest.json web/src/manifest.json;
	node web/src/generateComponents.cjs;
	cp web/src/output.ts web/src/dojo/contractComponents.ts

test:
	cd contracts; sozo test

prep_web:
	cd web; cp .env.example .env

start_container:
	docker compose up -d

stop_container:
	docker compose down

# Update version
# Get the latest tag
VERSION=$(shell git describe --tags --abbrev=0 2>/dev/null | sed 's/^v//')

# Define the version type (major, minor, patch)
type ?= patch

# Increment the version based on the version type
NEW_VERSION=$(shell echo $(VERSION) | awk -F. -v type=$(type) 'BEGIN {OFS = FS} \
    {if (type == "major") {$$1=$$1+1; $$2=0; $$3=0} else if (type == "minor") {$$2=$$2+1; $$3=0} else if (type == "patch") $$3=$$3+1} \
    {print $$1"."$$2"."$$3}')

# To use tag make push-tag
# type=patch for patch version, type=minor for minor version, type=major for major version
push-tag:
	echo v$(VERSION) to v$(NEW_VERSION)
	# Create a new tag
	git tag v$(NEW_VERSION)

	# Push the tag to the remote repository
	git push origin v$(NEW_VERSION)




