# Contributing to NovaAI

Thank you for your interest in contributing to NovaAI! This document provides guidelines and instructions for contributing.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

---

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive environment for everyone.

### Our Standards
- ✅ Be respectful and inclusive
- ✅ Welcome newcomers
- ✅ Focus on constructive feedback
- ✅ Show empathy

### Unacceptable Behavior
- ❌ Harassment or discrimination
- ❌ Trolling or insulting comments
- ❌ Personal or political attacks
- ❌ Spam or off-topic content

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git
- Google Gemini API key
- Code editor (VS Code recommended)

### Recommended VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript + JavaScript
- GitLens

---

## Development Setup

### 1. Fork the Repository
Click "Fork" on GitHub to create your copy

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/nova-ai-chatbot.git
cd nova-ai-chatbot
```

### 3. Add Upstream Remote
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/nova-ai-chatbot.git
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Set Up Environment
```bash
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

### 6. Start Development Server
```bash
npm run dev
```

Visit http://localhost:5173

---

## How to Contribute

### Types of Contributions

#### 🐛 Bug Reports
Found a bug? Open an issue with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)

#### ✨ Feature Requests
Have an idea? Open an issue with:
- Clear description of the feature
- Use case / motivation
- Proposed implementation (optional)
- Examples from other apps (optional)

#### 📝 Documentation
Help improve docs:
- Fix typos
- Add examples
- Clarify instructions
- Translate to other languages

#### 💻 Code Contributions
Ready to code? Follow the process below

---

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Define proper types (avoid `any`)
- Use interfaces for object shapes
- Export types when needed

```typescript
// Good
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
}

// Bad
const message: any = { ... }
```

### React Components
- Use functional components with hooks
- One component per file
- Use descriptive names (PascalCase)
- Keep components focused (single responsibility)

```typescript
// Good
export default function MessageBubble({ message }: MessageBubbleProps) {
  // ...
}

// Bad
function msg(props) {
  // ...
}
```

### File Organization
```
src/
├── components/    # React components
├── context/       # React context providers
├── hooks/         # Custom React hooks
├── services/      # API services
├── types/         # TypeScript types
├── utils/         # Helper functions
└── pages/         # Page components (future)
```

### Naming Conventions
- Components: PascalCase (`MessageBubble.tsx`)
- Functions: camelCase (`generateId`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- CSS classes: kebab-case or Tailwind

### Code Style
- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Trailing commas in objects/arrays
- Max line length: 100 characters

```typescript
// Good
const config = {
  apiKey: 'xyz',
  model: 'gemini-pro',
};

// Bad
const config = {apiKey: "xyz", model: "gemini-pro"}
```

### Tailwind CSS
- Use Tailwind utility classes
- Group classes logically
- Use dark mode classes: `dark:bg-gray-800`
- Extract repeated patterns to components

```typescript
// Good
<div className="flex items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg">

// Avoid inline styles
<div style={{ padding: '16px' }}>
```

---

## Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(chat): add message editing functionality

fix(api): handle rate limit errors properly

docs(readme): update installation instructions

style(sidebar): improve spacing and alignment

refactor(context): simplify chat state management

test(api): add tests for chat service

chore(deps): update dependencies
```

### Best Practices
- Use present tense ("add" not "added")
- Use imperative mood ("move" not "moves")
- First line: 50 characters or less
- Capitalize first letter
- No period at the end
- Body: wrap at 72 characters

---

## Pull Request Process

### Before Submitting

1. **Create a Branch**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

2. **Make Your Changes**
- Write clean, readable code
- Follow coding standards
- Add comments where needed
- Keep changes focused

3. **Test Your Changes**
- Test manually in browser
- Check mobile responsiveness
- Test light/dark themes
- Verify no console errors

4. **Update Documentation**
- Update README if needed
- Add JSDoc comments
- Update CHANGELOG if needed

5. **Commit Your Changes**
```bash
git add .
git commit -m "feat(chat): add message editing"
```

6. **Sync with Upstream**
```bash
git fetch upstream
git rebase upstream/main
```

7. **Push to Your Fork**
```bash
git push origin feature/your-feature-name
```

### Submitting the PR

1. Go to GitHub and open a Pull Request
2. Fill out the PR template:
   - Clear title
   - Description of changes
   - Related issue number
   - Screenshots (if UI changes)
   - Testing done
   - Checklist completed

### PR Template
```markdown
## Description
Brief description of what this PR does

## Related Issue
Closes #123

## Changes Made
- Added feature X
- Fixed bug Y
- Updated documentation

## Screenshots
[If applicable]

## Testing
- [ ] Tested manually
- [ ] Tested on mobile
- [ ] Tested dark mode
- [ ] No console errors
- [ ] All existing features work

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added where needed
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process

1. **Automated Checks**
   - Build must pass
   - No TypeScript errors
   - No linting errors

2. **Code Review**
   - Maintainer will review
   - May request changes
   - Discussion in comments

3. **Address Feedback**
```bash
# Make changes
git add .
git commit -m "fix: address review feedback"
git push origin feature/your-feature-name
```

4. **Merge**
   - Once approved, maintainer will merge
   - Your PR will be included in next release
   - You'll be added to contributors! 🎉

---

## Testing

### Manual Testing
Always test:
- [ ] New feature works as expected
- [ ] Existing features still work
- [ ] No console errors or warnings
- [ ] Mobile responsive
- [ ] Light and dark themes
- [ ] Different browsers (Chrome, Firefox, Safari)

### Future: Automated Tests
We plan to add:
- Unit tests (Jest/Vitest)
- Component tests (React Testing Library)
- E2E tests (Playwright)

---

## Documentation

### Code Documentation
- Add JSDoc comments for functions
- Explain complex logic
- Document props/types

```typescript
/**
 * Generates a unique ID for messages
 * @returns {string} Unique identifier combining timestamp and random string
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
```

### README Updates
Update README.md when:
- Adding new features
- Changing installation steps
- Adding dependencies
- Updating configuration

### CHANGELOG
Add entries for:
- New features
- Bug fixes
- Breaking changes
- Deprecations

---

## Project Structure

Understanding the codebase:

```
nova-ai-chatbot/
├── server/                    # Backend Express server
│   └── index.ts              # API routes, Gemini integration
├── src/
│   ├── components/           # React components
│   │   ├── ChatArea.tsx     # Main chat interface
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── MessageBubble.tsx # Individual message display
│   │   └── ...
│   ├── context/              # React Context API
│   │   ├── ChatContext.tsx  # Chat state management
│   │   └── ThemeContext.tsx # Theme management
│   ├── services/             # External service integrations
│   │   └── api.ts           # API calls to backend
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/                # Utility functions
│   │   └── helpers.ts
│   ├── App.tsx               # Root component
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles
├── .env.example              # Environment template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite config
└── tailwind.config.js        # Tailwind config
```

---

## Need Help?

### Getting Help
- 💬 Open a Discussion on GitHub
- 🐛 Open an Issue for bugs
- 📧 Email maintainers (if provided)
- 💬 Join Discord (coming soon)

### Good First Issues
Look for issues labeled:
- `good first issue`
- `help wanted`
- `beginner friendly`

### Mentorship
New to open source? We're here to help!
- Ask questions
- Request guidance
- Pair programming available

---

## Recognition

### Contributors
All contributors will be:
- Listed in README
- Credited in release notes
- Thanked publicly

### Significant Contributors
Regular contributors may become:
- Collaborators with write access
- Maintainers
- Project sponsors

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Questions?

Don't hesitate to ask! We're friendly and welcoming to newcomers.

**Thank you for contributing to NovaAI!** 🚀
