# Quick Install and Development Setup
[default]
[private]
install-dev: install dev

[no-cd]
[private]
@sfw_wrap mode +command:
    if [ "{{ mode }}" = "safe" ] || [ "{{ mode }}" = "--safe" ]; then \
        sfw {{ command }}; \
    else \
        {{ command }}; \
    fi

alias i := install

# Install dependencies (protected)
[group('Bun Recipies')]
install mode="safe":
    @just sfw_wrap {{ mode }} "bun install"

alias up := update

# Update to latest dependencies (protected)
[group('Bun Recipies')]
[group('Featured')]
update mode="safe":
    @just sfw_wrap {{ mode }} bun update --latest

alias a := add

# Add a new package (protected)
[group('Bun Recipies')]
add PACKAGE mode="safe":
    @just sfw_wrap {{ mode }} "bun add {{ PACKAGE }}"

alias rm := remove

# Remove a package (protected)
[group('Bun Recipies')]
remove PACKAGE mode="safe":
    @just sfw_wrap {{ mode }} "bun remove {{ PACKAGE }}"

# Start Vite development server
[group('Featured')]
[group('Web')]
dev port="3000":
    bunx --bun vite dev --port {{ port }}

# Run type checking and linting
[group('Code Quality')]
check:
    biome check

# Run code formatting
[group('Code Quality')]
format +mode="write":
    @if [ "{{ mode }}" = "write" ]; then \
        biome format --write; \
    elif [ "{{ mode }}" = "check" ]; then \
        biome format; \
    else \
        biome format {{ mode }}; \
    fi

# Run linting
[group('Code Quality')]
lint:
    biome lint

# Run Code Quality Suite
[group('Code Quality')]
[group('Featured')]
quality: format lint

# Run tests with Vitest - Note: there are currently no tests
[group('Testing')]
vitest:
    vitest run

# Run Vite build
[group('Testing')]
[group('Web')]
build:
    bun run build

# Start build in preview mode - Automatically builds the server
[group('Testing')]
[group('Web')]
preview: build
    bun run preview
