# Better Agents - Setup Complete ✅

## Repository Status

The **better-agents** repository has been successfully cloned, installed, and built!

## What is Better Agents?

Better Agents is a CLI tool and a set of standards for building AI agent projects. It helps you:
- Create production-ready agent projects with best practices
- Set up scenario testing for agent behavior
- Manage versioned prompts for team collaboration
- Configure your coding assistant (Cursor, Claude Code, Kilocode) as an expert in your chosen framework
- Instrument your agents for full observability

## Current Status

✅ **Repository cloned** from https://github.com/langwatch/better-agents  
✅ **Dependencies installed** (pnpm install)  
✅ **Project built** (dist/ folder created)  
✅ **Type checking passed** (no TypeScript errors)  
✅ **CLI tested** (help and version commands working)

## Project Structure

```
LabCast/
├── src/                    # Source TypeScript code
├── dist/                   # Built JavaScript output
├── docs/                   # Documentation
├── tests/                  # Test files
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

## How to Use

### Development Mode

Run the CLI directly from source:

```bash
pnpm dev --help
```

### Build Mode

The project has already been built. You can run:

```bash
# Run the built CLI
node dist/index.js --help
node dist/index.js --version
```

### Install Globally (Optional)

To use `better-agents` as a global command:

```bash
# Link locally for development
pnpm link --global

# Or build and publish to npm
pnpm build
```

### Initialize a New Agent Project

Once installed/linked, you can create new agent projects:

```bash
better-agents init my-agent
```

This will guide you through:
1. Selecting a programming language (Python/TypeScript)
2. Choosing an agent framework (Agno/Mastra)
3. Selecting a coding assistant (Cursor/Claude Code/Kilocode)
4. Choosing an LLM provider
5. Setting up API keys

## Available Scripts

```bash
pnpm build          # Build the project
pnpm dev            # Run in development mode
pnpm test           # Run tests
pnpm test:unit      # Run unit tests
pnpm test:e2e       # Run end-to-end tests
pnpm typecheck      # Type check without building
pnpm lint           # Lint the code
pnpm format         # Format the code
```

## Key Features

- **Agent Testing Pyramid**: Unit tests + Evaluations + Scenario simulations
- **Prompt Management**: Version-controlled prompts in YAML format
- **MCP Integration**: Model Context Protocol support for coding assistants
- **Production Ready**: Industry best practices from day one

## Requirements

- ✅ Node.js 22.20.0 (installed)
- ✅ pnpm 10.15.0 (installed)
- ⚠️ API Keys needed when using:
  - LLM Provider (OpenAI, Anthropic, Gemini, etc.)
  - LangWatch (get at https://app.langwatch.ai/authorize)
  - Smithery (optional, for MCP tool discovery)

## Next Steps

1. **Test the CLI**: Try running `node dist/index.js init test-project` (in a different directory)
2. **Read Documentation**: Check out `docs/` folder for detailed guides
3. **Explore the Code**: Look at `src/` to understand the implementation
4. **Run Tests**: Tests are currently marked as todo, but the structure is in place

## Documentation

- [Getting Started](docs/GETTING-STARTED.md)
- [Walkthrough](docs/WALKTHROUGH.md)
- [Project Structure](docs/STRUCTURE.md)
- [Features](docs/FEATURES.md)
- [Usage](docs/USAGE.md)

## Resources

- **LangWatch**: https://langwatch.ai
- **Scenario Testing**: https://scenario.langwatch.ai/
- **Agent Testing Pyramid**: https://scenario.langwatch.ai/best-practices/the-agent-testing-pyramid
- **Agno Framework**: https://agno.com
- **Mastra Framework**: https://mastra.ai

---

**Setup completed on**: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")  
**Node.js Version**: v22.20.0  
**pnpm Version**: 10.15.0

