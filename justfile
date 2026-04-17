install:
    bun install

update:
    bun update --latest

dev:
    bun run dev

check:
    bun run check

format:
    bun run format

lint:
    bun run lint

test:
    bun run test

build:
    bun run build

preview:
    bun run preview

add PACKAGE:
    bun add {{ PACKAGE }}

remove PACKAGE:
    bun remove {{ PACKAGE }}
